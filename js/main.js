


class Usuario{
    
  constructor(obj) {
        this.user= obj.user;
        this.pass=obj.pass;
        this.nombre=obj.nombre;
        var cuentos=[];
        $.each(obj.cuentos,function(i,emp){ 
            cuentos.push(new Cuento(emp));
        });
        this.cuentos=cuentos;
  }
};

class Cuento{
    constructor(obj) {
        this.nombre=obj.nombre;
        var imagenes=[];
        $.each(obj.imagenes,function(i,emp){ 
            imagenes.push(emp.url);
        });
        this.imagenes=imagenes;
        var audios=[];
        $.each(obj.audios,function(i,emp){ 
            audios.push(emp.url);
        });
        this.audios=audios;
    }
    
};


var contCuento=6;

    

    var leer= function(){
        
	    var usuarios=[];
        $.getJSON('datos.json',function(data){
            $.each(data.usuarios,function(i,emp){
                //alert("hola");
                usuarios.push(new Usuario(emp));
            });
            $.each(usuarios,function(i,emp){ 
                alert(emp.cuentos[0].nombre);
            });
        });
       
        
    };

    /*Agregar otra hoja*/
    $(".nHoja").click(function(){
        leer();
        var texto="<div class='item'>\
                      <div class='container escenas'>\
                        <div>Pagina "+contCuento+"</div>\
                      </div>\
                    </div>"
                    
        $(".carousel-inner").append(texto);
        $(".nav-dots").append("<li data-target='#myCarousel' data-slide-to="+contCuento+" class='nav-dot'><div id='droppable' class='hojas'>"+contCuento+"</div></li>");
        contCuento++;
    });
    /*Eliminar otra hoja*/
        
    $(".bHoja").click(function(){
        contCuento--;
        //$(".carousel-control").simulate('click');
        
        $(".item:last").remove();
        $(".nav-dot:last").remove();    
    });

    /*Guardar Cuento*/
     $("#guardar").click(function(){
        //creo el cuento
        var cuento= new Cuento($("#nombre").val());
        var imagenesCuento=[];
        //esta bandera sirve para saber si todas las hojas estan llenas
        var flag=0; 
        $(".escenas").each(function (index) 
        { 
        
            var ruta=$(this).find("img").attr("src");
            //alert("ruta: "+ruta);
            if(ruta==undefined){
                alert("Llena todas las hojas.");
                flag++;
                return false;
            }else{
                imagenesCuento.push(ruta);
                
            }
            
        }); 
         
        //si todas las hojas estan llenas se puede guardar sino no
        if(flag==0){
            
             alert("Se guardo el cuento "+cuento.nombre);
             cuento.imagenes=imagenesCuento;
             //alert(imagenesCuento.length);
             window.location.href = "../index.html";
        }
        
    });  

    /*Salir pero con alerta*/
     $("#salir").click(function(){
        window.onbeforeunload = confirmExit;
        function confirmExit()
        {
            return "Seguro desea salir?";
        }
    });
    
    
    //SUBIR ARCHIVOS AUDIO Y SONIDO
    
    $(".messages").hide();
    //queremos que esta variable sea global
    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
   
    $('#imagen').change(function()
    {
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessageE("<span>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });

    $('#audio').change(function()
    {
        //obtenemos un array con los datos del archivo
        var file = $("#audio")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessageA("<span>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });

    //al enviar el formulario
    $('.subirImg').click(function(){
        //información del formulario
        var formData = new FormData($(".formularioI")[0]);
        var message = ""; 
        //hacemos la petición ajax  
        $.ajax({
            url: 'subir.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                message = $("<span>Subiendo la imagen, por favor espere...</span>");
                showMessageE(message)        
            },
            //una vez finalizado correctamente
            success: function(data){
                message = $("<span>La imagen ha subido correctamente.</span>");
                showMessageE(message);
                if(isImage(fileExtension))
                {
                    $(".fondoEscenas").html("<img id='draggable' class='ui-widget-content' src='../img/cuentos/"+data+"' />");
                     $( "#draggable" ).draggable({ revert: true});
                }
            },
            //si ha ocurrido un error
            error: function(){
                message = $("<span>Ha ocurrido un error.</span>");
                showMessageE(message);
            }
        });
    });


//AUDIOS

$('.subirAudio').click(function(){
        //información del formulario
        var formData = new FormData($(".formularioA")[0]);
        var message = ""; 
        //hacemos la petición ajax  
        $.ajax({
            url: 'subir.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                message = $("<span\>Subiendo el audio, por favor espere...</span>");
                showMessageA(message)        
            },
            //una vez finalizado correctamente
            success: function(data){
                message = $("<span\>El audio ha subido correctamente.</span>");
                showMessageA(message);
                if(isImage(fileExtension))
                {
                    $(".fondoAudio").append("<audio controls><source src='../img/cuentos/" +data+ "' type='audio/mp3'></audio>");
                    console.log(data);
                 /*<audio controls>
                              <source src="../img/cuentos/000938162_prev.mp3" type="audio/mp3">
                </audio>*/
                }
            },
            //si ha ocurrido un error
            error: function(){
                message = $("<span>Ha ocurrido un error.</span>");
                showMessageA(message);
            }
        });
    });
    



//como la utilizamos demasiadas veces, creamos una función para 
//evitar repetición de código
function showMessageE(message){
    $(".messagesE").html("").show();
    $(".messagesE").html(message);
}
function showMessageA(message){
    $(".messagesA").html("").show();
    $(".messagesA").html(message);
}
//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension)
{
    switch(extension.toLowerCase()) 
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
            return true;
        break;
        case 'mp3': case 'wav': case 'mp4': case 'ogg':
            return true;
        break;
        default:
            return false;
        break;
    }
      }
    
    /// //FIN ARCHIVOS AUDIO Y SONIDO
  
/*ARRASTRAR IMAGENES*/

 $( function() {
    $( ".item" ).droppable({
      drop: function( event, ui ) {
         
          var id = ui.draggable.attr("src");
          //alert(id);
          //alert(this);
        
        $( this ).children().html("<img src='"+id+"'>");
      }
    });
  } );
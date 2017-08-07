var idUsuario=0;
var idCuento=0;
var usuarios=[];
var cuentos=[];

function Usuario(user,pass,name){
    this.user= user,
    this.pass=pass,
    this.name=name,
    idUsuario++;
    cuentos=[];
};

function Cuento(nombre){
    idCuento++;  
    this.nombre=nombre;
    var imagenes=[];
    var sonidos=[];
    
    
};


var usuario1= new Usuario('deathpaul','yancito','Paul Valle');
var usuario2= new Usuario('chibi','conejito','Paola Ortiz');
var usuario3= new Usuario('kipamuno','gatito','Kimberly Muñoz');
usuarios.push=usuario1;
usuarios.push=usuario2;
usuarios.push=usuario3;

var cuento1= new Cuento('Caperucita Roja');
var cuento2= new Cuento('Los 3 chanchitos');
var cuento3= new Cuento('Blancanieves');
cuentos.push=cuento1;
cuentos.push=cuento2;
cuentos.push=cuento3;

var contCuento=6;


            
$(document).ready(function() {
    
    /*Agregar otra hoja*/
    $(".nHoja").click(function(){
        var texto="<div class='item'>\
                      <div class='container'>\
                        Pagina "+contCuento+"\
                      </div>\
                    </div>"
                    
        $(".carousel-inner").append(texto);
        $(".nav-dots").append("<li data-target='#myCarousel' data-slide-to="+contCuento+" class='nav-dot'><div class='hojas'>"+contCuento+"</div></li>");
        contCuento++;
    });
    
    
    /*Guardar Cuento*/
     $("#guardar").click(function(){
        var cuento= new Cuento($("#nombre").val());
        
         im.pusg
        cuentos.push=cuento;
        alert("Se guardo el cuento "+cuento.nombre);
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
    $(':file').change(function()
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
        showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });

    //al enviar el formulario
    $('.subirImg').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario")[0]);
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
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)        
            },
            //una vez finalizado correctamente
            success: function(data){
                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);
                if(isImage(fileExtension))
                {
                    $(".fondoEscenas").append("<img src='../img/cuentos/"+data+"' />");
                }
            },
            //si ha ocurrido un error
            error: function(){
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });
});

//como la utilizamos demasiadas veces, creamos una función para 
//evitar repetición de código
function showMessage(message){
    $(".messages").html("").show();
    $(".messages").html(message);
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
  
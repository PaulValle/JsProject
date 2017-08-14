class Usuario {

    constructor(obj) {
        this.user = obj.user;
        this.pass = obj.pass;
        this.nombre = obj.nombre;
        var cuentos = [];
        $.each(obj.cuentos, function (i, emp) {

            var cnt = new Cuento();
            cnt.conObj(emp)
            cuentos.push(cnt);
        });
        this.cuentos = cuentos;
    }
};

class Cuento {


    conObj(obj) {
        //alert(obj.nombre);
        this.nombre = obj.nombre;
        this.descripcion = obj.descripcion;
        this.credito = obj.credito;
        var pagina= [];
         $.each(obj.pagina, function (i, emp) {
            var pg= new Pagina();
            pg.conObj(emp);
            pagina.push(pg);
        });
        this.pagina = pagina;
        
    }
    directo(nombre, descripcion, credito, img, aud) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.credito = credito;
        var pagina = [];
         $.each(img, function (i, emp) {
            var pg= new Pagina();
            pg.directo(emp,aud[i]);
            pagina.push(pg); 
        });
        
        this.pagina = pagina;
        
    }
};

class Pagina {
    conObj(obj) {
        this.imagen = obj.imagen;
        this.audio = obj.audio;
    }
    directo(img,aud){
        this.imagen = img;
        this.audio = aud;
    }
}


var contCuento = 6;



function leer() {
    var usuarios = [];

    $.getJSON('datos.json', function (data) {

        $.each(data, function (i, emp) {
            //var usr= new Usuario();
            usuarios.push(new Usuario(emp));
        });
    });
    //alert(usuarios.length);
    return usuarios;

};

/*Agregar otra hoja*/
$(".nHoja").click(function () {

    var texto = "<div class='item'>\
                      <div class='container escenas'>\
                        <div>Pagina " + contCuento + "</div>\
                      </div>\
                    </div>"

    $(".carousel-inner").append(texto);
    $(".nav-dots").append("<li data-target='#myCarousel' data-slide-to=" + contCuento + " class='nav-dot'><div class='hojas'>" + contCuento + "</div></li>");
    contCuento++;
    sliderDrop();
});
/*Eliminar otra hoja*/

$(".bHoja").click(function () {
    contCuento--;
    //$(".carousel-control").simulate('click');

    $(".item:last").remove();
    $(".nav-dot:last").remove();
});


/*DIV PREGUNTAS*/

$("#SeleccionarP").hide(); 
$("#SeleccionarP2").hide();
$("#SeleccionarP3").hide();
 /*$(".bActividad").click(function () {
    alert("Hola");
});*/


//BOTONES PREHUNTAS/ACTIVIDADES
$('.subirAct').click(function(){
    alert("HOLA");
    $('#SeleccionarP').show();
    
});

$('.subirAct2').click(function(){
    alert("HOLA");
    $('#SeleccionarP2').show();
    
});

/*Seleccionar Combo
$('select#actividad').change(function(){
    window.location = $(this).val();
});
*/


$("#guardar").click(function () {
    var imagenesCuento = [];
    var audiosCuento=[];
    //esta bandera sirve para saber si todas las hojas estan llenas
    var flag = 0;
    $(".escenas").each(function (index) {

        var rutaI = $(this).find("img").attr("src");
        var rutaA = $(this).find("audio").children().attr("src");
        //alert(rutaA);
        //alert("ruta: "+ruta);
        if (rutaI == undefined || rutaA == undefined) {
            alert("Llena todas las hojas.");
            flag++;
            return false;
        } else {
            imagenesCuento.push(rutaI);
            audiosCuento.push(rutaA);

        }

    });

    //si todas las hojas estan llenas se puede guardar sino no
    if (flag == 0) {

      var usuarios=[];
      usuarios=leer();
      var cuento= new Cuento();
      cuento.directo($("#nombre").val(),$("#descripcion").val(),$("#credito").val(),imagenesCuento,audiosCuento);
      //alert(usuarios);
      alert("Se guardo el cuento "+cuento.nombre);
      //alert("f "+usuarios[0].cuento.length);
      alert(usuarios);
      usuarios[0].cuentos.push(cuento); 
      //alert("t"+usuarios[0].cuento.length);
      /*$.each(usuarios[0].cuentos[1].paginas, function (i, emp) {

        alert("img"+emp.imagen);
         alert("aud"+emp.audio);
      });*/
     
      $.ajax({
          url: 'guardarJson.php',
          method: 'post',
          data: {
                "identificador": usuarios
          },
          success: function (data) {
                alert(data);

          }
      });

        // window.location.href = "../index.html";

    }

});

/*Salir pero con alerta*/
$("#salir").click(function () {
    window.onbeforeunload = confirmExit;

    function confirmExit() {
        return "Seguro desea salir?";
    }
});


//SUBIR ARCHIVOS AUDIO Y SONIDO

$(".messages").hide();
//queremos que esta variable sea global
var fileExtension = "";
//función que observa los cambios del campo file y obtiene información

$('#imagen').change(function () {
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
    showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

//IMAGEN PREGUNTA 1
$('#imagen1').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen1")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#imagen2').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen2")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

//FINAL PREGUNTAS

$('#audio').change(function () {
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
    showMessageA("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#audioAP').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#audioAP")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageP("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

//al enviar el formulario
$('.subirImg').click(function () {
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
        beforeSend: function () {
            message = $("<span>Subiendo la imagen, por favor espere...</span>");
            showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span>La imagen ha subido correctamente.</span>");
            showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondoEscenas").html("<img id='draggable' class='ui-widget-content' src='../img/cuentos/" + data + "' />");
                $("#draggable").draggable({
                    revert: true
                });
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageE(message);
        }
    });
});



//AUDIOS

$('.subirAudio').click(function () {
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
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessageA(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessageA(message);
            if (isImage(fileExtension)) {
                $(".fondoAudio").html("<audio id='draggableAudio' controls><source src='../img/cuentos/" + data + "' type='audio/mp3'></audio>");
                $("#draggableAudio").draggable({
                    revert: true
                });
                
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageA(message);
        }
    });
});

//AUDIO PREGUNTAS

$('.subirAudioP').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP")[0]);
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
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessageP(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessageP(message);
            if (isImage(fileExtension)) {
                $(".fondoAudioP").append("<audio controls><source src='../img/cuentos/" + data + "' type='audio/mp3'></audio>");
                console.log(data);
                /*<audio controls>
                              <source src="../img/cuentos/000938162_prev.mp3" type="audio/mp3">
                </audio>*/
            }
        },
        //si ha ocurrido un err        
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageP(message);
        }
    });
});

//CARGA DE ARCHIVO PREGUNTA 1

//al enviar el formulario
$('.subirImgP').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP2")[0]);
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
        beforeSend: function () {
           // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
           // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondoP1").html("<img id='draggable' class='ui-widget-content' src='../img/cuentos/" + data + "' />");
                $("#draggable").draggable({
                    revert: true
                });
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});


$('.subirImgP2').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP3")[0]);
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
        beforeSend: function () {
           // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
           // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondoP2").html("<img id='draggable' class='ui-widget-content' src='../img/cuentos/" + data + "' />");
                $("#draggable").draggable({
                    revert: true
                });
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});


//como la utilizamos demasiadas veces, creamos una función para 
//evitar repetición de código
function showMessageE(message) {
    $(".messagesE").html("").show();
    $(".messagesE").html(message);
}

function showMessageA(message) {
    $(".messagesA").html("").show();
    $(".messagesA").html(message);
}
function showMessageP(message) {
    $(".messagesP").html("").show();
    $(".messagesP").html(message);
}

//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'png':
        case 'jpeg':
            return true;
            break;
        case 'mp3':
        case 'wav':
        case 'mp4':
        case 'ogg':
            return true;
            break;
        default:
            return false;
            break;
    }
}

/// //FIN ARCHIVOS AUDIO Y SONIDO

/*ARRASTRAR IMAGENES*/
sliderDrop();
function sliderDrop(){
    $(".item").droppable({
        drop: function (event, ui) {
            
            if(ui.draggable.attr("id")=="draggable"){
                //alert("img");
                var id = ui.draggable.attr("src");
                $(this).children().append("<img src='" + id + "'>");
                
            }else{
                //alert("audio");
                var id = ui.draggable.children().attr("src");
                $(this).children().prepend("<audio controls><source src='" + id + "' type='audio/mp3'></audio>");
            }
            
            
        }
});}

/* LISTAR CUENTOS */
function leerCuento(){
    var userArray = [];
    userArray = leer();
    //var hola="asd";
    alert("Disfruta de todos los cuentos!" +userArray)
    $.each(userArray[0].cuentos, function (index, elem) {
        
        $("#ListaCuento").append("<div class='col-md-4 portfolio-item'>\
                <div id='idh4'>\
                        <button id='lo' onclick='enviar(this)'>\
                        <img id='imghome' src='" + elem.pagina[0].imagen + "' alt=''>\
                        <h3 id='idh3'>" + elem.nombre + "</h3>\
                        <p>" + elem.descripcion + "</p>\
                        </button>\
                </div></div>");
    });
};


$('#ListaCuento').ready(function() {

    leerCuento();
});

function pasarVariables(pagina, nombres) {
   // pagina += "?";
    alert(nombres);
   
};

function recibir() {
    var j=localStorage.getItem("var")
    alert(j);
    
};
$("#leerCnto").click(function () {
    recibir();
});
function enviar(btn) {
   // alert(nombre);
   alert($(btn).find('h3').html());
    
   var hermosaId=$(btn).find('h3').html();
   alert(hermosaId);
   localStorage.setItem("var",hermosaId);
   window.location="cuento.html";
};

  
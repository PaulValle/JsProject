var idUsuario=0;
var idCuento=0;
var usuarios=[];
var cuentos=[];

class Usuario(user,pass,name){
    this.user= user,
    this.pass=pass,
    this.name=name,
    idUsuario++;
    cuentos=[];
};

class Cuento(nombre){
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
   
    
});
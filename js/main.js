var idUsuario=0;
var idCuento=0;
var usuarios=[];
var cuentos[];

function Usuario(user,pass,name){
  this.user= user,
  this.pass=pass,
  this.name=name,
   idUsuario++;  
};

function Cuento(nombre){
    idCuento++;  
    this.nombre=nombre;
    var imagenes[];
    var sonidos[];
    
    
};


var usuario1= new Usuario('deathpaul','yancito','Paul Valle');
var usuario2= new Usuario('chibi','conejito','Paola Ortiz');
var usuario3= new Usuario('kipamuno','gatito','Kimberly Muñoz');
usuarios.push=usuario1;
usuarios.push=usuario2;
usuarios.push=usuario3;

var cuento1= new Usuario('Caperucita Roja');
var cuento2= new Usuario('Los 3 chanchitos');
var cuento3= new Usuario('Blancanieves');





$(document).ready(function() {
});
 Var http = require ( ' http ' );
 Http  CreateServer ( función ( req , res ) {
   Res .  WriteHead ( 200 , { ' Content-Type ' : ' text / plain ' });
   Res .  Final ( ' Hola Travis! \ N ' );  // build debería pasar ahora!
 }).  Listen ( 1337 , ' 127.0.0.1 ' );
 Consola  Log ( ' Servidor en ejecución en http://127.0.0.1:1337/ ' ); 

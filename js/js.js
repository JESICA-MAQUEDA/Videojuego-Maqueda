var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

/*var muro = '#008080';
var puerta = '#794722';
var tierra = '#BDB76B';
var llave = '#808000'; */

var protagonista;

var tileMap;

// Crear enemigos




var escenario = [
[0,0,0,0,0,0,0,0,0,0,0,0,3,0,0],
[0,2,2,2,2,0,0,0,0,0,0,0,2,0,0],
[0,0,0,0,2,0,0,0,0,0,2,2,2,2,2],
[0,0,2,2,2,2,2,2,2,0,2,0,2,0,2],
[0,0,2,0,2,0,0,0,2,0,2,2,2,0,2],
[0,0,2,2,2,0,0,0,2,0,0,0,0,0,2],
[0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],
[0,0,0,0,0,0,2,0,2,0,0,0,0,0,0],
[0,0,0,0,0,1,2,2,2,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

function dibujaEscenario(){
  var color;

  for(y=0;y<10;y++){
    for(x=0;x<15;x++){


      // tile map

      /*if(escenario[y][x]==0)
        color = muro;

      if(escenario[y][x]==1)
        color = puerta;

      if(escenario[y][x]==2)
        color = tierra;

      if(escenario[y][x]==3)
        color = llave;

      ctx.fillStyle = color;
      ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);*/

      var tile = escenario[y][x];
      ctx.drawImage(tileMap, tile*32, 0, 32, 32, anchoF*x,altoF*y, anchoF, altoF);
    }
  }


}



// animación antorcha



//OBJETO JUGADOR
var jugador = function(){
  this.x = 1;
  this.y = 1;
  this.color = '#191970';
  this.llave = false;


  this.dibuja = function(){
    ctx.drawImage(tileMap, 32, 32, 32, 32, this.x*anchoF, this.y*altoF,anchoF, altoF)
    
    
    
    /*ctx.fillStyle = this.color;
    ctx.fillRect(this.x*anchoF,this.y*altoF,anchoF,altoF);*/
  }


  this.margenes = function(x,y){
    var colision = false;

    if(escenario[y][x]==0){
      colision = true;
    }

    return(colision);
  }



  this.arriba = function(){
    if(this.margenes(this.x, this.y-1)==false){
      this.y--;
      this.logicaObjetos();
    }
  }


  this.abajo = function(){
    if(this.margenes(this.x, this.y+1)==false){
      this.y++;
      this.logicaObjetos();
    }
  }

  this.izquierda = function(){
    if(this.margenes(this.x-1, this.y)==false){
      this.x--;
      this.logicaObjetos();
    }
  }

  this.derecha = function(){
    if(this.margenes(this.x+1, this.y)==false){
      this.x++;
      this.logicaObjetos();
    }
  }


  this.victoria = function(){
    console.log('Has ganado!');

    this.x = 1;
    this.y = 1;

    this.llave = false;   //el jugador ya no tiene la llave
    escenario[0][12] = 3;  //volvemos a poner la llave en su sitio
  }

// función muerte


  this.logicaObjetos = function(){
    var objeto = escenario[this.y][this.x];

    //OBTIENE llave
    if(objeto == 3){
      this.llave = true;
      escenario[this.y][this.x]=2;
      console.log('Has obtenido la llave!!');
    }


    //ABRIMOS LA PUERTA
    if(objeto == 1){
      if(this.llave == true)
        this.victoria();
      else{
        console.log('No tienes la llave, no puedes pasar!');
      }
    }


  }

}





//Función inicializa

function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

//cargar el tileMap

tileMap=new Image();
tileMap.src='img/tilemap8.png';





  //CREAMOS AL JUGADOR
  protagonista = new jugador();

  //LECTURA DEL TECLADO
  document.addEventListener('keydown',function(tecla){

    if(tecla.keyCode == 38){
      protagonista.arriba();
    }

    if(tecla.keyCode == 40){
      protagonista.abajo();
    }

    if(tecla.keyCode == 37){
      protagonista.izquierda();
    }

    if(tecla.keyCode == 39){
      protagonista.derecha();
    }

  });

  setInterval(function(){
    principal();
  },1000/FPS);
}


function borraCanvas(){
  canvas.width=750;
  canvas.height=500;
}


function principal(){
  borraCanvas();
  dibujaEscenario();
  protagonista.dibuja();
}
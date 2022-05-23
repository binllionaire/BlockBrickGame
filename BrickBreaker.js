$(document).ready(function(){
  $("#startButton").on("click", intro);
  $("#intro p:nth-child(2)").on("click",gameMenu);
  $("#game1Button").on("click", game1);
  $("#game2Button").on("click", game2);
  $("#game3Button").on("click", game3);
});

function intro(){
  $("#main-menu").css("display","none"); 
  $("#intro").fadeIn( 2000 );
}
function gameMenu(){
  $("#intro").css("display","none"); 
  $("#game-menu").fadeIn( 2000 );
}
function game1(){
  $("#game-menu").css("display","none"); 
  $("#game1").css("display","block"); 
}
function game2(){
  $("#game-menu").css("display","none"); 
  $("#game2").css("display","block"); 
}
function game3(){
  $("#game-menu").css("display","none"); 
  $("#game3").css("display","block"); 
}
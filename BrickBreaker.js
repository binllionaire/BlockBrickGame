$(document).ready(function(){
  $("#startButton").on("click", intro);
  $("#intro p:nth-child(2)").on("click",gameMenu);
});

function intro(){
  $("#main-menu").css("display","none"); 
  $("#intro").fadeIn( 2000 );
}
function gameMenu(){
  $("#intro").css("display","none"); 
  
  $("#game-menu").fadeIn( 2000 );
}
$(document).ready(function(){
  $("#startButton").on("click", intro);

  $('#startButton').hover(function(){
  $("#main-menu").fadeTo('slow', 0.1, function()
{
  $("#main-menu").css('background-image','url("background.jpg")');
}).fadeTo('slow', 1);
    }, 
    function() {
      $("#main-menu").css('background-image','none');}, 
  )



  $("#intro p:nth-child(2)").on("click",gameMenu);
  $("#menu1").on("click", game1);
  $("#menu2").on("click", game2);
  $("#menu3").on("click", game3);

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
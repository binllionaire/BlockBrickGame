$(document).ready(function(){
  $("#startButton").on("click", intro);

  $('#startButton').hover(function(){
  $("#main-menu").fadeTo('slow', 0.3, function()
{
  $("#main-menu").css('background-image','url("background.jpg")');
}).fadeTo('slow', 1);
    }, 
    function() {
      $("#main-menu").css('background-image','none');}, 
  )



  $("#intro p:nth-child(2)").on("click",gameMenu);
  $("#game1Button").on("click", game1);
  $("#game2Button").on("click", game2);
  $("#game3Button").on("click", game3);

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
  for_game2();// <<<=====================고현규=============
}
function game3(){
  $("#game-menu").css("display","none"); 
  $("#game3").css("display","block"); 
}

// =====================고현규==============================

function for_game2(){
  var canvas = document.getElementById("canvas_for_game2");
  var ctx = canvas.getContext("2d");
  var x = canvas.width/2;
  var y = canvas.height-40;
  var dx = 2;
  var dy = -2;
  var ballRadius = 12; //공의 반지름
  var paddleHeight = 12; //패들높이
  var paddleWidth = 150; //패들 폭
  var paddleX = (canvas.width-paddleWidth)/2; //패들 위치
  var rightPressed = false; // -> 버튼 눌림
  var leftPressed = false; // <- 버튼 눌림

  var brickRowCount = 3; //벽돌의 행 갯수
  var brickColumnCount = 10; //벽돌의 열 갯수
  var brickWidth = 89; //벽돌의 폭
  var brickHeight = 30; //벽돌의 높이
  var brickPadding = 10; //벽돌의 padding
  var brickOffsetTop = 10; //벽돌의 위쪽 여백
  var brickOffsetLeft = 9; //벽돌의 왼쪽 여백

  //벽돌 배치를 이차원 배열을 이용해서 함
  var bricks = [];
  for(var c=0; c<brickColumnCount; c++) {
      bricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1};
      }
  }

  document.addEventListener("keydown",keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
  }

  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = false;
      }
      else if(e.keyCode == 37) {
          leftPressed = false;
      }
  }

  function collisionDetection(){
    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        var b = bricks[c][r];
        if(b.status == 1){
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
          }
        }
      }
    }
  }

  function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI*2);
      ctx.fillStyle = "#EF5690"; //공의 색깔
      ctx.fill();
      ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#AA3C65"; //패들의 색깔
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks(){
    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        if(bricks[c][r].status == 1){
          var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#AA3C65";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // drawBricks();
      // drawBall();
      // drawPaddle();

      if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if(y + dy < ballRadius) {
        dy = -dy;
      }
      else if(y + dy > canvas.height-ballRadius) {
          if(x >= paddleX && x <= paddleX + paddleWidth) {
              dy = -dy;
          }
          else {
              alert("GAME OVER");
              stopInterval();
              document.location.reload();
          }
      }

      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 3;
      }
      else if(leftPressed && paddleX > 0) {
          paddleX -= 3;
      }

      x += dx;
      y += dy;

      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();
  }

  var interv;

  function startInterval(){
    interv = setInterval(draw, 4);
  }
  function stopInterval(){
    clearInterval(interv);
  }

  startInterval();
}

// =====================고현규==============================
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

  var canvas;
  var ctx;
  var game3notice;
  var game3noticeButton;

  canvas = document.getElementById("game3canvas");
  ctx = canvas.getContext('2d');
  game3notice = $("#game3_notice");
  game3notice.fadeIn(2000);

  game3noticeButton = $("#game3_notice button");
  game3noticeButton.click(function(){
    game3notice.css("display","none");
    startGame(0);
  })

  function startGame(no) {
    game = new Game(no);
    canvas.focus();
    canvas.style.cursor = "none";
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 150;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "dodgerblue";

  class Ball { 
    constructor(x, y, radius, speed, angle, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
      this.setAngle(angle);
      this.color = color;
    }
  
    setAngle(angle) {
      var radian = angle / 180 * Math.PI;
      this.mx = this.speed * Math.cos(radian);
      this.my = this.speed * -Math.sin(radian);
    }
  
    move(k) {
      this.x += this.mx * k;
      this.y += this.my * k;
    }
  
    get collideX() {
      if (this.mx > 0) return this.x + this.radius;
      else return this.x - this.radius;
    }
  
    get collideY() {
      if (this.my > 0) return this.y + this.radius;
      else return this.y - this.radius;
    }
  
    collideWall(left, top, right) {
      if (this.mx < 0 && this.collideX < left) this.mx *= -1;
      if (this.mx > 0 && this.collideX > right) this.mx *= -1;
      if (this.my < 0 && this.collideY < top) this.my *= -1;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  class Paddle {
    constructor(x, y, width, height, speed, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.halfWidth = width / 2;
      this.height = height;
      this.speed = speed;
      this.color = color;
    }
  
    get center() { return this.x + this.halfWidth; }
  
    collide(ball) {
      var yCheck = () => this.y - ball.radius < ball.y && 
        ball.y < this.y + ball.radius;
      var xCheck = () => this.x < ball.x && ball.x < this.x + this.width;
      if (ball.my > 0 && yCheck() && xCheck()) {
        const hitPos = ball.x - this.center;
        var angle = 80 - (hitPos / this.halfWidth * 60); // 20 ~ 80
        if (hitPos < 0) angle += 20; // 100 ~ 160
        ball.setAngle(angle);
      }
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.closePath();
    }
  }

  class Bricks {
    constructor(rows, cols, x, y, width, height, color) {
      this.rows = rows;
      this.cols = cols;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.brickWidth = width / cols;
      this.brickHeight = height / rows;
      this.count = rows * cols;
      this.color = color;
      this.data = [];
      for (var i = 0; i < rows; i++) {
        var line = new Array(cols);
        line.fill(1);
        this.data.push(line);
      }
    }
  
    collide(x, y) {
      var row = Math.floor((y - this.y) / this.brickHeight);
      var col = Math.floor((x - this.x) / this.brickWidth);
      if (row < 0 || row >= this.rows) return false;
      if (col < 0 || col >= this.cols) return false;
      if (this.data[row][col]) {
        this.data[row][col] = 0;
        this.count--;
        return true;
      }
      else return false;
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = "lightgray";
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          if (!this.data[r][c]) continue;
          var x = this.x + (this.brickWidth * c);
          var y = this.y + (this.brickHeight * r);
          ctx.beginPath();
          ctx.fillRect(x, y, this.brickWidth, this.brickHeight);
          ctx.strokeRect(x, y, this.brickWidth, this.brickHeight);
          ctx.closePath();
        }
      }
    }
  }

  canvas.addEventListener("mousemove", function(ev){
    game.paddle.x = ev.offsetX - game.paddle.halfWidth;
    if(game.paddle.x < 0){
      game.paddle.x = 0;
    } else if(game.paddle.x + game.paddle.width > WIDTH){
      game.paddle.x = WIDTH - game.paddle.width;
    }
  })

  class Game {
    constructor(no) {
      var ballSpeeds = [15, 15];
      var brickSettings = [
        [3, 5, 0, 50, WIDTH, 150, COLOR],
        [7, 10, 0, 50, WIDTH, 150, COLOR]
      ];
  
      this.state = "start";
      this.timeCount = 0;
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds[no], 75, COLOR);
      this.bricks = new Bricks(...brickSettings[no]);
    }
  
    update() {
      if (this.state == "start") {
        this.timeCount++;
        if (this.timeCount >= 100) this.state = "play";
        return ;
      }
      if (this.state != "play") return;

      const DIV = 10;
      for (var i = 0; i < DIV; i++) {
        this.ball.move(1 / DIV);
        this.ball.collideWall(0, 0, WIDTH);
        this.paddle.collide(this.ball);
        if (this.bricks.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
        if (this.bricks.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
      }
  
      if (this.ball.y > HEIGHT + 50) this.state = "end";
      if (this.bricks.count == 0) this.state = "clear";
    }
  
    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.bricks.draw(ctx);
      this.paddle.draw(ctx);
      this.ball.draw(ctx);
    }
  }
  
  function drawText(text) {
    ctx.font = "bold 70px arial";
    ctx.fillStyle = "dodgerblue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
  }

  var game = null;

  function mainLoop() {
    requestAnimationFrame(mainLoop);

    if (game) {
      game.update();
      game.draw();
      if (game.state == "end") drawText("END");
      if (game.state == "clear") drawText("CLEAR");
    }
    else drawText("Breakout");
  }

  mainLoop();
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

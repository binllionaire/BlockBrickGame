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
  var game3_LifeDiv;

  canvas = document.getElementById("game3canvas");
  ctx = canvas.getContext('2d');
  game3notice = $("#game3_notice");
  game3notice.fadeIn(2000);

  game3noticeButton = $("#game3_notice button");
  game3noticeButton.click(function(){
    game3notice.css("display","none");
    initGameOption();
    startGame();
  })
  game3_LifeDiv = $("#game3_life");

  $("#game3_replay").click(function(){
    initGameOption();
    startGame();
  })

  function startGame() {
    game = new Game();
    canvas.focus();
    canvas.style.cursor = "none"; 
    game3_LifeDiv.text("목숨:"+life);
    console.log(currentstage);

    canvas.addEventListener("mousemove", function(ev){
      game.paddle.x = ev.offsetX - game.paddle.halfWidth;
      if(game.paddle.x < 0){
        game.paddle.x = 0;
      } else if(game.paddle.x + game.paddle.width > WIDTH){
        game.paddle.x = WIDTH - game.paddle.width;
      }
    })
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 200;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "dodgerblue";

  var currentstage;
  var life;
  var trueBlock = new Array(4);
  function assignTrueBlock(){
    for(var i=0; i<4; i++){
      trueBlock[i] = Math.floor(Math.random()*2); //0은 왼쪽 1은 오른쪽
    }
  }
  function initGameOption(){
    currentstage = 0;
    life = 5;
    assignTrueBlock();
  }


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

  class Game {
    constructor() {
      var ballSpeeds = 12;
      var brickSettings = [
        [3, 3, WIDTH/2-400, 50, 250, 250, 'red'], //rows, cols, x, y, width, height, color
        [3, 3, WIDTH/2+150, 50, 250, 250, 'blue']
      ];
  
      this.state = "play";
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds, 75, COLOR);
      this.brickleft = new Bricks(...brickSettings[0]);
      this.brickright = new Bricks(...brickSettings[1]);
    }
  
    update() {
      if (this.state != "play") return;

      const DIV = 10;
      for (var i = 0; i < DIV; i++) {
        this.ball.move(1 / DIV);
        this.ball.collideWall(0, 0, WIDTH);
        this.paddle.collide(this.ball);
        if (this.brickleft.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
        if (this.brickleft.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
        if (this.brickright.collide(this.ball.collideX, this.ball.y)) this.ball.mx *= -1;
        if (this.brickright.collide(this.ball.x, this.ball.collideY)) this.ball.my *= -1;
      }
  
      if (this.ball.y > HEIGHT + 50) this.state = "fall";
      if (this.brickleft.count == 0){
        this.state = "left";
      } 
      if (this.brickright.count == 0){
        this.state = "right";
      } 
    }
  
    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.brickleft.draw(ctx);
      this.brickright.draw(ctx);
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
      if(currentstage == 4){    //4개의 징검다리를 다 건넜을경우
        drawText("clear");
        game = null;
        canvas.style.cursor = "Default";
      }
      else if(life == 0){       //목숨이 0인경우
        drawText("fail");
        game = null;
        canvas.style.cursor = "Default";
      }
      else if(game.state == "fall"){    //공이 아래로 빠졌을경우
        life--;
        game3_LifeDiv.text("목숨:"+life);
        startGame();
      }
      else if(game.state == "left" && trueBlock[currentstage] == 0){  //징검다리 성공
        currentstage++;
        startGame();
      }
      else if(game.state == "right" && trueBlock[currentstage] == 1){   //징검다리 성공
        currentstage++;
        startGame();
      }
      else if(game.state == "right" || game.state == "left"){
        life--;
        game3_LifeDiv.text("목숨:"+life);
        startGame();
      }
    }
  }

  mainLoop();
}

// =====================고현규==============================

function for_game2(){
  var canvas = document.getElementById("canvas_for_game2");
  var ctx = canvas.getContext("2d");
  var ballRadius = 10;
  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth)/2;
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 5;
  var brickColumnCount = 3;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;
  var score = 0;
  var lives = 3;

  var bricks = [];
  for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function keyDownHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = true;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = true;
      }
  }

  function keyUpHandler(e) {
      if(e.key == "Right" || e.key == "ArrowRight") {
          rightPressed = false;
      }
      else if(e.key == "Left" || e.key == "ArrowLeft") {
          leftPressed = false;
      }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
    }
  }
  function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
          var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }

  draw();
}

// =====================고현규==============================

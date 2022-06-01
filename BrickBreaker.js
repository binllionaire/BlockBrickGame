var flag = 1; //배경화면 바꾸기 플래그
var flag2 = 1; //배경음악 바꾸기 플래그

var imgUrl;
var totalScore =0;
var bgm1=new Audio("bgm1.mp3");
var bgm2=new Audio("bgm2.mp3");
bgm1.load();

bgm1.oncanplaythrough=function(){
  bgm1.play();
}
bgm1.loop=true;
bgm2.loop=true;



$(document).ready(function(){

  $("#startButton").on("click", intro);

  $('#startButton').hover(function(){
  $("#main-menu").fadeTo('slow', 0.1, function()
{
  if(flag ==1){
    imgUrl = 'url("background1.jpg")'
  }
  else if(flag==2){
    imgUrl = 'url("background2.jpg")'
  }
  else if(flag==3){
    imgUrl = 'url("background3.jpg")'
  }
  $("#main-menu").css('background-image',imgUrl);
}).fadeTo('slow', 1);
    }, 
    function() {
      $("#main-menu").css('background-image','none');}, 
  )

  //환경설정 - 배경화면 변경
  $("#next").click(function(){
    if($("#bgi").attr("src")=="background1.jpg"){
    ($("#bgi").attr("src","background2.jpg"));
    flag=2;
    }
    else if($("#bgi").attr("src")=="background2.jpg"){
      ($("#bgi").attr("src","background3.jpg"));
      flag=3;
      }
      else if($("#bgi").attr("src")=="background3.jpg"){
        ($("#bgi").attr("src","background1.jpg"));
        flag=1;
        }
  });
  $("#previous").click(function(){
    if($("#bgi").attr("src")=="background1.jpg"){
    ($("#bgi").attr("src","background3.jpg"));
    flag=3;
    }
    else if($("#bgi").attr("src")=="background2.jpg"){
      ($("#bgi").attr("src","background1.jpg"));
      flag=1;
      }
      else if($("#bgi").attr("src")=="background3.jpg"){
        ($("#bgi").attr("src","background2.jpg"));
        flag=2;
        }
  });

  //배경음악 설정

  $("#select").on("click",bgm1Play);
  $("#select2").on("click",bgm2Play);
  


  
  //환경설정 창 닫기
  $("#okButton").click(function(){
    $("#setting").fadeOut("slow");
  });

  $("#intro p:nth-child(2)").on("click",gameMenu);
  $("#game1Button").on("click", game1);
  $("#game2Button").on("click", game2);
  $("#game3Button").on("click", game3);

  $("#menu1").on("click", game1);
  $("#menu2").on("click", game2);
  $("#menu3").on("click", game3);

  $("#settingIcon").on("click",showSetting);

});

function bgm1Play(){   
  flag2=1;   
  bgm2.pause();
  bgm1.play();
}
function bgm2Play(){  
  flag2=2;    
  bgm1.pause();
  bgm2.play();
}

//환경설정
function showSetting(){
  $("#setting").fadeIn("slow");
  $("#setting").addClass("popup");
  change_position($(".popup"));
  $("#setting").css("display","block");
}
//환경설정 팝업 위치설정
function change_position(obj){
  var l = ($(window).width()-obj.width())/2;
  var t = ($(window).height()-obj.height())/2;
  obj.css({top:t,left:l});
}
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
  for_game1();
}
function game2(){
  $("#game-menu").css("display","none"); 
  $("#game2").css("display","block");
  for_game2();
}


/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/
/*=================================================== GAME 1 ==================================================*/

function for_game1(){
  var game1notice = $("#game1_notice");
  game1notice.fadeIn(2000);

  var game1noticeButton = $("#game1_notice button");
  game1noticeButton.click(function(){
    game1notice.css("display","none"); 
    startGame();                      //알림창 확인 버튼 -> 시작하게                             
  })

  var canvas_Width = screen.availWidth*7/10;
  var canvas_Height = screen.availHeight;
  var canvas;
  var ctx;
  
  var mouseEvent = function(ev){
    game.paddle.x = ev.offsetX - game.paddle.halfWidth;
    if(game.paddle.x < 0){
      game.paddle.x = 0;
    } else if(game.paddle.x + game.paddle.width > WIDTH){
      game.paddle.x = WIDTH - game.paddle.width;
    }
  };
  
  canvas = document.getElementById("game1_canvas");
  ctx = canvas.getContext('2d');

  canvas.setAttribute('width', canvas_Width);
  canvas.setAttribute('height', canvas_Height);
  
  var game1_life;
  var timeout = 150;
  var timeoutInterval;
  var game1Score = 0;

  function startGame() {
    game1Score = 0;
    game1_life = 5;
    $("#game1_life").text("남은 목숨 : " + game1_life);
    //여기
    timeout = 150;
    
    timeoutInterval = 
      setInterval(function(){
        timeout--;
        
        $("#game1_timeout").text('남은 시간: '+ timeout +'초');
      },1000);

    game = new Game();
    canvas.focus();
    canvas.style.cursor = "none"; 

    canvas.addEventListener("mousemove", mouseEvent);
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 200;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "white";


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
    constructor(rows, cols, x, y, width, height, color, color_rest, bricktype) {
      this.rows = rows;
      this.cols = cols;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.brickWidth = width / cols;
      this.brickHeight = height / rows;
      this.count;
      this.color = color;
      this.data = [];
      this.bricktype = bricktype;
      this.color_rest = color_rest;

      if(bricktype=='star'){
        this.data = [
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,2,2,2,2,2,0,0,0],
          [0,0,2,2,2,1,2,2,2,0,0],
          [0,2,2,2,1,1,1,2,2,2,0],
          [0,2,2,1,1,1,1,1,2,2,0],
          [0,2,2,2,2,1,2,2,2,2,0],
          [0,2,2,2,2,1,2,2,2,2,0],
          [0,2,2,2,1,1,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,0,0],
          [0,0,0,2,2,2,2,2,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]
        ];
        this.count = 0;
        for(var i=0; i<11; i++){
          for(var j=0; j<11; j++){
            if(this.data[i][j]==2)
              this.count++;
          }
        }
      }
    }
  
    collide(x, y) {
      var row = Math.floor((y - this.y) / this.brickHeight);
      var col = Math.floor((x - this.x) / this.brickWidth);
      if (row < 0 || row >= this.rows) return false;
      if (col < 0 || col >= this.cols) return false;
      if (this.data[row][col] > 0) {
        if(this.data[row][col] == 1){
          return true;
        }
        this.data[row][col] = 0;
        this.count--;
        game1Score += 1;
        $(".score").text("적립된 상금 : "+game1Score+"억원")
        return true;
      }
      else return false;
    }
  
    draw(ctx) {
      ctx.strokeStyle = "lightgray";
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          if (!this.data[r][c]) continue;
          if(this.data[r][c]==2){
            ctx.fillStyle = this.color_rest;
          }
          if(this.data[r][c]==1){
            ctx.fillStyle = this.color;
          }
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
      var ballSpeeds = 10;
      var brickSettings = [
        [11, 11, canvas_Width/2-330, 5, 660, 660, '#69491A', '#F2AB39', 'star'] //rows, cols, x, y, width, height, color
      ];
  
      this.state = "play";
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds, 90, COLOR);
      this.brick = new Bricks(...brickSettings[0]);
    }
  
    update() {
      if (this.state != "play") return;

      const DIV = 10;
      for (var i = 0; i < DIV; i++) {
        this.ball.move(1/DIV);
        this.ball.collideWall(0, 0, WIDTH);
        this.paddle.collide(this.ball);
        if (this.brick.collide(this.ball.collideX, this.ball.y)){
          this.ball.mx *= -1;
        } 
        if (this.brick.collide(this.ball.x, this.ball.collideY)){
          this.ball.my *= -1;
        }
      }
  
      if (this.ball.y > HEIGHT + 50) this.state = "fall";
      if (this.brick.count == 0){
        this.state = "clear";
      } 
      if (game1_life == 0) {
        this.state = "fail";
      }
    }
  
    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.brick.draw(ctx);
      this.paddle.draw(ctx);
      this.ball.draw(ctx);
    }
  }

  var game = null;

  function mainLoop() {
    requestAnimationFrame(mainLoop);

    if (game) {
      game.update();
      game.draw();
      if(game.state == "clear"){        //달고나 성공
        totalScore +=game1Score;
        game = null;
        clearInterval(timeoutInterval);
        $("#game1").css("display","none");
        $("#clear").fadeIn(1000);
        setTimeout(() => $("#clear").fadeOut(1000), 2000);
        setTimeout(() => game2(), 2000);
        
      }
      else if(timeout == 0){ //시간 초과
        $("#fail").fadeIn(1000)
        setTimeout(() => $("#fail").fadeOut(1000), 3000);      
        game.state = "stop";
        game = null;
        setTimeout(() => clearInterval(timeoutInterval), 4000);  
        setTimeout(() =>startGame(), 3800);   //재시작
        
      }
      else if(game.state == "fall") {       //공이 떨어졌을때
        game1_life--;
        game.ball = new Ball(game.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS, 10, 90, COLOR);
        game.state = "play";
        $("#game1_life").text("남은 목숨 : " + game1_life);
      }
      else if(game.state == "fail") {    //라이프가 0일때
        game = null;
        $("#fail").fadeIn(1000)
        setTimeout(() => $("#fail").fadeOut(1000), 3000);
        setTimeout(() => clearInterval(timeoutInterval), 4000);  
        setTimeout(() =>startGame(), 3800);   //재시작
        
      }
    }
  }

  mainLoop();
}



/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/


function for_game2(){

  if(flag2==1){
    bgm1.pause();
  }
  else if(flag2==2){
    bgm2.pause();
  }

  var bgm3=new Audio("bgm3.mp3");
 
  var canvas = document.getElementById("canvas_for_game2");
  var ctx = canvas.getContext("2d");
  var x = window.innerWidth*0.7/2;
  var y = window.innerHeight*0.6-40;
  var dx = 2;
  var dy = -2;
  var ballRadius = 15; //공의 반지름
  var paddleHeight = 15; //패들높이
  var paddleWidth = 150; //패들 폭
  var paddleX = (window.innerWidth*0.7-paddleWidth)/2; //패들 위치
  var paddleColor = "#FFFFFF";

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    
    canvas.width = window.innerWidth*0.7;
    canvas.height = window.innerHeight*0.9;
  }
  resizeCanvas();

  var rightPressed = false; // -> 버튼 눌림
  var leftPressed = false; // <- 버튼 눌림

 //클리어 보려고 임시로 해놓은거 !!!!

  var brickRowCount = 3; //벽돌의 행 갯수
  var brickColumnCount = 5; //벽돌의 열 갯수
  
  var brickWidth = 255; //벽돌의 폭
  var brickHeight = 50; //벽돌의 높이
  var brickPadding = 10; //벽돌의 padding
  var brickOffsetTop = 15; //벽돌의 위쪽 여백
  var brickOffsetLeft = 15; //벽돌의 왼쪽 여백

 
  var game2notice = $("#game2_notice");
  game2notice.fadeIn(2000);

  var game2noticeButton = $("#game2_notice button");
  game2noticeButton.click(function(){
    game2notice.css("display","none");
    startInterval();
    //확인 버튼 누르면 게임이 시작되도록 바꿔주세요!!!
  })

  var game2Score = 0;

  var lives = 10; //목숨갯수

  var canMove = true;

  function reset(again){
    
    
    x = canvas.width/2;
    y = canvas.height-40;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2; //패들 위치
    paddleColor = "#FFFFFF";

    game2Score = 0;

    lives = 10; //목숨갯수

    canMove = true;

    $("#scoreBox").css({"width":"0px"});

    for(var c = 0; c < brickColumnCount; c++){
      for(var r = 0; r < brickRowCount; r++){
        var b = bricks[c][r];
        b.status = 1;
      }
    }

    if(again){
      startInterval();
    }
  }

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    
    canvas.width = window.innerWidth*0.7;
    canvas.height = window.innerHeight*0.9;
  }
  resizeCanvas();


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
  document.addEventListener("mousemove", mouseMoveHandler, false);

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

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(canMove && relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth/2;
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
            game2Score += 12;
            $(".score").text("적립된 상금 : "+game2Score+"억원");
            $("#scoreBox").animate({width:'+=88px'});
            var scoreText = "누적금액 : " + (game2Score) + "억";
            $("#scoreBox").text(scoreText);
            if(game2Score == 180){
              totalScore +=game2Score;
              stopInterval();
              // <<<<<<<================= 레벌 3 으로 넘어가는 시점
              bgm3.pause();
              $("#game2").css("display","none");
              $("#clear").fadeIn(1000);
              setTimeout(() => $("#clear").fadeOut(1000), 2000);
              if(flag2==1){
                bgm1.play()
              }
              else if(flag2==2){
                bgm2.play();
              }
              setTimeout(() => game3(), 3000);
            }
          }
        }
      }
    }
  }

  function drawLives(){
    // ctx.font = "16px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText("Lives : "+lives, canvas.width-65, 20);
    var lifeText = "남은 사람 : "+lives+"명";

    $("#restLifesText").text(lifeText);
 $("#lifesCharacters").css("background-color","#E0B88A")
    var rightArea_lifes = document.getElementById('lifesCharacters');

    while(rightArea_lifes.firstChild){
      rightArea_lifes.removeChild(rightArea_lifes.firstChild);
    }

    for(var i = 0; i < lives; i++){
      var lifeBox = document.createElement('img');
      lifeBox.setAttribute("class",'lifes_for_game2');
      var imgNum = i%5;
      var imgName = "game2char"+imgNum+".png";
      lifeBox.setAttribute("src",imgName);

      rightArea_lifes.appendChild(lifeBox);
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);

    ctx.fillStyle = paddleColor;
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

          ctx.fillStyle = "#B4D8E7";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x >= paddleX && x <= paddleX + paddleWidth) {
        if(x >= paddleX && x < paddleX + paddleWidth/4){
          dy = -(dy/Math.abs(dy));
          dx = -3;
        }else if(x >= paddleX + paddleWidth/4 && x < paddleX + (paddleWidth/4)*3){
          dy = -(dy/Math.abs(dy))*2;
          dx = (dx/Math.abs(dx))*2;
        }else{
          dy = -(dy/Math.abs(dy));
          dx = 3;
        }
      }
      else {
        lives--;
        if(!lives){  //죽었을때
          
          stopInterval();
          var again = true;
          $("#fail").fadeIn(1000);
          setTimeout(() => $("#fail").fadeOut(1000), 2000);
          setTimeout(() => reset(again), 2000);
          
        }
        else{
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width - paddleWidth)/2;
        }
      }
    }
    if(canMove){
      if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 4;
      }
      else if(leftPressed && paddleX > 0) {
        paddleX -= 4;
      }
    }

    x += dx;
    y += dy;

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawLives();
  }

  var countNum = 0;
  var texts = ["무","무궁","무궁화","무궁화","무궁화 꽃","무궁화 꽃","무궁화 꽃이","무궁화 꽃이","무궁화 꽃이 피","무궁화 꽃이 피었","무궁화 꽃이 피었습","무궁화 꽃이 피었습니","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!","무궁화 꽃이 피었습니다!"]

  function textOut(){
    $("#textArea").text(texts[countNum]);
    if(countNum == 0){
      bgm3.load();
      bgm3.oncanplaythrough=function(){
        bgm3.play();
      }
    }
    countNum++;
    if(countNum == 13){
      canMove = false;
      paddleColor = "#FF0000";
      $("#doll_img_for_game2").attr("src","doll_front.png");
      setTimeout(function(){
        countNum = 0;
        $("#doll_img_for_game2").attr("src","doll_back.png");
        canMove = true;
        paddleColor = "#FFFFFF";
      },1200)
    }
  }

  var textInterval;
  var interv;

  function startInterval(){
    interv = setInterval(draw, 4);
    textInterval = setInterval(textOut,400);

  }
  function stopInterval(){
    clearInterval(interv);
    clearInterval(textInterval);
    bgm3.pause();
  }

}
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/


function game3(){ 
  
 
  $("#game-menu").css("display","none");
  $("#game3").css("display","block"); 

  var game3_score;
  var game3_score_stage;
  var canvas_Width = screen.availWidth*7/10;
  var canvas_Height = screen.availHeight;
  var canvas;
  var ctx;
  var game3notice;
  var game3noticeButton;
  var current_character;
  var currentstage;
  var life;
  var trueBlock = new Array(4);
  var mouseEvent = function(ev){
    game.paddle.x = ev.offsetX - game.paddle.halfWidth;
    if(game.paddle.x < 0){
      game.paddle.x = 0;
    } else if(game.paddle.x + game.paddle.width > WIDTH){
      game.paddle.x = WIDTH - game.paddle.width;
    }
  };

  canvas = document.getElementById("game3canvas");
  ctx = canvas.getContext('2d');
  game3notice = $("#game3_notice");
  game3notice.fadeIn(1000);

  canvas.setAttribute('width', canvas_Width);
  canvas.setAttribute('height', canvas_Height);

  game3noticeButton = $("#game3_notice button");
  game3noticeButton.click(function(){
    game3notice.css("display","none");      //처음 알림창 확인버튼 클릭 핸들러
    initGameOption();
    startGame();
  })

  $("#game3_replay").click(function(){
    initGameOption();                       //다시하기 버튼 클릭이벤트 핸들러
    startGame();
  })

  function change_Character(){
    var str = "#game3_character"+life;
    current_character = $(str);             //캐릭터 바꾸기
    current_character.animate({top: '10%', right: '41%'}, 1000, 'swing');
  }

  function assignTrueBlock(){             
    for(var i=0; i<4; i++){
      // trueBlock[i] = Math.floor(Math.random()*2); //진짜 유리 설정하기 (0은 왼쪽 1은 오른쪽)
      trueBlock[i] = 0;
    }
  }
  function initGameOption(){
    $("#game3_score").text("적립된 상금 : "+ 0 + "억원");
    game3_score = 0;
    game3_score_stage = 1;
    currentstage = 1;                   //게임 변수 초기화
    life = 5;
    assignTrueBlock();
    $("#game3_character5").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'10%', 'right':'41%'});
    $("#game3_character4").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'8%', 'right':'41%'});
    $("#game3_character3").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'6%', 'right':'41%'});
    $("#game3_character2").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'4%', 'right':'41%'});
    $("#game3_character1").css({'top':'','right':'','bottom':'','left':'','transform':'scaleX(1)'}).css({'display':'block', 'top':'2%', 'right':'41'});
    $(".game3_block").css({'display':'block', 'visibility':'visible'});
    current_character = $("#game3_character5");
  }

  function character_Jumping(state){
    var decideLR;
    var targetBlock_position;                        //캐릭터 점프
    var targetBlockid;
    var targetTop;
    var targetLeft;

    if(currentstage==5){
      current_character.animate({
        top: current_character.position().top + 100 + 'px'
      }, 2000, 'easeInOutQuart');
    }

    if(state == 'left'){
      decideLR = 'L';
      current_character.css('transform','scaleX(-1)');
    } else if(state == 'right'){
      decideLR = 'R';
      current_character.css('transform','scaleX(1)');
    }
    targetBlockid = ("#game3_block" + currentstage) + decideLR;

    // if($(targetBlockid).css('visivility') == 'hidden'){
    //   return ;
    // }
    targetBlock_position = $(targetBlockid).position();
    targetTop = targetBlock_position.top;
    targetLeft = targetBlock_position.left;

    current_character.animate({
      top: targetTop - 40 + 'px',
      left: targetLeft - 5 + 'px'
    }, 2000, 'easeInOutQuart');
  }

  function character_fall(state){            
    var decideLR;                                 //잘못점프시 낙하 모션
    var targetBlockid;

    if(state == 'left'){
      decideLR = 'L';
    } else if(state == 'right'){
      decideLR = 'R';
    }
    targetBlockid = ("#game3_block" + currentstage) + decideLR;
    if($(targetBlockid).css('visibility') != 'hidden'){
      $(targetBlockid).fadeOut(1000);
      setTimeout(function(){
        current_character.animate({
          top: current_character.position().top + 50 + 'px'
        }, 1000);
        current_character.fadeOut(1000);
        setTimeout(function(){
          $(targetBlockid).css({'display':'block','visibility':'hidden'});
        },1500);
      },1000)
    } else {
        current_character.animate({
          top: current_character.position().top + 50 + 'px'
        }, 1000);
        current_character.fadeOut(1000);
    }
  }

  function startGame() {
    game = new Game();
    canvas.focus();
    canvas.style.cursor = "none"; 

    canvas.addEventListener("mousemove", mouseEvent);
  }

  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var BALL_RADIUS = 10;
  var PADDLE_WIDTH = 200;
  var PADDLE_HEIGHT = 15;
  var PADDLE_X = (WIDTH - PADDLE_WIDTH) / 2;
  var PADDLE_Y = HEIGHT - PADDLE_HEIGHT - 10;
  var PADDLE_SPEED = 7;
  var COLOR = "white";


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
    constructor(rows, cols, x, y, width, height, color, bricktype) {
      this.rows = rows;
      this.cols = cols;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.brickWidth = width / cols;
      this.brickHeight = height / rows;
      this.count;
      // this.count = rows * cols;
      this.color = color;
      this.data = [];
      // for (var i = 0; i < rows; i++) {
      //   var line = new Array(cols);
      //   line.fill(1);
      //   this.data.push(line);
      // }
      if(bricktype=='left'){
        this.data = [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,0]];
        this.count = 1;
        // this.count = 8;
      } 
      else if(bricktype=='right'){
        this.data = [[1,1,1,0,0], [1,0,0,1,0], [1,1,1,0,0], [1,0,0,1,0], [1,0,0,1,0]];
        this.count = 1;
        // this.count = 12;
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
      var ballSpeeds = 10;
      var brickSettings = [
        [5, 5, 200, 50, 300, 350, '#FA3F3F', 'left'], //rows, cols, x, y, width, height, color
        [5, 5, WIDTH-450, 50, 300, 350, '#3F3FFA', 'right']
      ];
  
      this.state = "play";
      this.paddle = new Paddle(PADDLE_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,
        PADDLE_SPEED, COLOR);
      this.ball = new Ball(this.paddle.center, PADDLE_Y - BALL_RADIUS, BALL_RADIUS,
        ballSpeeds, 90, COLOR);
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
      if (this.brickleft.count <= 0){
        this.state = "left";
      } 
      if (this.brickright.count <= 0){
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
  
  var game = null;

  function mainLoop() {
    requestAnimationFrame(mainLoop);

    if (game) {
      game.update();
      game.draw();
      if(currentstage == 5){    //4개의 징검다리를 다 건넜을경우
        setTimeout(character_Jumping,2000);
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";

        //성공화면 ->메인메뉴로
        setTimeout(function(){
          $("#game3").css("display","none");
          $("#clear").fadeIn(1000);
          setTimeout(() => $("#clear").fadeOut(1000), 2000);
          setTimeout(() => $("#main-menu").css("display","block"), 3000);
        },4500);
      }
      else if(life == 0){       //목숨이 0인경우
        game.state = "stop";
        setTimeout(() => $("#fail").fadeIn(1000), 4500);
        setTimeout(() => $("#fail").fadeOut(1000), 6500);
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";
        setTimeout(function(){
          initGameOption();                       
          startGame();
        },8000);   
      }
      
      else if(game.state == "fall"){    //공이 아래로 빠졌을경우
        game.state = "stop";
        life--;
        currentstage = 1;
        current_character.css('transition','1s');
        current_character.css('transform','rotate(90deg)');
        setTimeout(function(){
          current_character.css('transition','');
          current_character.fadeOut(1000);
        },1500);
        if(life != 0){
          setTimeout(change_Character,3000);
          setTimeout(startGame,4500);
        }
      }
      else if(game.state == "left" && trueBlock[currentstage-1] == 0){  //징검다리 성공
        game.state = 'stop';
        if(currentstage == game3_score_stage){
          game3_score += 55;
          game3_score_stage++;
          setTimeout(function(){
            $("#game3_score").text("적립된 상금 : "+ game3_score + "억원");
          },2100)
        }
        character_Jumping('left');
        currentstage++;
        if(currentstage != 5)
          setTimeout(startGame, 3000);
      }
      else if(game.state == "right" && trueBlock[currentstage-1] == 1){   //징검다리 성공
        game.state = 'stop';
        if(currentstage == game3_score_stage){
          game3_score += 55;
          game3_score_stage++;
          setTimeout(function(){
            $("#game3_score").text("적립된 상금 : "+ game3_score + "억원");
          },2100)
        }
        character_Jumping('right');
        currentstage++;
        if(currentstage != 5)
          setTimeout(startGame, 3000);
      }
      else if(game.state == "right"){       //징검다리 실패
        game.state = 'stop';
        life--;
        character_Jumping('right');
        setTimeout(function(){
          character_fall('right');
          currentstage = 1;
        },2000)        
        if(life != 0){
          setTimeout(change_Character,4500);
          setTimeout(startGame, 6000);
        }      
      }
      else if(game.state == "left"){           //징검다리 실패
        game.state = 'stop';
        life--;
        character_Jumping('left');
        setTimeout(function(){
          character_fall('left');
          currentstage = 1;
        },2000)
        if(life != 0){
          setTimeout(change_Character,4500);
          setTimeout(startGame, 6000);
        }
      }
    }
  }

  mainLoop();
}
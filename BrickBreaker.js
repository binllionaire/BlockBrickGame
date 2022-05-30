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
  game_start();
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
// 확인을 누르면 게임을 시작하는 함수 추가 (정재우)
function game_start() {
  var game1notice = $("#game1_notice");
  game1notice.fadeIn(2000);
  var game1noticeButton = $("#game1_notice button");
  game1noticeButton.click(function(){
    game1notice.css("display","none");
     for_game1();
     reduceInterval();
    // 게임 함수 실행
    //확인 버튼 누르면 게임이 시작되도록 바꿔주세요!!!
  })
   
}


var timelef = 11;
function reduce() {
  var timetext = "제한 시간: "+timelef; // 시간
  document.getElementById("right").innerHTML = timetext;
  timelef-=1;
 //3 2
  if(timelef == -2) {
    alert("Time over!");
    stop_interval();
    stopWin();
      window.location.reload();
  }        
}
function reduceInterval() {
reduce_Interval = setInterval(reduce,1000); 
}
function stop_interval() {
  clearInterval(reduce_Interval);
  audio = '';
}


function for_game1(){

  var width =window.innerWidth*0.7;
  var height = window.innerHeight;
  var x = width/2;
  var y = height-40;
  var canvas = document.getElementById("canvas_for_game1");
  var ctx = canvas.getContext("2d");
  var ballRadius = 10;
  var x = width/2;
  var y = height-40;
  var dx = 4;
  var dy = -4;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (width-paddleWidth)/2;
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 5;
  var brickColumnCount = 3;
  var brickWidth = 35;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 250.5; // 왼쪽 기본 여백
  var score = 0;
var count = brickColumnCount*brickRowCount;
var count2 = 72; // 별을 제외한 벽돌의 개수를 표현할 예정
  var lives = 10; //목숨
 
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
          canvas.width = window.innerWidth*0.7;
          canvas.height = window.innerHeight;
  }
  resizeCanvas();

  /*var game1notice = $("#game1_notice");
  game1notice.fadeIn(2000);

  var game1noticeButton = $("#game1_notice button");
  
  game1noticeButton.click(function(){
    game1notice.css("display","none");
    //확인 버튼 누르면 게임이 시작되도록 바꿔주세요!!!*/
    
   


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
  /*function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -(Math.random()*2.5)*dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              //document.location.reload();
            }
          }
        }
      }
    }
  }
*/
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();
  }
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#e11880";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status == 1) {
var brickX = c*(brickWidth+brickPadding)+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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
// 두번째 벽돌 배치 패턴-> 노랑 벽돌
var bricks2 = [];
for(var c=1; c<brickColumnCount-1; c++) {
bricks2[c] = [];
for(var r=1; r<brickRowCount-1; r++) {
var d = bricks2[c][r];
bricks2[c][r] = { x: 0, y: 0, status:1};
}
}
//두번째 벽돌을 그리는 함수(사각형)
function drawBricks2() {
for(var c=1; c<brickColumnCount-1; c++) {
for(var r=1; r<brickRowCount-1; r++) {
if(bricks2[c][r].status == 1) {
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
bricks2[c][r].x = brickX;
bricks2[c][r].y = brickY;
ctx.beginPath();
ctx.rect(brickX, brickY, brickWidth, brickHeight);
ctx.fillStyle = "yellow";
ctx.fill();
ctx.closePath();
}
}
}
}
// 파란 벽돌을 지워주는 함수(사각형)
function eraseBrick1_2() {
for(c=1; c<brickColumnCount-1; c++){
for(r=1; r<brickRowCount-1; r++){
if(bricks[c][r].x == bricks2[c][r].x) {
bricks[c][r].status = 0;
count--;
}
}
}
}

// 공이 벽돌에 충돌할 때 벽돌이 사라지게 하는 함수(사각형)
function collisionDetection() {

for(var c=0; c<brickColumnCount; c++) {
for(var r=0; r<brickRowCount; r++) {
var b = bricks[c][r];
if(b.status == 1) {
if(x >= bricks[c][r].x && x <= bricks[c][r].x+brickWidth && y >= bricks[c][r].y &&
   y <= bricks[c][r].y+brickHeight) {
dy = -dy;
b.status = 0;
score++;
if(score == count) {
alert("YOU WIN, CONGRATS!");
document.location.reload();
  }
  }
/*if(x > bricks2[c][r].x && x < bricks2[c][r].x+brickWidth && y > bricks2[c][r].y && y < bricks2[c][r].y+brickHeight) {
dy = -dy;*/ 
  }
  }
  }
}

// 첫번째 블럭 배치(별)
var brickX1;
var brickY1;
var bricks_s = [];
for(var c=0; c<9; c++) {
bricks_s[c] = [];
for(var r=0; r<8; r++) {
 // 파랑 벽돌
bricks_s[c][r] = { x: 0, y: 0, status:1};
}
}
// 블럭을 만드는 함수 -> x,y좌표 지정(별)
function drawBricks_star() {
for(var c=0; c<9; c++) {
  for(var r=0; r<8; r++) {
if(bricks_s[c][r].status == 1) {
 brickX1 = (c*(brickWidth+brickPadding))+brickOffsetLeft;
 brickY1 = (r*(brickHeight+brickPadding))+brickOffsetTop; 
bricks_s[c][r].x = brickX1;
bricks_s[c][r].y = brickY1;
ctx.beginPath();
ctx.rect(brickX1, brickY1, brickWidth, brickHeight);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();
      }
    }
  }
}

// 두번째 벽돌 배치 패턴-> 노랑 벽돌(별)
var brickX_s;
var brickY_s;
var bricks2_s = []; // 노랑 벽돌 선언
for(var c=0; c<9; c++) { 
bricks2_s[c] = [];
for(var r=0; r<8; r++) {
var e = bricks2_s[c][r];
bricks2_s[c][r] = { x: 0, y: 0, status:1};
} 

}
//두번째 벽돌을 그리는 함수(별)
function drawBricks2_star2() {
for(var r=0; r<=0; r++) {
  for(var c=4; c<=4; c++) {
  if(bricks2_s[c][r].status == 1) {
    bricks_s[c][r].status = 2;
    brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
    brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
    bricks2_s[c][r].x = brickX_s;
    bricks2_s[c][r].y = brickY_s;
    ctx.beginPath();
    ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath(); 
    }  
  }
}
  for(var r=1; r<=1; r++) {
    for(var c=3; c<=5; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
      } 
    }  
  }
  for(var r=2; r<=2; r++) {
    for(var c=1; c<=7; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
            } 
          }  
  }
  for(var r=3; r<=3; r++) {
    for(var c=2; c<=6; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
            } 
          }  
  }
   
  for(var r=4; r<=4; r++) {
    for(var c=3; c<=5; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
            } 
          }  
  }   
  
  for(var r=5; r<=5; r++) {
    for(var c=2; c<=3; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
       brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
            } 
          }
    for(var c=5; c<=6; c++) {
      if(bricks2_s[c][r].status == 1) {
        bricks_s[c][r].status = 2;
              var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks2_s[c][r].x = brickX_s;
              bricks2_s[c][r].y = brickY_s;
              ctx.beginPath();
              ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
              ctx.fillStyle = "yellow";
              ctx.fill();
              ctx.closePath();
                    } 
                  }        
  }
  for(var r=6; r<=6; r++) {
    for(var c=1; c<=2; c++) {
    if(bricks2_s[c][r].status == 1) {
      bricks_s[c][r].status = 2;
      var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks2_s[c][r].x = brickX_s;
      bricks2_s[c][r].y = brickY_s;
      ctx.beginPath();
      ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
            } 
          }
    for(var c=6; c<=7; c++) {
            if(bricks2_s[c][r].status == 1) {
              bricks_s[c][r].status = 2;
              var brickX_s = (c*(brickWidth+brickPadding))+brickOffsetLeft;
              var brickY_s = (r*(brickHeight+brickPadding))+brickOffsetTop;
              bricks2_s[c][r].x = brickX_s;
              bricks2_s[c][r].y = brickY_s;
              ctx.beginPath();
              ctx.rect(brickX_s, brickY_s, brickWidth, brickHeight);
              ctx.fillStyle = "yellow";
              ctx.fill();
              ctx.closePath();
                    } 
                  }
  }
} 


   

//노란 사각형을 그리는 함수(별) 
   
// 파란 벽돌을 지워주는 함수(별)
function eraseBrick1_2s() {
for(c=0; c<9; c++){
for(r=0; r<8; r++){
if(bricks_s[c][r].status==2) {
bricks_s[c][r].status = 0;
count2-=1;
}
  }
}
}

/*function eraseBrick1_2star() {
for(c=1; c<brickColumnCount-1; c++){
for(r=1; r<brickRowCount-1; r++){
if(bricks[c][r].x == bricks2[c][r].x) {
bricks[c][r].status = 0;
count--;
}
}
}
}*/

// 공이 벽돌에 충돌할 때 벽돌이 사라지게 하는 함수(별)

var audio = new Audio('공깨질때.wav');
function collisionDetection_star() {
  for(var c=0; c<9; c++) {
  for(var r=0; r<8; r++) {
  var e = bricks_s[c][r];
  var f = bricks2_s[c][r];

if(e.status==1) {
    if(x >=e.x && x <= e.x+brickWidth/2&& y >= e.y && y <= e.y+brickHeight/2) {
      audio.play();
      dy = -dy;
  e.status = 0;
  score++;}
    }
    if(x >=e.x+brickWidth/2 && x <= e.x+brickWidth&& y >= e.y && y <= e.y+brickHeight/2) {
      audio.play();
      dx +=1;
      dy = -dy;
  e.status = 0;
  score++;}
    
  
  
if(f.status == 1){
    if(x >=f.x && x <= f.x+brickWidth&& y >= f.y && y <= f.y+brickHeight) {
    dy = -dy;
    dx = -dx;
  }
        }        

    }      
  }
}
  

  //document.location.reload();
  

// 승리 체크, 다음 게임으로 넘어가기
function isWin() {
  if(score ==count2) {    //count2) {
  alert("YOU WIN, CONGRATS!");
  $("#game1").css("display","none");
              $("#clear").fadeIn(1000);
              setTimeout(() => $("#clear").fadeOut(1000), 2000);
              audio = "";
              stop_interval();
              stopWin();
              game2();
            return 0;
              //setTimeout(() => game2(), 3000);
            }
} 
function stopWin() {
  clearInterval(isWin_interval);
}
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#e11880";
    ctx.fillText("Score: "+score, 8, 20);
  }
  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#e11880";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }

/*
  function startInterval(){
    interv = setInterval(draw, 4);
    textInterval = setInterval(textOut,500);
  }
  function stopInterval(){
    clearInterval(interv);
    clearInterval(textInterval);
  }
*/
  startInterval();
  function drawStar() {
    drawBricks_star();  
    drawBricks2_star2();
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection_star();


    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x >= paddleX && x <= paddleX + paddleWidth) {
        if(x >= paddleX && x < paddleX + paddleWidth/4){

          dy = -2*(dy/Math.abs(dy));
          dx = -3;
        }else if(x >= paddleX + paddleWidth/4 && x < paddleX + (paddleWidth/4)*3){
          dy = -2*(dy/Math.abs(dy))*2;
          dx = (dx/Math.abs(dx))*2;
        }else{
          dy = -3*(dy/Math.abs(dy));
          dx = 3;
        }
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

  drawStar();
  setInterval(draw,1);
  //draw();
  isWin_interval = setInterval(isWin, 1);
  
  //eraseBrick1_2();
 eraseBrick1_2s();
  // 승리 체크
}
// =====================정재우==============================


/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/
/*=================================================== GAME 2 ==================================================*/


function for_game2(){

  if(flag2=1){
    bgm1.pause();
  }
  else if(flag2 =2){
    bgm2.pause();
  }

   var bgm3=new Audio("bgm3.mp3");
  bgm3.load();
  bgm3.oncanplaythrough=function(){
    bgm3.play();
  }
  bgm3.loop=true;
 
  var canvas = document.getElementById("canvas_for_game2");
  var ctx = canvas.getContext("2d");
  var x = window.innerWidth*0.7/2;
  var y = window.innerHeight*0.6-40;
  var dx = 2;
  var dy = -2;
  var ballRadius = 10; //공의 반지름
  var paddleHeight = 20; //패들높이
  var paddleWidth = 150; //패들 폭
  var paddleX = (window.innerWidth*0.7-paddleWidth)/2; //패들 위치
  var paddleColor = "#000000";

  var rightPressed = false; // -> 버튼 눌림
  var leftPressed = false; // <- 버튼 눌림

 //클리어 보려고 임시로 해놓은거 !!!!

  var brickRowCount = 1; //벽돌의 행 갯수
  var brickColumnCount = 1; //벽돌의 열 갯수
  
  var brickWidth = 500; //벽돌의 폭
  var brickHeight = 200; //벽돌의 높이
  var brickPadding = 10; //벽돌의 padding
  var brickOffsetTop = 10; //벽돌의 위쪽 여백
  var brickOffsetLeft = 10; //벽돌의 왼쪽 여백

 
  var game2notice = $("#game2_notice");
  game2notice.fadeIn(2000);

  var game2noticeButton = $("#game2_notice button");
  game2noticeButton.click(function(){
    game2notice.css("display","none");
    //확인 버튼 누르면 게임이 시작되도록 바꿔주세요!!!
  })

  var score = 0;

  var lives = 10; //목숨갯수

  var canMove = true;

  function reset(again){
    
    $("#fail").fadeIn(1000);
    setTimeout(() => $("#fail").fadeOut(1000), 2000);
    x = canvas.width/2;
    y = canvas.height-40;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2; //패들 위치
    paddleColor = "#000000";

    score = 0;

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
    canvas.height = window.innerHeight*0.65;
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
            TotalScore += 
            $("#scoreBox").animate({width:'+=90px'});
            if(score == brickRowCount*brickColumnCount){
              stopInterval();
              // <<<<<<<================= 레벌 3 으로 넘어가는 시점
              bgm3.pause();
              $("#game2").css("display","none");
              $("#clear").fadeIn(1000);
              setTimeout(() => $("#clear").fadeOut(1000), 2000);
              if(flag2=1){
                bgm1.play()
              }
              else if(flag2 =2){
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
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives : "+lives, canvas.width-65, 20);


    var rightArea_lifes = document.getElementById('rightside');

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

          ctx.fillStyle = "#f76707";
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
        if(!lives){
          
          stopInterval();
          
          var again = true;
          reset(again);
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
    countNum++;
    if(countNum == 13){
      canMove = false;
      paddleColor = "#FF0000";
      $("#doll_img_for_game2").attr("src","doll_front.png");
      setTimeout(function(){
        countNum = 0;
        $("#doll_img_for_game2").attr("src","doll_back.png");
        canMove = true;
        paddleColor = "#000000";
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
  }

  startInterval();
}


/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/
/*=================================================== GAME 3 ==================================================*/


function game3(){ 
  
 
  $("#game-menu").css("display","none");
  $("#game3").css("display","block"); 

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
      trueBlock[i] = Math.floor(Math.random()*2); //진짜 유리 설정하기 (0은 왼쪽 1은 오른쪽)
      // trueBlock[i] = 0;
    }
  }
  function initGameOption(){
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
        // this.count = 1;
        this.count = 8;
      } 
      else if(bricktype=='right'){
        this.data = [[1,1,1,0,0], [1,0,0,1,0], [1,1,1,0,0], [1,0,0,1,0], [1,0,0,1,0]];
        // this.count = 1;
        this.count = 12;
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
      if(currentstage == 5){    //4개의 징검다리를 다 건넜을경우
        drawText("clear");
        setTimeout(character_Jumping,2000);
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";

        //성공화면 ->메인메뉴로
        $("#game3").css("display","none");
        $("#clear").fadeIn(1000);
        setTimeout(() => $("#clear").fadeOut(1000), 2000);
        setTimeout(() => $("#main-menu").css("display","block"), 3000);

      }
      else if(life == 0){       //목숨이 0인경우
        $("#fail").fadeIn(1000);
        setTimeout(() => $("#fail").fadeOut(1000), 2000);
        canvas.removeEventListener("mousemove", mouseEvent);
        game = null;
        canvas.style.cursor = "Default";
        initGameOption();                       //다시하기 버튼 클릭이벤트 핸들러
        startGame();
        

       
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
        setTimeout(change_Character,3000);
        setTimeout(startGame,4500);
      }
      else if(game.state == "left" && trueBlock[currentstage-1] == 0){  //징검다리 성공
        game.state = 'stop';
        character_Jumping('left');
        currentstage++;
        if(currentstage != 5)
          setTimeout(startGame, 3000);
      }
      else if(game.state == "right" && trueBlock[currentstage-1] == 1){   //징검다리 성공
        game.state = 'stop';
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
        setTimeout(change_Character,4500);
        setTimeout(startGame, 6000);
      }
      else if(game.state == "left"){           //징검다리 실패
        game.state = 'stop';
        life--;
        character_Jumping('left');
        setTimeout(function(){
          character_fall('left');
          currentstage = 1;
        },2000)
        setTimeout(change_Character,4500);
        setTimeout(startGame, 6000);
      }
    }
  }

  mainLoop();
}


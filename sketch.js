
var player;
var ground;

var diamondGroup;
var diamondimg,playerimg,playerjumpimg,backgroundimg,obstaclesimg;
var obstaclesGroup, obstacle1;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var gameOver,Restart;
var scene;
var score;
var count;


function preload(){
diamondimg=loadImage("images/diamond.png");
playerimg=loadImage("images/player.png");
playerjumpimg=loadImage("images/playerjump.png");
obstaclesimg=loadImage("images/ob.png");
backgroundimg=loadImage("images/bk1.jpg");
}

function setup() {
  canvas = createCanvas(displayWidth-20,displayHeight-200);
  
  var playeroptions={
    isStatic:false
  }
  scene=createSprite(-10000,200,displayWidth*6,displayHeight*10);
  scene.addImage(backgroundimg);
  scene.scale=3.5;
  scene.x = scene.width /2;
  scene.velocityX=-6;

  player=createSprite(100,830,20,20,playeroptions);
  player.addImage(playerimg);
  player.scale=0.25;
  player.shapeColor="red";
  //player.velocityX=4;
  //player.debug=true;
  player.setCollider("rectangle",0,5,190,310);

  var options={
    isStatic:true
  }
  
  ground=createSprite(0,850,1000000,10,options);
  ground.shapeColor="red";
  ground.x = ground.width /2;
  ground.visible=false;
  ground.velocityX=-6; 
  
  
  diamondGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  var title = createElement('h2')
  title.html("It's goutham'sGame");
  title.position(displayWidth/2-50, 0);
  if(gamestate===PLAY){
    scene.velocityX=-6;

      if(keyIsDown(32) && player.y> 740) {
        player.velocityY =-13;
      }
      player.velocityY = player.velocityY + 0.8
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      if (scene.x < 0){
        scene.x = scene.width/2;
      }
      if (diamondGroup.isTouching(player)){
          score=score+50
          diamondGroup.destroyEach();
        }
      if (obstaclesGroup.isTouching(player)){
    gamestate=END;    
    }
      spawnDiamonds();
      spawnObstacles();
  }else if(gamestate===END){
    ground.velocityX=0;
    player.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    diamondGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);
    scene.velocityX=0;
    player.velocityX=0;
    if(keyIsDown(UP_ARROW)){
      reset();
    }

  }
camera.position.x=player.x  

  
  drawSprites();
  textSize(40);
  fill(0);
  stroke(255);
  text("Score: "+ score,700,150);
  player.collide(ground);
  if(gamestate===END){
    textSize(50)
    text("Press UP_ARROW To Reset The Game",0,displayHeight/2);
  }
}

function spawnDiamonds() {
  if(frameCount % 65 === 0) {
   //for(i=2200; i<1100000; i=i+350){
 var diamond = createSprite(2200,830,15,15);
  diamond.addImage(diamondimg);
  diamond.scale=0.25;
 // diamond.debug=true;
  diamond.setCollider("rectangle",5,5,150,150);
   // diamond.y = Math.round(random(790,830));
    diamond.velocityX = -13
    diamond.lifetime = 1000;
    diamondGroup.add(diamond);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(2200,795,10,100);
    obstacle.addImage(obstaclesimg);
   //obstacle.debug=true;
    obstacle.setCollider("rectangle",5,5,120,110);
    obstacle.velocityX = -13    
    obstacle.rotate=45  
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
 gamestate=PLAY;
score=0;
diamondGroup.destroyEach();
obstaclesGroup.destroyEach();
}
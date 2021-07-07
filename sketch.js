var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaIMG, obstacleIMG;
var foodGroup;
var obstacleGroup;
var gIMG, g;
var obstacle, banana;

var score = 0;
var END = 0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("junglea.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaIMG = loadImage("banana.png");
  obstacleIMG = loadImage("stone.png");
  gIMG = loadImage("gameOver.png");
}

function setup() {
  createCanvas(700,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
 
  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  spawnFood();
  obstacleSpawn();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

   if(foodGroup.isTouching(player)){
     foodGroup.destroyEach();
     score = score + 2;
     player.scale += + 0.1;
   }
   if(obstacleGroup.isTouching(player)){
     gameState = END;
  }
  if(gameState == END){
    player.destroy();
    backgr.velocityX = 0;
    
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    over();
  }
}
  drawSprites();
  textSize(40);
  textFont("Stencil");
  fill("white");
  text("SCORE : " + score ,300,50);
}
function spawnFood(){
if(frameCount % 200 == 0){
  var banana = createSprite(710,250,20,20);
  banana.y = random(120,250);
  banana.addImage(bananaIMG);
  banana.scale = 0.1;
  banana.velocityX = -4;

  banana.lifetime = 400;
  player.depth = banana.depth + 1;
  foodGroup.add(banana);
}
}
function obstacleSpawn(){
if(frameCount % 80 == 0){
  var obstacle = createSprite(750,320,20,20);
  obstacle.addImage(obstacleIMG);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;

  obstacle.lifetime = 420;
  obstacleGroup.add(obstacle);
}
}
function over(){
  createCanvas(1000,500);
  g = createSprite(350,200,0,0);
  g.addImage(gIMG);
  g.scale = 2.5;

}
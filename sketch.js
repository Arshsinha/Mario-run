var trex, trex_running,trexcollided, edges;
var groundImage,invisibleGround,cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score=0
var obstacleGroup,cloudGroup;
var PLAY=1
var END=0
var gameState=PLAY
var gameOver,gameOverImage,restart,restartImage
var bg

function preload(){
trex_running = loadAnimation("mario00.png","mario01.png","marioo2.png","mario03.png");
trexcollided=loadAnimation("collided.png")
groundImage = loadImage("ground2.png")
bg = loadImage("bg.png")
obstacle1 = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
}


function setup(){

createCanvas(600,200);
ground=createSprite(300,170,600,10)
ground.addImage(groundImage)
ground.velocityX=-5

// creating trex
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trexcollided)
//trex.debug=true;
trex.setCollider("rectangle",0,0,85,85) 
edges = createEdgeSprites();

//adding scale and position to trex
trex.scale = 0.5;
trex.x = 50



invisibleGround=createSprite(300,180,600,5)
invisibleGround.visible=false


obstacleGroup= new Group()

gameOver=createSprite(300,100)
gameOver.addImage(gameOverImage)
gameOver.visible=false

restart=createSprite(300,135)
restart.addImage(restartImage)
restart.scale=0.5
restart.visible=false

}


function draw(){
//set background color 
background("Black");
text("SCORE : "+ score,500,20)

if(gameState === PLAY){
        score=score+Math.round(getFrameRate()/60)
        if(ground.x<0){

                ground.x=ground.width/2
        }
                
                //logging the y position of the trex
                //console.log(trex.y)
                
                
                //jump when space key is pressed
        if(keyDown("space") && trex.y>150){
                trex.velocityY = -10;
         }
                
                trex.velocityY = trex.velocityY + 0.35;
                spawnClouds();  //function call
                spawnObstacles(); 
        if(obstacleGroup.isTouching(trex)){
                        gameState=END
         }  
  }
else if(gameState=== END){
gameOver.visible=true
restart.visible=true
ground.velocityX=0
trex.changeAnimation("collided")
obstacleGroup.setVelocityXEach(0) 
cloudGroup.setVelocityXEach(0)
trex.velocityY=0
obstacleGroup.setLifetimeEach(-1)
cloudGroup.setLifetimeEach(-1)

if(mousePressedOver(restart)){
reset()        
}

}




//stop trex from falling down
trex.collide(invisibleGround)


drawSprites();

}





function reset(){
score=0
gameState=PLAY
trex.changeAnimation("running")
obstacleGroup.destroyEach()
cloudGroup.destroyEach()
gameOver.visible = false
restart.visible = false

}







function spawnObstacles(){
if(frameCount % 80 === 0){

var obstacle = createSprite(600,160,25,45)
obstacle.velocityX=-3
var rand=Math.round(random(1,6))

switch(rand){

case 1: obstacle.addImage(obstacle1)
        break;


 
}

obstacle.scale=0.45
obstacle.lifetime=200


}


}



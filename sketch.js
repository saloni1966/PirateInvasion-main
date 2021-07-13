const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var boat


//example of array
var num = 3
var arr = [1, 2, 3, 4, 5, 'Syon', true, num];
console.log(arr.length);

arr.pop();
console.log(arr);

//create multiple balls

var balls = [];
var boats = [];


function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1100, 600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  tower = new Tower(150, 350, 160, 310);
  ground = new Ground(600, 580, 1100, 20)
  cannon = new Cannon(150, 200, 120, 30, angle);
  boat = new Boat(width, height- 30, 130, 130, -30)
 


}

function draw() {
  background(189);

  imageMode(CENTER)
  image(backgroundImg, 600, 300, width, height)




  Engine.update(engine);
  ground.show();
  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBall(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          boats[j].remove(j);

          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
          
        }
      } 
    }
  }
  tower.show();
  cannon.show()
 //boat.show()
 
//Matter.Body.setVelocity(boat.body,{x : -0.9,y:0})


}

//creating the cannon ball on key press
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new Ball(cannon.x, cannon.y);
    cannonBall.trajectory = [];
   Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall)
  }
}


function showCannonBall(ball, index) {
  ball.show();
if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
   balls.splice(index, 1);
  }
  
}
function showBoats() {
  
  if (boats.length > 0) {
  if(boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300){
    var positions = [-70, -0, -80, -50];
    var position = random(positions)
    boat = new Boat(width, height - 30, 130, 130, position);
    boats.push(boat)
    }
    for(var i = 0; i < boats.length; i++ ){
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      boats[i].show();
    }
  }else{
    var boat = new Boat(width, height - 30, 130, 130, -30);
    boats.push(boat);
  }
 

}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}




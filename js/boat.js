class Boat{
    constructor(x,y,width,height,boatPos){
        var options = {
            restitution: 0.8,
            density: 1,
            friction: 1
        }
        this.image = loadImage("assets/boat.png")
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.boatPosition = boatPos;
        World.add(world,this.body)
       
    }
    remove(index) {
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
    
      }
    show(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height)
        pop();
    }
}
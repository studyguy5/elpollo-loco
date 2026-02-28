class bottlesOnFloorObject extends MovableObject{

x;
y;
width;
height;
img;

constructor(x = 0, y = 0){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    
    this.x = 300 + Math.random() *3300;
    this.y = 360
    this.width = 50
    this.height = 60;
}

}
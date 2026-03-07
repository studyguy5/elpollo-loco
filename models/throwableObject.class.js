class ThrowableObject extends MovableObject {

    img;
    x;
    y;
    width;
    height;
    speedY;
    speedX;
    fallOfBottle = 0.13;
    // wordLink;
    otherDirection = false;


    constructor() {
        super()
        this.x = 120;
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
    }



    throw(speedX) {
        console.log(this.otherDirection)
        this.speedY = 25;

        // this.speedX = 45;
        this.applyGravity(speedX)




    }





}

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


    constructor() {
        super()
        // this.throw(100, 150)
        this.x = (Math.random() * 120);
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
    }



    throw() {

       

        console.log('Taste gedrückt ')
        this.speedY = 25;
        this.speedX = 45;
        this.applyGravity()
    }





}

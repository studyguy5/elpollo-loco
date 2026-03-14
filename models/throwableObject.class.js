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
    currentRotateImage = 0;

    bottle_Rotate_Images = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]


    constructor() {
        super()
        this.x = 120;
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadbottleRotationImages(this.bottle_Rotate_Images)
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
    }

    


    throw(speedX) {
        setInterval(() => {
            
            let path = this.bottle_Rotate_Images[this.currentRotateImage];
            this.img = this.bottleRotateImage[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
            this.currentRotateImage = (this.currentRotateImage + 1) % this.bottle_Rotate_Images.length;
        }, 1000/35);
        this.speedY = 15;

        // this.speedX = 45;
        this.applyGravity(speedX)




    }





}

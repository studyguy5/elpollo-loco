
class character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    currentImage = 0;
    world;
    speed = 10;
    ReverseSpeed = 10;
    constructor() {

        super().loadImage('img/2_character_pepe/2_walk/W-21.png'),
        this.loadImages(this.IMAGES_WALKING)
        this.animate()
        // this.catchKeyboard()
    }

//change position of character when key is pressed
    animate() {
        setInterval(() => {
            //Move right
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                // this.world.camera_x = -this.x;
            }
            //Move left
            if (this.world.Keyboard.LEFT && this.x > 150) {
                this.x -= this.ReverseSpeed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
            console.log(this.world.camera_x) //versetzt die Kamera proportional zur Position des Charakters
        }, 1000 / 24);
        
        //Animate character
        setInterval(() => {
            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.characterImages[path];
            this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;}
        }, 1000 / 24);
    }


    // catchKeyboard() {
    //     setInterval(() => {
    //         if (this.world.Keyboard.LEFT) {
    //             this.moveLeft();
    //         }
    //         if (this.world.Keyboard.RIGHT) {
    //             this.moveRight();
    //         }
    //         if (this.world.Keyboard.SPACE) {
    //             this.jump();
    //         }
    //         if (this.world.Keyboard.UP) {
    //             this.jump();
    //         }
    //         if (this.world.Keyboard.DOWN) {
    //             // this.duck();
    //         } else { }
    //     }, 1000 / 60);


    // }

}
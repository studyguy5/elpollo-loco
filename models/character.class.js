
class character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        // 'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        // 'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        // 'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]


    y = 40;
    currentImage = 0;
    currentJumpImage = 0;
    world;
    speed = 15;
    ReverseSpeed = 15;
    jumpSpeed;
    jump = false;
    constructor() {

        super().loadImage('img/2_character_pepe/2_walk/W-21.png'),
        this.loadImages(this.IMAGES_WALKING)
        this.loadJumpImages(this.IMAGES_JUMPING)
        this.applyGravity()
        this.Move_Character()
        this.animate_Character()
    }

    
        
    
    
    //==================change position of character when key is pressed
    Move_Character() {
        setInterval(() => {
            if (this.world.Keyboard.SPACE && !this.isAboveGround() && !this.jump) {
                this.jumpCharacter(this.jumpSpeed = 250);}
            //Move right
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRightCharacter(this.speed);}
            //Move left
            if (this.world.Keyboard.LEFT && this.x > 150) {
                this.moveLeftCharacter(this.speed);}
            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
            console.log(this.world.camera_x) //versetzt die Kamera proportional zur Position des Charakters
        }, 1000 / 25);

    }

    isCollidingWithEndboss(endboss) {
        return (this.x + this.width > endboss.x &&
            this.x < endboss.x + endboss.width &&
            this.y < endboss.y + endboss.height &&
            this.y + this.height > endboss.y);
    }


    isColliding(mo) {
        return (
        this.x + this.width > mo.x &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height &&
        this.y + this.height > mo.y
    );
}

    

    animate_Character() {
        //================Animate character============
        setInterval(() => {
            if (this.isAboveGround()) {
                let path = this.IMAGES_JUMPING[this.currentJumpImage];
                this.img = this.characterImages[path];
                this.currentJumpImage = (this.currentJumpImage + 1) % this.IMAGES_JUMPING.length;
            }

            // this.playAnimation(this.IMAGES_WALKING)
            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.characterImages[path];
                this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            }
        }, 1000 / 24);
    }
}
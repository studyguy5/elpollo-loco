
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

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
    ]


    y = 40;
    currentImage = 0;
    currentJumpImage = 0;
    currentHurtImage = 0;
    currentIdleImage = 0;
    currentDeathImage = 0;
    world;
    speed = 15;
    ReverseSpeed = 15;
    jumpSpeed;
    jump = false;



    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    constructor() {

        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png'),
        this.loadImages(this.IMAGES_WALKING)
        this.loadJumpImages(this.IMAGES_JUMPING)
        this.loadHurtImages(this.IMAGES_HURT)
        this.loadDeathImages(this.IMAGES_DEAD)
        this.loadIdleImages(this.IMAGES_IDLE)
        this.applyGravity()
        this.Move_Character()
        this.animatejumpAndWalking_Character()
        // this.playHurtAnimation()
    
    }
    
checkCollision; 



    //==================change position of character when key is pressed
    Move_Character() {
        setInterval(() => {
            if (this.world.Keyboard.SPACE && !this.isAboveGround() && !this.jump) {
                this.jumpCharacter(this.jumpSpeed = 250);
            }
            //Move right
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRightCharacter(this.speed);
            }
            //Move left
            if (this.world.Keyboard.LEFT && this.x > 150) {
                this.moveLeftCharacter(this.speed);
            }
            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
            // console.log(this.world.camera_x) //versetzt die Kamera proportional zur Position des Charakters
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



    isDeath() {
        
        return this.energy <= 0;
    }

    

    //=============== isColliding(mo) { with offset to check smaller rectacgles}================
    // isColliding(mo) {
    //   return (this.x + this.width - this.offsetRight > mo.x + mo.offsetLeft) &&
    //          (this.y + this.height - this.offsetBottom > mo.y + mo.offsetTop) &&
    //          (this.x + this.offsetLeft < mo.x + mo.width - mo.offsetRight) &&
    //          (this.y + this.offsetTop < mo.y + mo.height - mo.offsetBottom);
    // }

    // Bilder werden in ein objekt geladen, index ausgetauscht und auf das img gesetzt, in der movable Objekt werden die Bilder mit drawImage gezeichnet
    playIdleAnimation() {
        setInterval(() => {
            let path = this.IMAGES_IDLE[this.currentIdleImage];
            this.img = this.idleImages[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
            this.currentIdleImage = (this.currentIdleImage + 1) % this.IMAGES_IDLE.length;
        }, 1000 / 24);
    }
    
    
    playHurtAnimation(isHurt) {
        if (isHurt) {
            // console.log('playHurtAnimation läuft');
            let path = this.IMAGES_HURT[this.currentHurtImage];
            this.img = this.hurtImages[path];
            this.currentHurtImage = (this.currentHurtImage + 1) % this.IMAGES_HURT.length;
        } else {}
        
    }
    

    
    hurtInterval;
    
    // playHurtAnimation(isHurt) {
    //     this.hurtInterval = setInterval(() => {
    //         if (isHurt){
    //             console.log('playHurtAnimation läuft', isHurt);
    //         let path = this.IMAGES_HURT[this.currentHurtImage];
    //         this.img = this.hurtImages[path];
    //         this.currentHurtImage = (this.currentHurtImage + 1) % this.IMAGES_HURT.length;
    //     }else{}
        //     }, 1000 / 24);
        // }

    // stopHurtAnimation() {
    //     if (this.hurtInterval) {
    //         clearInterval(this.hurtInterval);
    //         this.hurtInterval = null;
    //         this.currentHurtImage = 0; // Reset the image counter
    //     }
    // }

    

    playDeathAnimation() {
        setInterval(() => {
            let path = this.IMAGES_DEAD[this.currentDeathImage];
            this.img = this.deathImages[path];
            this.currentDeathImage = (this.currentDeathImage + 1) % this.IMAGES_DEAD.length;
        }, 1000 / 24);
    }


    
    animatejumpAndWalking_Character() {
        //================Animate character============
        // this.checkCollision = this.world.isColliding();
        setInterval(() => {
            if (this.isAboveGround()) {
                let path = this.IMAGES_JUMPING[this.currentJumpImage];
                this.img = this.characterImages[path];
                this.currentJumpImage = (this.currentJumpImage + 1) % this.IMAGES_JUMPING.length;
            }

            //isColliding hier abfragen, damit dien animation hurt im vordergrund steht

            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.characterImages[path];
                this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            }
        }, 1000 / 24);
    }
}
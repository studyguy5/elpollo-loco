
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

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
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
    currentLongIdleImage = 0;
    currentDeathImage = 0;
    world;
    speed = 15;
    ReverseSpeed = 15;
    jumpSpeed;
    jump = false;

    invincibleUntil;

    offset = { //setup Values for Offset here
        top: 50,
        left: 20,
        right: 20,
        bottom: 10
    };


    constructor() {

        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png'),

            this.loadImages(this.IMAGES_WALKING)
        this.loadJumpImages(this.IMAGES_JUMPING)
        this.loadHurtImages(this.IMAGES_HURT)
        this.loadDeathImages(this.IMAGES_DEAD)
        this.loadIdleImages(this.IMAGES_IDLE)
        this.loadLongIdleImages(this.IMAGES_LONG_IDLE)
        this.applyGravity()
        this.showIdle_OnCharacter()
        this.Move_Character()
        this.playCharacter_Animations();
        this.animatejumpAndWalking_Character()

    }

    checkCollision;
    idleAnimation = null;
    longIdleAnimation = null;
    animationCounter = 0;
    normalIdle = true;
    sleepIdle = false;
    normal = null;
    long = null;

    //==================change position of character when key is pressed
    Move_Character() {
        setInterval(() => {
            if (this.world.Keyboard.SPACE && !this.isAboveGround() && !this.jump) {
                clearTimeout(this.normal);
                this.idleAnimation = null
                clearTimeout(this.long);
                this.long = null;
                this.normalIdle = true;
                this.sleepIdle = false;
                this.jumpCharacter(this.jumpSpeed = 250);
            }
            //Move right
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                clearTimeout(this.normal);
                this.idleAnimation = null
                clearTimeout(this.long);
                this.long = null;
                this.normalIdle = true;
                this.sleepIdle = false;

                this.moveRightCharacter(this.speed);
            }
            //Move left
            if (this.world.Keyboard.LEFT && this.x > 100) {
                clearTimeout(this.normal);
                this.idleAnimation = null
                clearTimeout(this.long);
                this.long = null;
                this.normalIdle = true;
                this.sleepIdle = false;
                this.moveLeftCharacter(this.speed);
            }

            if (!this.world.Keyboard.RIGHT && !this.world.Keyboard.LEFT && !this.world.Keyboard.SPACE) {
                if(!this.normal){
              this.normal = setTimeout(() => {
                this.normalIdle = false;
               }, 5000);}
               if(!this.long){
               this.long = setTimeout(() => {
                this.sleepIdle = true;
               }, 5000);}

                this.animationCounter++
                if(this.animationCounter % 3 === 0 && this.normalIdle){
                this.playIdleAnimation()}
                if(this.animationCounter % 3 === 0 && this.sleepIdle){
                this.playLongIdleAnimation()
                }
            }


            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
            // console.log(this.world.camera_x) //versetzt die Kamera proportional zur Position des Charakters
        }, 1000 / 25);

    }


    showIdle_OnCharacter() {

            this.IdleTimeout = setTimeout(() => {
                this.playIdleAnimation()
            }, 3000);

            this.longIdleTimeout = setTimeout(() => {
                this.playLongIdleAnimation()
            }, 8000);
    }


    isCollidingWithEndboss(endboss) {
        return (this.x + this.width -this.offset.right > endboss.x - endboss.offset.left &&
            this.x + this.offset.left < endboss.x + endboss.width - endboss.offset.right &&
            this.y - this.offset.top < endboss.y + endboss.height - endboss.offset.bottom &&
            this.y + this.height - this.offset.bottom > endboss.y + endboss.offset.top);
    }


    isColliding(mo) { 
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

    makeInvincible(seconds){
        let fiveSecond = seconds * 1000
        this.invincibleUntil = new Date().getTime() + fiveSecond
    }

    isInvincible(){
        let now = new Date().getTime()
        if(now < this.invincibleUntil){
            return true;
        }else{
            return false;
        }
    }

    isChrushingChicken(mo) { // it is easier without offset
        return (
            this.y + this.height - this.offset.bottom >= mo.y  &&
            this.y < 115 &&
            this.x + this.width - this.offset.right > mo.x &&
            this.x + this.offset.left < mo.x 
        );  // 8px Toleranz
    }

    isDeath() {
        return this.energy <= 0;
    }


    // Bilder werden in ein objekt geladen, index ausgetauscht und auf das img gesetzt, in der movable Objekt werden die Bilder mit drawImage gezeichnet
    playCharacter_Animations() {
        setInterval(() => {
            this.playHurtAnimation(); //normal
            this.playDeathAnimation();
        }, 1000 / 5);

    }

    playIdleAnimation() {
        let path = this.IMAGES_IDLE[this.currentIdleImage];
        this.img = this.idleImages[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentIdleImage = (this.currentIdleImage + 1) % this.IMAGES_IDLE.length;
    }

    playLongIdleAnimation() {
        let path = this.IMAGES_LONG_IDLE[this.currentLongIdleImage];
        this.img = this.longIdleImages[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentLongIdleImage = (this.currentLongIdleImage + 1) % this.IMAGES_LONG_IDLE.length;
    }



    playHurtAnimation() {
        if (this.world.isHurt()) {
            // console.log('playHurtAnimation läuft');
            let path = this.IMAGES_HURT[this.currentHurtImage];
            this.img = this.hurtImages[path];
            this.currentHurtImage = (this.currentHurtImage + 1) % this.IMAGES_HURT.length;
        } else { }

    }

    playDeathAnimation() {
        if (this.isDeath()) {
            let path = this.IMAGES_DEAD[this.currentDeathImage];
            this.img = this.deathImages[path];
            this.currentDeathImage = (this.currentDeathImage + 1) % this.IMAGES_DEAD.length;
        }
    }


    hurtInterval;

    animatejumpAndWalking_Character() {
        //================Animate character============
        // this.checkCollision = this.world.isColliding();
        setInterval(() => {
            if (this.isAboveGround()) {
                let path = this.IMAGES_JUMPING[this.currentJumpImage];
                this.img = this.characterImages[path];
                this.currentJumpImage = (this.currentJumpImage + 1) % this.IMAGES_JUMPING.length;
            }
            // if(!this.isAboveGround()){
            //     let path = this.IMAGES_IDLE[1];
            //     this.img = this.idleImages[path]; }

            //isColliding hier abfragen, damit dien animation hurt im vordergrund steht

            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.characterImages[path];
                this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            }
        }, 1000 / 24);
    }
}

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
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
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

    offsetCharacter = { //setup Values for Offset here
        top: 50,
        left: 30,
        right: 30,
        bottom: 30
    };


    constructor() {

        super()
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'),

            this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
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

    jumpsound = new Audio('/audio/jumpSound.mp3');
    walkSound = new Audio('/audio/character_walk.mp3')
    /**here we check keystrokes and update character position accordingly */
    Move_Character() {
        setStoppableInterval(() => {
            if (this.world.Keyboard.SPACE && !this.isAboveGround() && !this.jump) { this.jumpActions(); }
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.level_end_x) { this.moveRightActions(); }
            if (this.world.Keyboard.LEFT && this.x > 100) { this.moveLeftActions(); }
            if (!this.world.Keyboard.RIGHT && !this.world.Keyboard.LEFT) { this.walkSound.pause(); this.walkSound.currentTime = 0; }
            if (!this.world.Keyboard.SPACE){this.jumpsound.pause(); this.jumpsound.currentTime = 0;}
            if (!this.world.Keyboard.RIGHT && !this.world.Keyboard.LEFT && !this.world.Keyboard.SPACE) {
                if (!this.normal){this.setNormalTimeout();}
                if (!this.long){this.setLongTimeout();}
                this.animationCounter++
                if (this.animationCounter % 3 === 0 && this.normalIdle) {
                    this.playIdleAnimation()}
                if (this.animationCounter % 3 === 0 && this.sleepIdle) {
                    this.playLongIdleAnimation()}}
            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
        }, 1000 / 40);
    }

    /**here we animate the character's jump and stop Idle Animation */
    jumpActions() {
        clearTimeout(this.normal);
        this.idleAnimation = null
        clearTimeout(this.long);
        this.long = null;
        this.normalIdle = true;
        this.sleepIdle = false;
        this.jumpCharacter(this.jumpSpeed = 250);
        if (localStorage.getItem('muteStatus') == 'true') { } else {
            this.jumpsound.volume = 0.1;
            this.jumpsound.play()
        }
    }

    /**here we handle the character's movement to the right and stop Idle Animation */
    moveRightActions() {
        clearTimeout(this.normal);
        this.idleAnimation = null
        clearTimeout(this.long);
        this.long = null;
        this.normalIdle = true;
        this.sleepIdle = false;
        this.moveRightCharacter(this.speed);
        if (localStorage.getItem('muteStatus') == 'true') { } else {
            this.walkSound.volume = 0.1;
            this.walkSound.play()
        }
    }

    /**here we handle the character's movement to the left and stop Idle Animation */
    moveLeftActions() {
        clearTimeout(this.normal);
        this.idleAnimation = null
        clearTimeout(this.long);
        this.long = null;
        this.normalIdle = true;
        this.sleepIdle = false;
        this.moveLeftCharacter(this.speed);
        if (localStorage.getItem('muteStatus') == 'true') { } else {
            this.walkSound.volume = 0.1;
            this.walkSound.play()
        }
    }

    /** here we set a timeout for the normal idle animation */
    setNormalTimeout() {
        this.normal = setTimeout(() => {
                        this.normalIdle = false;
                    }, 8000);
    }

    /** here we set a timeout for the long idle animation */
    setLongTimeout() {
        this.long = setTimeout(() => {
                        this.sleepIdle = true;
                    }, 8000);
    }


    /**this shows the idle animation on the character after a set time */
    showIdle_OnCharacter() {
        this.IdleTimeout = setTimeout(() => {
            this.playIdleAnimation()
        }, 3000);
        this.longIdleTimeout = setTimeout(() => {
            this.playLongIdleAnimation()
        }, 8000);
    }

    /**this checks if the character is colliding with the end boss */
    isCollidingWithEndboss(endboss) {
        return (this.x + this.width - this.offset.right > endboss.x - endboss.offset.left &&
            this.x + this.offset.left < endboss.x + endboss.width - endboss.offset.right &&
            this.y - this.offset.top < endboss.y + endboss.height - endboss.offset.bottom &&
            this.y + this.height - this.offset.bottom > endboss.y + endboss.offset.top);
    }

    /**this checks if the character is colliding with a normal chicken */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetCharacter.right > mo.x &&
            this.x + this.offsetCharacter.left < mo.x + mo.width &&
            this.y + this.offsetCharacter.top < mo.y + mo.height &&
            this.y + this.height - this.offsetCharacter.bottom > mo.y + (mo.height * 0.7) &&
            this.y <= 125
        );
    }



    /**this checks if the character is chrushing a normal chicken */
    isChrushingChicken(mo) { // it is easier without offset
        return (
            this.x + this.width - this.offset.right > mo.x &&
            this.x + this.offsetCharacter.left < mo.x + mo.width &&
            this.y + this.height - this.offsetCharacter.bottom >= mo.y + this.offset.top &&
            this.speedY < 0 &&
            // this.y < 125 &&
            this.y + this.height - this.offsetCharacter.bottom <= mo.y + this.offset.top + (mo.height * 0.5)
        );
    }

    /**this checks if the character is colliding with a mini chicken */
    isCollidingMiniChicken(mo) {
        return (
            this.x + this.width - this.offsetCharacter.right > mo.x + mo.offsetMini.left &&
            this.x + this.offsetCharacter.left < mo.x + mo.width - mo.offsetMini.right &&
            this.y + this.height - this.offsetCharacter.bottom >= mo.y + (mo.height * 0.6) &&
            this.y <= 125
        );

    }

    /**this checks if the character is chrushing a mini chicken */
    isChrushingMiniChicken(mo) {
        return (
            this.x + this.width - this.offsetCharacter.right > mo.x &&
            this.x + this.offsetCharacter.left < mo.x + mo.width &&
            this.y + this.height - this.offsetCharacter.bottom >= mo.y + this.offsetMini.top &&
            this.speedY < -0 &&
            // this.y <= 125 && 
            this.y + this.height - this.offsetCharacter.bottom <= mo.y + this.offsetMini.top + (mo.height * 0.5)
        );
    }

    /**here we make the character invincible for a specified number of seconds */
    makeInvincible(seconds) {
        let fiveSecond = seconds * 1000
        this.invincibleUntil = new Date().getTime() + fiveSecond
    }

    /**this checks the time who has passed and sets the invincibility status */
    isInvincible() {
        let now = new Date().getTime()
        if (now < this.invincibleUntil) {
            return true;
        } else {
            return false;
        }
    }


    /**this checks if the character is dead */
    isDeath() {
        return this.energy <= 0;
    }


    /**here we play the character's hurt and death animation */
    playCharacter_Animations() {
        setStoppableInterval(() => {
            this.playHurtAnimation(); //normal
            this.playDeathAnimation();
        }, 1000 / 5);

    }

    /**here we play the idle animation */
    playIdleAnimation() {
        let path = this.IMAGES_IDLE[this.currentIdleImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentIdleImage = (this.currentIdleImage + 1) % this.IMAGES_IDLE.length;
    }

    /**here we play the long idle animation */
    playLongIdleAnimation() {
        let path = this.IMAGES_LONG_IDLE[this.currentLongIdleImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentLongIdleImage = (this.currentLongIdleImage + 1) % this.IMAGES_LONG_IDLE.length;
    }


    count = 0;
    /**here we play the hurt animation */
    playHurtAnimation() {
        this.count++
        if (this.world.isHurt() && this.count % 4 === 0) {
            let path = this.IMAGES_HURT[this.currentHurtImage];
            this.img = this.imageChache[path];
            this.currentHurtImage = (this.currentHurtImage + 1) % this.IMAGES_HURT.length;
        } else { }

    }

    /**here we play the death animation */
    playDeathAnimation() {
        if (this.isDeath()) {
            let path = this.IMAGES_DEAD[this.currentDeathImage];
            this.img = this.imageChache[path];
            this.currentDeathImage = (this.currentDeathImage + 1) % this.IMAGES_DEAD.length;
        }
    }



    /**here we animate the character's jumping and walking */
    animatejumpAndWalking_Character() {
        //================Animate character============
        setStoppableInterval(() => {
            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
                let path = this.IMAGES_WALKING[this.currentImage];
                this.img = this.imageChache[path];
                this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            }
        }, 1000 / 24);

        setStoppableInterval(() => {
            if (this.isAboveGround()) {
                let path = this.IMAGES_JUMPING[this.currentJumpImage];
                this.img = this.imageChache[path];
                this.currentJumpImage = (this.currentJumpImage + 1) % this.IMAGES_JUMPING.length;
            }
        }, 1000 / 10);
    }
}







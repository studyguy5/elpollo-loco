/**
 * @class character this class represents the main character in the game, which is controlled by the player. 
 * It extends the MovableObject class, which provides basic movement and animation functionality. 
 * The character class includes properties for different animations (walking, jumping, idle, hurt, dead), 
 * as well as methods for handling movement, collisions, and animations.
 */
class character extends MovableObject {

    /**
     * @property {string[]} IMAGES_WALKING this array contains the image paths for the character walking animation,
     * @property {string[]} IMAGES_JUMPING this array contains the image paths for the character jumping animation,
     * @property {string[]} IMAGES_IDLE this array contains the image paths for the character idle animation,
     * @property {string[]} IMAGES_LONG_IDLE this array contains the image paths for the character long idle animation,
     * @property {string[]} IMAGES_HURT this array contains the image paths for the character hurt animation,
     * @property {string[]} IMAGES_DEAD this array contains the image paths for the character dead animation,
     * these arrays are used for the character animations and are loaded in the constructor
     * @type {number} y this is the y position of the character in the game, which is used for the character's position on the canvas
     * @property {number} currentImage this is the index of the current image for the character walking animation, which is used for the character walking animation
     * @property {number} currentJumpImage this is the index of the current image for the character jumping animation, which is used for the character jumping animation
     * @property {number} currentHurtImage this is the index of the current image for the character hurt animation, which is used for the character hurt animation
     * @property {number} currentIdleImage this is the index of the current image for the character idle animation, which is used for the character idle animation
     * @property {number} currentLongIdleImage this is the index of the current image for the character long idle animation, which is used for the character long idle animation
     * @property {number} currentDeathImage this is the index of the current image for the character dead animation, which is used for the character dead animation
     * @property {World} world this is the world object, which is used to access the character and the endboss, and to check for collisions and other interactions in the game
     * @property {number} speed this is the speed of the character, which is used for moving the character to the right and left
     * @property {number} ReverseSpeed this is the speed of the character, which is used for moving the character to the left
     * @property {number} jumpSpeed this is the speed of the character, which is used for jumping and applying gravity to the character
     * @property {boolean} jump this is a boolean that indicates whether the character is currently jumping, which is used for handling the character's jump actions and animations
     * @property {number} invincibleUntil this is a timestamp that indicates until when the character is invincible, 
     * which is used for handling the character's invincibility after getting hurt
     * @property {object} offsetCharacter this is an object that contains the offset values for the character's collision detection, 
     * which is used for checking collisions with other objects in the game
     * @property {function} checkCollision this is a function that checks for collisions between the character and other objects in the game,
     * @property {number} animationCounter this is a counter that is used for controlling the timing of the character's idle animations,
     * @property {boolean} normalIdle this is a boolean that indicates whether the character is in the normal idle state, 
     * which is used for controlling the character's idle animations,
     * @property {boolean} sleepIdle this is a boolean that indicates whether the character is in the long idle state,
     * which is used for controlling the character's long idle animations,
     * @property {number} idleAnimation  this is defined as null, but it is the varialbe for the idle Intervall
     * @type {number} longIdleAnimation  this is defined as null, but it is the varialbe for the long idle Intervall
     * @type {number} normal this is a Timeout for the idle animation
     * @type {number} long this is a Timeout for the long idle animation
     * @type {audio} jumpSound this is the sound that plays when the character jumps, 
     * which is used for adding sound effects to the game
     * @type {audio} walkSound this is the sound that plays when the character walks, 
     * which is used for adding sound effects to the game  
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        // 'img/2_character_pepe/3_jump/J-31.png',
        // 'img/2_character_pepe/3_jump/J-32.png',
        // 'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        // 'img/2_character_pepe/3_jump/J-39.png',
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
    
    checkCollision;
    idleAnimation = null;
    longIdleAnimation = null;
    animationCounter = 0;
    normalIdle = true;
    sleepIdle = false;
    normal = null;
    long = null;

    

    /**
     * @constructor this constructor loads the images for the character animations, 
     * applies gravity to the character, shows the idle animation on the character, 
     * handles the character's movement and plays the character's animations
     * @type {function} loadImage this function loads the first idle image for the character, 
     * which is used for the character's initial appearance in the game
     * @type {function} loadImages this function loads the images for the character
     *  walking, jumping, hurt, dead, idle and long idle animations,
     * @type {function} applyGravity this function applies gravity to the character, 
     * which is used for the character's jump and fall actions
     * 
     */
    constructor() {
        super()
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png'),
            this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.applyGravity(this.speedY = 1.5);
        
    }

    

    /**here we animate the character's jump and stop Idle Animation
     * @returns void
     */
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

    /**here we handle the character's movement to the right and stop Idle Animation
     * @returns void    
     */
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

    /**here we handle the character's movement to the left and stop Idle Animation
     * @returns void
     */
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

    /** here we set a timeout for the normal idle animation
     * @type {boolean} false
     * @returns void
     */
    setNormalTimeout() {
        this.normal = setTimeout(() => {
            this.normalIdle = false;
        }, 8000);
    }

    /** here we set a timeout for the long idle animation
     * @type {boolean} true
     * @returns void
     */
    setLongTimeout() {
        this.long = setTimeout(() => {
            this.sleepIdle = true;
        }, 8000);
    }


    

    /**this checks if the character is colliding with the end boss
     * @returns {boolean} true if the character is colliding with the end boss, false if it is not
     */
    isCollidingWithEndboss(endboss) {
        
        return (this.x + this.width - this.offset.right > endboss.x + endboss.offset.left &&
            this.x + this.offset.left < endboss.x + endboss.width - endboss.offset.right &&
            this.y - this.offset.top < endboss.y + endboss.height - endboss.offset.bottom &&
            this.y + this.height - this.offset.bottom > endboss.y + endboss.offset.top);
    }

    /**this checks if the character is colliding with a normal chicken
     * @returns {boolean} true if the character is colliding with a normal chicken, false if it is not
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offsetCharacter.right > mo.x &&
            this.x + this.offsetCharacter.left < mo.x + mo.width &&
            this.y + this.offsetCharacter.top < mo.y + mo.height &&
            this.y + this.height - this.offsetCharacter.bottom > mo.y + (mo.height * 0.7) &&
            this.y <= 125
        );
    }



    /**this checks if the character is chrushing a normal chicken
     * @returns {boolean} true if the character is chrushing a normal chicken, false if it is not
     */
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

    /**this checks if the character is colliding with a mini chicken
     * @returns {boolean} true if the character is colliding with a mini chicken, false if it is not
     */
    isCollidingMiniChicken(mo) {
        return (
            this.x + this.width - this.offsetCharacter.right > mo.x + mo.offsetMini.left &&
            this.x + this.offsetCharacter.left < mo.x + mo.width - mo.offsetMini.right &&
            this.y + this.height - this.offsetCharacter.bottom >= mo.y + (mo.height * 0.6) &&
            this.y <= 125
        );

    }

    /**this checks if the character is chrushing a mini chicken
     * @returns {boolean} true if the character is chrushing a mini chicken, false if it is not
     */
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

    /**here we make the character invincible for a specified number of seconds
     * @type {number} seconds the number of seconds the character will be invincible
     */
    makeInvincible(seconds) {
        let fiveSecond = seconds * 1000
        this.invincibleUntil = new Date().getTime() + fiveSecond
    }

    /**this checks the time who has passed and sets the invincibility status
     * @returns {boolean} true if the character is invincible, false if it is not
     */
    isInvincible() {
        let now = new Date().getTime()
        if (now < this.invincibleUntil) {
            return true;
        } else {
            return false;
        }
    }


    /**this checks if the character is dead
     * @returns {boolean} true if the character is dead, false if it is not
     */
    isDeath() {
        return this.energy <= 0 || this.x > this.world.level.endboss[0].x + this.world.level.endboss[0].width;
    }

    /**here we play the idle animation
     * @type {function} playIdleAnimation this function shows the idle animation on the character
     * @returns void
     */
    playIdleAnimation() {
        if(this.world.isHurt()) return
        let path = this.IMAGES_IDLE[this.currentIdleImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentIdleImage = (this.currentIdleImage + 1) % this.IMAGES_IDLE.length;
    }

    /**here we play the long idle animation
     * @type {function} playLongIdleAnimation this function shows the long idle animation on the character
     * @returns void
     */
    playLongIdleAnimation() {
        if(this.world.isHurt()) return
        let path = this.IMAGES_LONG_IDLE[this.currentLongIdleImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentLongIdleImage = (this.currentLongIdleImage + 1) % this.IMAGES_LONG_IDLE.length;
    }

    /**
     * this does slow down the idle animation
     *  */
    count = 0;

    /**here we play the hurt animation
     * @type {HTMLImageElement} img for the hurt Animation
     * @returns void
     */
    playHurtAnimation() {
        this.count++
        if (this.world.isHurt() && this.count % 40 === 0) {
            let path = this.IMAGES_HURT[this.currentHurtImage];
            this.img = this.imageChache[path];
            this.currentHurtImage = (this.currentHurtImage + 1) % this.IMAGES_HURT.length;
        } else { }

    }

    /**here we play the death animation
     * @type {HTMLImageElement} img for the death Animation
     * @returns void
     */
    playDeathAnimation() {
        if (this.isDeath()) {
            let path = this.IMAGES_DEAD[this.currentDeathImage];
            this.img = this.imageChache[path];
            this.currentDeathImage = (this.currentDeathImage + 1) % this.IMAGES_DEAD.length;
        }
    }
}







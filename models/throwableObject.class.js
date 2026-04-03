/**
 * @classdesc
 */

class ThrowableObject extends MovableObject {

    /** @property {HTMLImageElement} img the image for the throwable object 
     * @property {number} x the x position of the throwable object
     * @property {number} y the y position of the throwable object
     * @property {number} width the width of the throwable object
     * @property {number} height the height of the throwable object
     * @property {number} speedY the speedY for the throwable object, which is used for jumping and gravity
     * @property {number} speedX the speedX for the throwable object, which is used for moving the bottle to the right
     * @property {boolean} otherDirection we define the otherDirection for the throwable object, 
     * which is used for drawing the character in the other direction
     * @property {number} currentRotateImage the index of the current image for the bottle rotation animation,
     * which is used for the bottle rotation animation
     * @property {number} currentBottleSplashImage the index of the current image for the bottle splash animation,
     * which is used for the bottle splash animation
     * @property {number} intervalId the id for the interval, which is used for clearing the interval when the bottle hits something
     * @property {boolean} hit we define the hit for the throwable object, which is used for checking if the bottle has hit something
     * @property {number} acceleration we define the acceleration for the throwable object, which is used for applying gravity to the bottle
     * @property {number} speedY we define the speedY for the throwable object, which is used for applying gravity to the bottle
     * @property {string[]} bottle_Rotate_Images the array of image paths for the bottle rotation animation, 
     * which is used for the bottle rotation animation
     * @property {string[]} bottle_SPLASH_Images the array of image paths for the bottle splash animation, 
     * which is used for the bottle splash animation
    */

    img;
    x;
    y;
    width;
    height;
    speedY;
    speedX;
    otherDirection = false;
    currentRotateImage = 0;
    currentBottleSplashImage = 0;

    intervalId;
    hit = false;
    speedY = 0;
    acceleration = 3;
    speedY = 15;
    world;

    bottle_Rotate_Images = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    bottle_SPLASH_Images = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    /**
     * @constructor creates a new throwable object and loads the images for the bottle rotation and bottle splash animation
     * @type {number} x the x position of the throwable object
     * @type {number} y the y position of the throwable object
     * @type {number} width the width of the throwable object
     * @type {number} height the height of the throwable object
     * @type {function} loadImage function to load the image for the rotation animation object @returns void
     * @type {function} loadImages function to load the images for the bottle splash animation @returns void
     * @type {function} loadImage function to load the first image for the bottle rotation animation @returns void
     * @type {function} loadImage function to load the first image for the bottle splash animation @returns void
     */
    constructor(Character) {
        super()
        this.x = Character.x;
        this.y = Character.y + 20;
        this.width = 40;
        this.height = 80;
        this.loadImages(this.bottle_Rotate_Images);
        this.loadImages(this.bottle_SPLASH_Images);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
    }



    /**here we handle the throwing of the bottle and the collision with the enemies and the endboss
     * @param {number} speedX the speedX for the throwable object, which is used for moving the bottle to the right
     * @param {worldConnection} world the connection to the world object, which is used for checking the collisions 
     * with the enemies and the endboss
     * @type {function} bottleRotation_Animation function to handle the bottle rotation animation @returns void
     * @returns void
     * @type {function} applyGravityBottle function to handle the gravity for the bottle @returns void
     */
    throw(speedX, world) {
        this.intervalId = setStoppableInterval(() => {
            if (this.hit) { } else {
                const { enemiesC, miniEnemiesC, endbossC } = this.checkCollisionsWithBottle(world);
                if(enemiesC || miniEnemiesC || endbossC || this.y > 360) {
                    this.hit = true;
                    clearInterval(this.intervalId);
                    this.splashBottle();
                    return;
                }
                this.bottleRotation_Animation();
                this.applyGravityBottle(speedX)
            }
        
        }, 1000 / 45);
    }
    

    /**here we play the bottle rotation animation
     * @type {HTMLImageElement} img the image for the bottle rotation animation, which is used for the bottle rotation animation
     * @type {number} currentRotateImage the index of the current image for the bottle rotation animation, which is used for the bottle rotation animation
     * @returns void
     */
    bottleRotation_Animation() {
        let path = this.bottle_Rotate_Images[this.currentRotateImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentRotateImage = (this.currentRotateImage + 1) % this.bottle_Rotate_Images.length;
    }

    /**here we check if the bottle is colliding with the enemies or the endboss and return true or false
     * @param {worldConnection} world the connection to the world object, which is used for checking the collisions with the enemies and the endboss
     * @returns object with the properties enemiesC, miniEnemiesC and endbossC, which are true or false depending on the collisions with the enemies and the endboss
     */
    checkCollisionsWithBottle(world) {
        let enemiesC = world.level.enemies.find(e => world.bottleisCollidingWithChicken(e));
        let miniEnemiesC = world.level.miniEnemies.find(e => world.bottleisCollidingWithMiniChicken(e));
        let endbossC = world.level.endboss.find(e => e.bottleisCollidingWithEndboss(e));
        return { enemiesC, miniEnemiesC, endbossC };
    }

    /**here we apply gravity to the bottle
     * @param {number} speedX the speedX for the throwable object, which is used for moving the bottle to the right
     * @type {number} x the x position of the throwable object, which is used for moving the bottle to the right
     * @type {number} y the y position of the throwable object, which is used for applying gravity to the bottle
     * @type {number} speedY the vertical speed of the throwable object, which is used for applying gravity to the bottle
     * @type {number} acceleration the acceleration due to gravity, which is used
     *  for to increase gravity after a certain time to the bottle
     */
    applyGravityBottle(speedX) {
        this.x += speedX;
        this.y -= this.speedY;
        this.speedY -= this.acceleration
    }

    /**this animation appears when the bottle hits something
     * @type {HTMLImageElement} img the image for the bottle splash animation, which is used for the bottle splash animation
     * @type {number} currentBottleSplashImage the index of the current image for the bottle splash animation, which is used for the bottle splash animation
     * @returns void
     */
    splashBottle() {
        setStoppableInterval(() => {
            let path = this.bottle_SPLASH_Images[this.currentBottleSplashImage]
            this.img = this.imageChache[path];
            this.currentBottleSplashImage = (this.currentBottleSplashImage + 1) % this.bottle_SPLASH_Images.length
        }, 1000 / 20)
    }
}

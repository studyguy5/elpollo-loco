/**
 * @classdesc this class is for the chickens in the game, which are one of the enemies. They have a walking and a crushing animation, which are both handled in this class. The chickens move to the left side
 *  and have a random speed and x value when they are created.
 */
class chicken extends MovableObject {
    /**
     * @property {number} height this is the height of the chickens in the game
     * @property {number} width this is the width of the chickens in the game
     * @property {HTMLImageElement} img this is the image for the chicken, which is used for
     * the walking and crushing animation of the chicken
     * @property {string[]} chicken_WALKING this is the array of image paths for the chicken walking animation, which is used for the chicken walking animation
     * @property {number} speed this is the speed of the chicken, which is used for moving the chicken to the left
     * @property {number} chickenIntervall this is the interval for the chicken walking animation, 
     * which is used for the chicken walking animation
     * @property {number} currentImage this is the index of the current image for the chicken walking animation, 
     * which is used for the chicken walking animation
     */
    height = 70;
    width = 40;
    img;
    chicken_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    speed = 0.3 + Math.random() * 0.5;
    chickenIntervall;
    currentImage = 0;

    /**
     * @constructor creates a new chicken object with random x position and y position,
     * and loads the walking animation for the chicken
     * @type {function} loadImage this function loads the image for the chicken, which is used for the chicken walking animation
     * @type {function} loadImages this function loads the images for the chicken walking animation, 
     * which is used for the chicken walking animation
     * @type {number} x the x position of the chicken, which is used for the chicken walking animation
     * @type {number} y the y position of the chicken, which is used for the chicken walking animation
     * @type {function} animateChicken this function makes the chicken walk 
     * from right to left with the walking animation @returns void
     * @type {function} moveLeft this function moves the chicken to the left side continously, 
     * which is used for moving the chicken to the left
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.chicken_WALKING)
        this.y = 345;
        this.x = 400 + Math.random() * 3000;
        this.animateChicken()
        this.moveLeft(this.speed);
    }

    
    /**this is the animation for the chicken to walk
     * @type {HTMLImageElement} img the image for the chicken walking animation, which is used for the chicken walking animation
     * @returns void
     */
    animateChicken() {
        this.chickenIntervall = setStoppableInterval(() => {
            let path = this.chicken_WALKING[this.currentImage];
            this.img = this.imageChache[path];
            this.currentImage = (this.currentImage + 1) % this.chicken_WALKING.length;
        }, 1000 / 20);
    }

    /**this is the animation for the chicken to crush
     * @type {function} chrushChicken this function plays the crushing animation for the chicken 
     * when it gets crushed by the character
     * @type {function} clearInterval this function clears the interval for the chicken walking animation, 
     * which is used for stopping the chicken walking animation when the chicken gets crushed
     */
    chrushChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        clearInterval(this.chickenIntervall)
        this.speed = 0;
        setTimeout(() => { 
            this.y = 490 }, 1500);
    }
}

/**
 * @classdesc this class is used to create the mini chickens, which are the small enemies in the game, they walk from right to left and can be crushed by the character
 * they also have a walking animation and a death animation when they are crushed
 */
class miniChicken extends MovableObject {

    /** @property {number} width the width of the mini chicken
     * @property {number} height the height of the mini chicken
     * @property {number} x the x position of the mini chicken
     * @property {number} y the y position of the mini chicken
     * @property {number} walkingSpeed the speed at which the mini chicken walks
     * @property {number} currentMiniChickenImage the index of the current image for the mini chicken walking animation, 
     * which is used for the mini chicken walking animation
     * @property {number} miniChickenIntervall the interval for the mini chicken walking animation, 
     * which is used for the mini chicken walking animation
     * @type {string[]} smallChickenWalk the array of image paths for the mini chicken walking animation,
     * which is used for the mini chicken walking animation
     */
    width = 50;
    height = 50;
    x;
    y;
    walkingSpeed = 1.2;
    currentMiniChickenImage = 0;
    miniChickenIntervall;


    smallChickenWalk = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    /**
     * @constructor creates a new mini chicken object with random x position and y position, 
     * and loads the walking animation for the mini chicken
     * @property {HTMLImageElement} img the image for the mini chicken, which is used for the mini chicken walking animation
      * @property {number} x the x position of the mini chicken, which is used for the mini chicken walking animation
     * @property {number} y the y position of the mini chicken, which is used for the mini chicken walking animation
     * @type {function} miniChickenWalk function to make the mini chicken walk from right to left 
     * with the walking animation @returns void
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.smallChickenWalk)
        this.x = 400 + Math.random() * 3000;
        this.y = 365;
        this.miniChickenWalk()
    }


    /**this function makes the mini chicken walk
     * @type {number} x the x position of the mini chicken, which is used for moving the mini chicken to the left
     * @type {number} walkingSpeed the speed at which the mini chicken walks, which is used for moving the mini chicken to the left
     * @type {number} currentMiniChickenImage the index of the current image for the mini chicken walking animation, which is used for the mini chicken walking animation
     * @type {HTMLImageElement} img the image for the mini chicken walking animation, which is used for the mini chicken walking animation
     * @returns void
     */
    miniChickenWalk() {
        this.miniChickenIntervall = setStoppableInterval(() => {
            this.x -= this.walkingSpeed;
            let path = this.smallChickenWalk[this.currentMiniChickenImage];
            this.img = this.imageChache[path];
            this.currentMiniChickenImage = (this.currentMiniChickenImage + 1) % this.smallChickenWalk.length;
        }, 1000 / 24);
    }

    /**this function crashes the mini chicken
     * @type {HTMLImageElement} img the image for the mini chicken death animation, which is used for the mini chicken death animation
     * @type {number} miniChickenIntervall the interval for the mini chicken walking animation, which is used for clearing the interval when the mini chicken is crushed
     * @type {number} speed the speed of the mini chicken, which is set to 0 when the mini chicken is crushed
     * @returns void
     */
    chrushMiniChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
        clearInterval(this.miniChickenIntervall)
        this.speed = 0;
        setTimeout(() => {
            this.y = 490
        }, 500);
    }

}
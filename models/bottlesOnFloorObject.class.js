
/**
 * the bottle on the floor object class, which extends the movable object class and creates
 *  some  bottles on the floor with img index one or two and gives them random x positions
 */

class bottlesOnFloorObject extends MovableObject {
    
    /**
     * A bottle on the floor object
     * @property {number} x the x position of the bottle on the floor
     * @property {number} y the y position of the bottle on the floor
     * @property {number} width the width of the bottle on the floor
     * @property {number} height the height of the bottle on the floor
     * @property {HTMLImageElement} img the image for the bottle on the floor
     * @property {worldConnection} worldConnection the connection to the world object
     * @property {number} randomIndex the random index for the bottle image
     * @property {number} random_x the random x position for the bottle on the floor
     */
    x;
    y;
    width;
    height;
    img;
    worldConnection;
    randomIndex = (Math.random() * 2)
    random_x;

    /**
     * @constructor creates a new bottle on the floor object with random image and random x position
     * @type {function} chooseNumber function to choose a random number for the bottle image @returns nuber 1 or 2
     * @type {function} loadImage function to load the image for the bottle on the floor @returns void
     * @type {number} random_x the random x position for the bottle on the floor
     * @type {number} x the x position of the bottle on the floor
     * @type {number} y the y position of the bottle on the floor
     * @type {number} width the width of the bottle on the floor
     * @type {number} height the height of the bottle on the floor
     */
    constructor() {
        super()
        this.chooseNumber()
        this.loadImage(`img/6_salsa_bottle/${this.randomIndex}_salsa_bottle_on_ground.png`)
        this.random_x = 300 + Math.random() * 3000;
        this.x = Math.trunc(this.random_x)
        this.y = 360
        this.width = 50
        this.height = 60;
    }


    /**
     * 
     *this function chooses a random number for the bottle image
     * randomIndex the random index for the bottle image
     * @returns number 1 or 2 for the bottle image 
     */
    chooseNumber() {
        if (this.randomIndex > 1.5) {
            this.randomIndex = 2;
        } else { this.randomIndex = 1 }
        return this.randomIndex;
    }
}

/**
 * @class cloud this class is used to create the clouds in the game and move it to the left side continously
 */

class cloud extends MovableObject{

    /**
     * @property {number} y this y is the y position of the clouds in the game
     * @property {number} height this is the height of the clouds moving in the game
     * @property {number} width this is the width of the clouds moving in the game
     * 
     */
    y = 20;
    height = 480;
    width = 720;
    

    /**
     * @constructor this constructor loads the cloud image, sets x and y values and finaly moves the clouds
     * @type {function} loadImage here we load the image for every cloud inserted in the game
     * @param {number} y sets the y value for the clouds
     * @param {number} x this sets the random x value for the clouds
     * @type {function} animate this function moves the clouds to the left side continously
     */
    constructor(y = 0, x = 0) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * (Math.random() * 3400);
        this.y = y;
        this.animate()
    };

    /**
     * @type {function} moveLeft this moves the clouds to the left side continously
     * @returns void
     */
    animate() {
    this.moveLeft()
}

    
};
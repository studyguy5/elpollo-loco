
/**
 * @class background this class represents the background in the game, which is a movable object.
 */
class background extends MovableObject{
    /**
     * @property {number} x the x position of the background
     * @property {number} y the y position of the background
     * @property {HTMLImageElement} img the image for the background
     */
x;
y;
img;


    /**
     * 
     * @constructor creates a new background object
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {function} loadBackgroundImage
     *  
     */
    constructor(x = 0, y = 0, width = 720, height = 480, path = ''){
        super()
        this.loadBackgroundImage(path)
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width; 
    }

    /**
     * 
     * @param {string} path loads an image into the background
     * @returns void 
     */
    loadBackgroundImage(path){
        this.img = new Image()
        this.img.src= path;
        
    }


}
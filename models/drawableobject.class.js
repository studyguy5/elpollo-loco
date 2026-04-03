/**
 * @classdesc this class is for all object we have to draw on the canvas and holds functions to draw object, 
 * background layers and loads images
 */

class DrawableObjekt {

    /**
     * @property {object} imageChache this is the big object we put all images for animation in, and choose via key the right one
     * when we need the pictures
     * @property {number} subtrahendMax this number is the border for reaching too far left out of the screen
     * @property {HTMLCanvasElement} ctx this variable holds the 2d context for the canvas in order to draw
     * @property {HTMLCanvasElement} canvas this is the id for the canvas div we want to draw Objects in
     * @property {number} x this x is the x-Axis position of the character
     * @property {number} y this y is the y-Axis position of the character
     * @property {number} height this height is for the Character
     * @property {number} width this width is for the character
     * @property {HTMLImageElement} img this is the img of the Character itself
     */
    imageChache = {}; 
    subtrahendMax = -20;
    ctx;
    canvas;
    x = 80;
    y = 145;
    height = 300;
    width = 100;
    img;    
    

    /**
     * @constructor here we get the connection to the canvas window and the context window in ctx
     */
    constructor() {
        const canvas = document.getElementById('gameCanvas');
        this.ctx = canvas.getContext('2d');
        
    }

    /**
     * here we draw some single images whithout animation for the drawable object
     * @type {HTMLImageElement} img this img loads some drawable Objects
     * @returns void
     */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    
    /**
     * here we draw the image for the drawable object
     * @type {HTMLImageElement} img here we draw Objects like the character or something else
     * @returns void */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * here we draw the image for the drawable object in the other direction
     * @type {HTMLImageElement} img here we draw the character in reverse direction
     * @returns void */
     * 
    drawBackward(ctx) {
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }

    /**
     * here we draw the background images for the world
     * @type {HTMLImageElement} img here we draw Objects like the background layers in the game
     * @returns void */
    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    
    /**
     * here we load all Images from all classes into the image cache
     * @type {HTMLImageElement} img this img load diferent images from inheritad classes like movable Object or something else
     * @type {object} imageChache here we collect all Object Images to use it and draw it on the canvas */
    loadImages(arr) { 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageChache[path] = img; 
        })
    }
}
/**
 * @class the start screen class is responsible for loading and drawing the start screen image on the canvas.
 *  It also has a function to hide the start screen when the game starts.
 */

class StartScreen {
    /**
     * @property {HTMLImageElement} img the image for the start screen
     * @property {HTMLCanvasElement} canvas the canvas element for the start screen
     * @property {number} heigth the height of the start screen
     * @property {number} width the width of the start screen
     * @property {number} y the y position of the start screen
     * @property {number} x the x position of the start screen
     * @property {CanvasRenderingContext2D} ctx the 2D context for the canvas

     */

    img;
    canvas;
    heigth;
    width;
    y;
    x;
    ctx;

    /**
     * @constructor creates a new start screen object and loads the start screen image
     * @param {HTMLCanvasElement} canvas
     * @type {function} loadStartScreen function to load the start screen image @returns img
     * @type {number} width the width of the start screen
     * @type {number} height the height of the start screen
     * @type {number} x the x position of the start screen
     * @type {number} y the y position of the start screen
     * @type {function} drawStartScreen function to draw the start screen on the canvas @returns void
     */

    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.loadStartScreen('img/9_intro_outro_screens/start/startscreen_1.png')
        this.width = 720;
        this.height = 480;
        this.y = 0;
        this.x = 0;
        this.drawStartScreen()
    }

    /**here we clear the start screen to start the game
     * @returns void
     */
    hideStartScreen(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    /**here we load the start screen image 
     * @param {string} path the path to the start screen image
     * @returns img the image for the start screen
     * @type {HTMLImageElement} img the image for the start screen
     */
    loadStartScreen(path) {
        this.img = new Image();
        this.img.src = path;

    }

    /**here we draw the start screen 
     * @returns void
    */
    drawStartScreen() {
        // this.ctx.clearRect(0, 0, this.width, this.height);
        this.addStartScreenToMap(this.img)
        let self = this;
        requestAnimationFrame(function () {
            self.drawStartScreen()
        })
    }
    
    /**here we add the start screen to the map
     * @param {HTMLImageElement} img the image for the start screen
     * @returns void
     * @type {function} drawStartScreenToMap function to draw the start screen on the canvas @returns void
     */
    addStartScreenToMap() {
        this.drawStartScreenToMap(this.ctx, this.img)
    }
    
    /**here we draw the start screen to the map
     * @param {CanvasRenderingContext2D} ctx the 2D context for the canvas
     * @param {HTMLImageElement} img the image for the start screen
     * @returns void
     */
    drawStartScreenToMap(ctx, img) {
        try {
            ctx.beginPath()
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
        catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }

    }
}
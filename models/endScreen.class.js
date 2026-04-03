/**
 * @classdesc this class is responsible for the end screen of the game, it shows the win or lose screen depending on the state of the game
 * it also has a function to load the end screen image and draw it on the canvas
 */

class endScreen {

    /** @property {HTMLImageElement} img the image for the end screen
     * @property {HTMLImageElement} img2 the image for the win or lose screen
     * @property {number} x the x position of the end screen
     * @property {number} y the y position of the end screen
     * @property {number} width the width of the end screen
     * @property {number} height the height of the end screen
     * @property {CanvasRenderingContext2D} ctx the 2D context for the canvas
     * @property {string} winLoose the state of the game, win or lose
     */
    img;
    img2;
    x;
    y;
    width;
    height;
    ctx;
    winLoose;


    /**
     * 
     * @constructor creates a new end screen object and loads the end screen image depending on the state of the game
     * @param {string} state
     * @param {HTMLCanvasElement} canvas
     * @type {number} x the x position of the end screen
     * @type {number} y the y position of the end screen
     * @type {number} width the width of the end screen
     * @type {number} height the height of the end screen
     * @type {function} checkWinLoose function to check the state of the game and load the corresponding end screen
     *  image @returns void
     * @type {function} loadScreen function to load the end screen image depending on the state of the game
     *  @returns img
     * @type {function} loadScreen2 function to load the win or lose screen image depending
     *  on the state of the game @returns img
     */
    constructor(canvas, state) {
        this.winLoose = state;
        this.ctx = canvas.getContext('2d')
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        this.checkWinLoose()
        this.drawScreen();
        this.drawScreen2();
    }

    /**
     * this function checks the state of the game and loads the corresponding end screen image
     * if the state is win, it loads the win screen image, if the state is lose, it loads the lose screen image
     * @returns void
     */
    checkWinLoose() {
        if (this.winLoose == 'win') {
            this.loadScreen('img/5_background/first_half_background.png')
            this.loadScreen2('img/You_won_you_lost/You_win.png')
        } else {
            this.loadScreen('img/5_background/first_half_background.png')
            this.loadScreen2('img/You_won_you_lost/Game_Over.png')
        }
    }


    /**
     * 
     * @param {HTMLImageElement} path
     * this function loads the end screen image depending on the state of the game
     * @returns img the image for the end screen 
     */
    loadScreen(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {HTMLImageElement} path
     * this function loads the win or lose message  depending on the state of the game
     * @returns img the image for the win or lose screen 
     */
    loadScreen2(path) {
        this.img2 = new Image();
        this.img2.src = path;
    }

    /**
     * this function draws the end screen on the canvas
     * it uses requestAnimationFrame to continuously draw the end screen until the game is restarted
     * @returns void
     */
    drawScreen() {
        this.drawImageToMap(this.ctx, this.img)
        let self = this
        requestAnimationFrame(function () {
            self.drawScreen()
        })
    }

    /**
     * this function draws the win or lose message on the canvas
     * it uses requestAnimationFrame to continuously draw the win or lose message until the game is restarted
     * @returns void
     */
    drawScreen2() {
        this.drawImageToMap2(this.ctx, this.img2)
        let self = this
        requestAnimationFrame(function () {
            self.drawScreen2()
        })
    }

    /**
     * 
     * @param {HTMLCanvasElement} ctx 
     * @param {HTMLImageElement} img
     * this function draws the end screen image on the canvas
     * it clears the canvas before drawing the end screen image to avoid overlapping with the game screen
     * @returns void 
     */
    drawImageToMap(ctx, img) {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.beginPath()
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }

    /**
     * 
     * @param {HTMLCanvasElement} ctx 
     * @param {HTMLImageElement} img2
     * this function draws the win or lose message on the canvas
     * @returns void 
     */
    drawImageToMap2(ctx, img2) {
        ctx.drawImage(img2, this.x +100, this.y +100, this.width -200, this.height -150)
    }
}
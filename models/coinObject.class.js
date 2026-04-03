
/**
 * @class this class is simply for the coins which are collectable for the character with an img, width and height
 */
class Coin extends MovableObject {

    /**
     * @property {number} x this x is the x position of the coin, which is random
     * @property {number} y this y is the y position of any coin which is random too
     * @property {number} width this width represents the width of the coins in the game
     * @property {number} height this height represents the height of every coin in the game
     */
    x;
    y;
    width;
    height;


    /**
     * @constructor this constructor load the img of the coin, sets random x and y values and sets the width, height of the coins
     * @type {function} loadImage here we load the image for the coin in the game
     * @type {number} x this x is the x position of the coin, which is random
     * @type {number} y this y is the y position of any coin which is random too
     * @type {number} width this width represents the width of the coins in the game
     * @type {number} height this height represents the height of every coin in the game
      * @returns void
     */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png')
        this.x = 300 + Math.random() * 3000;
        this.y = 200 + Math.random() * 150;
        this.width = 60;
        this.height = 60;
    }
}
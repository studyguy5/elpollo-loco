
/**
 * @classdesc this class is used to create the status bar for the character and the endboss, it shows the health, the collected bottles and coins and the endboss health when the character reaches the endboss
 * it also has functions to set the images for the status bar depending on the state of the game
 */
class statusBar extends DrawableObjekt {
    /**
     * @property {World} world the world object, which is used to access the character and the endboss
     * @property {number} x the x position of the status bar
     * @property {number} y the y position of the status bar
     * @property {number} width the width of the status bar
     * @property {number} height the height of the status bar
     * @property {string[]} statusBarr the array of image paths for the status bar, which is used to set the images for the health, 
     * bottles, coins and endboss health
     * @property {number} currentStatusImage the index of the current image for the status bar, 
     * which is used to set the image for the health, bottles, coins and endboss health
     * @property {number} camera_x the x position of the camera, which is used to move the status bar with the character
     * @property {number} percentige the percentage for the health and endboss health, 
     * which is used to set the image for the health and endboss health
     */

    world;
    x;
    y;
    width;
    height;
    statusBarr;
    currentStatusImage = 5;
    camera_x = 0;
    percentige = 100;

    /**
     * 
     * @param {World} world the world object, which is used to access the character and the endboss 
     * @param {number} x the x position of the status bar
     * @param {number} y the y position of the status bar
     * @param {number} width the width of the status bar
     * @param {number} height the height of the status bar
     * @param {string[]} statusBarr the array of image paths for the status bar, which is used to set the images for the health, bottles, coins and endboss health
     */

    constructor(world, x, y, width, height, statusBarr) {
        super()
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.statusBarr = statusBarr
        this.loadImages(statusBarr)
        this.setbottleImage(0)
        this.sethealthImage(100)
        this.setCoinImage(0)
        this.checkCharacterReach()
    }

    /**this function checks if the character has reached a certain point in order to 
     * display the endboss health bar when the character reaches the endboss
     * @returns void
     */
    checkCharacterReach() {
        setStoppableInterval(() => {
            if (this.world.Character.x > (719 * 3.5))
                this.setEndbossHealthImage(this.world.level.endboss[0].endbossEnergy)
        }, 1000);
    }

    /**this function sets the image for the bottle status bar
     * @type {HTMLImageElement} img the image for the bottle status bar
     * @returns void
     */
    setbottleImage() {
        if (this.statusBarr[0].includes('bottle', 0)) {
            let path = this.statusBarr[this.world.reportBottleLenght()];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the health status bar
     * @type {HTMLImageElement} img the image for the health status bar
     * @param {number} energy the energy of the character, which is used to set the image for the health status bar
     * @returns void
     */
    sethealthImage(energy) {
        if (this.statusBarr[0].includes('health', 0)) {
            this.percentige = this.energy;
            let path = this.statusBarr[this.setPercentige(energy)];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the coin status bar
     * @type {HTMLImageElement} img the image for the coin status bar
     * @param {number} coinAmount the amount of coins the character has, which is used to set the image for the coin status bar
     * @returns void
     */
    setCoinImage(coinAmount) {
        if (this.statusBarr[0].includes('coin', 0)) {
            let path = this.statusBarr[this.checkCoinAmount(coinAmount)];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the endboss health bar
     * @type {HTMLImageElement} img the image for the endboss health bar
     * @param {number} endbossEnergy the energy of the endboss, which is used to set the image for the endboss health bar
     * @returns void
     */
    setEndbossHealthImage(endbossEnergy) {
        if (this.statusBarr[0].includes('endboss', 0)) {
            let path = this.statusBarr[this.setEndbossPercentige(endbossEnergy)]
            this.img = this.imageChache[path];
        }
    }

    /**this function checks the coin amount and returns the corresponding image index
     * @param {number} coinAmount the amount of coins the character has, which is used to set the image for the coin status bar
     * @returns number the index of the image for the coin status bar, which is used to set the image for the coin status bar
     */
    checkCoinAmount(coinAmount) {
        if (coinAmount == 0) {
            return 0;
        } else if (coinAmount == 1) {
            return 1;
        } else if (coinAmount == 2) {
            return 2;
        } else if (coinAmount == 3) {
            return 3;
        } else if (coinAmount == 4) {
            return 4;
        } else { return 5 }
    }

    /**this function sets the percentage for the endboss health bar
     * @param {number} endbossEnergy the energy of the endboss, which is used to set the image for the endboss health bar
     * @returns number the index of the image for the endboss health bar, which is used to set the image for the endboss health bar
     */
    setEndbossPercentige(endbossEnergy) {
        // let endbossEnergy = this.world.level.endboss.endbossEnergy
        if (endbossEnergy == 100) {
            return 5;
        } else if (endbossEnergy > 80 && endbossEnergy < 100) {
            return 4;
        } else if (endbossEnergy > 60 && endbossEnergy < 80) {
            return 3;
        } else if (endbossEnergy > 40 && endbossEnergy < 60) {
            return 2;
        } else if (endbossEnergy > 20 && endbossEnergy < 40) {
            return 1;
        } else { return 0; }
    }


    /**this function sets the percentage for the Character health status bar
     * @param {number} energy the energy of the character, which is used to set the image for the health status bar
     * @returns number the index of the image for the health status bar, which is used to set the image for the health status bar
     */
    setPercentige(energy) {
        this.percentige = energy;
        if (this.percentige == 100) {
            return 5;
        } else if (this.percentige > 80 && this.percentige < 100) {
            return 4;
        } else if (this.percentige > 60 && this.percentige < 80) {
            return 3;
        } else if (this.percentige > 40 && this.percentige < 60) {
            return 2;
        } else if (this.percentige > 20 && this.percentige < 40) {
            return 1;
        } else {
            return 0;
        }

    }
}
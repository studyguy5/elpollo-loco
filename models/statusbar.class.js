class statusBar extends DrawableObjekt {
    world;
    x;
    y;
    width;
    height;
    statusBarr;
    currentStatusImage = 5;
    camera_x = 0;
    percentige = 100;


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
     */
    checkCharacterReach() {
        setStoppableInterval(() => {
            if (this.world.Character.x > (719 * 3.5))
                this.setEndbossHealthImage(this.world.level.endboss[0].endbossEnergy)
        }, 1000);
    }

    /**this function sets the image for the bottle status bar */
    setbottleImage() {
        if (this.statusBarr[0].includes('bottle', 0)) {
            let path = this.statusBarr[this.world.reportBottleLenght()];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the health status bar */
    sethealthImage(energy) {
        if (this.statusBarr[0].includes('health', 0)) {
            this.percentige = this.energy;
            let path = this.statusBarr[this.setPercentige(energy)];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the coin status bar */
    setCoinImage(coinAmount) {
        if (this.statusBarr[0].includes('coin', 0)) {
            let path = this.statusBarr[this.checkCoinAmount(coinAmount)];
            this.img = this.imageChache[path];
        }
    }

    /**this function sets the image for the endboss health bar */
    setEndbossHealthImage(endbossEnergy) {
        if (this.statusBarr[0].includes('endboss', 0)) {
            let path = this.statusBarr[this.setEndbossPercentige(endbossEnergy)]
            this.img = this.imageChache[path];
        }
    }

    /**this function checks the coin amount and returns the corresponding image index */
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

    /**this function sets the percentage for the endboss health bar */
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


    /**this function sets the percentage for the Character health status bar */
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
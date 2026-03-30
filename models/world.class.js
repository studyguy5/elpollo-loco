class World {

    bottleBar = new statusBar(this, 20, 10, 185, 50,
        [
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ]
    ) //hier als Parameter die Koordinaten angeben
    healthBar = new statusBar(this, 20, 50, 185, 50,
        [
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'

        ]
    ) //hier als Parameter die Koordinaten angeben

    coinBar = new statusBar(this, 20, 90, 185, 50,
        [
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'

        ]
    ) //hier als Parameter die Koordinaten angeben


    endbossHealthBar = new statusBar(this, 505, 50, 185, 50,
        [
            'img/7_statusbars/2_statusbar_endboss/green/green0.png',
            'img/7_statusbars/2_statusbar_endboss/green/green20.png',
            'img/7_statusbars/2_statusbar_endboss/green/green40.png',
            'img/7_statusbars/2_statusbar_endboss/green/green60.png',
            'img/7_statusbars/2_statusbar_endboss/green/green80.png',
            'img/7_statusbars/2_statusbar_endboss/green/green100.png',
        ]
    )


    Character = new character()

    throwableObjects = []

    level = level1;

    ar = 0;
    canvas;
    ctx;
    Keyboard;
    camera_x = 0;

    constructor(canvas, Keyboard) {
        this.ctx = canvas.getContext('2d')
        this.setWorld();
        this.canvas = canvas;
        this.Keyboard = Keyboard;
        this.drawBackgroundLayers();
        this.drawObjects();
        this.drawCharacter();
        this.checkCharacter_State();
        this.reportBottleLenght();
    }

    img;

    lastHit = 0;
    timePassed = 0;
    hitSound = new Audio('./audio/hit_sound.wav')

    
    /**this function is called when the character is hit */
    hit() {
        this.Character.energy -= 0.3;
        this.healthBar.sethealthImage(this.Character.energy)
        if (this.Character.energy < 0) {
            this.Character.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
        }
    }
    /**here we updated the endboss health */
    hitEndboss() {
        this.level.endboss.endbossEnergy;
        this.endbossHealthBar.setEndbossHealthImage(this.level.endboss.endbossEnergy)
    }

    /**here we make the hurt animation go on for further 1.5 seconds */
    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return  this.timePassed < 1.5; //fragt ab wie lange es schon dauert
    }

    /**here we check the character's state, if he is colliding or hurt with/by enemies, mini Enemies and update statusbars */
    checkCharacter_State() {
        setStoppableInterval(() => {
            this.checkColliding_PlayHurt_andDeleyChicken()
            this.checkColliding_PlayHurt_andDeleyMiniChicken()
            this.checkThrowObjects() //responsible for bottle bar lenght
            this.checkCollision_PlayHurt_andDeleyEndboss()
        }, 1000 / 60)
        //==============================================
        setStoppableInterval(() => {
            this.checkIfDeath(this.Character)
            this.checkIfDeath(this.Character)
        }, 1000 / 10);

        setStoppableInterval(() => {
            this.checkCollisionWithCoins()
            this.checkCollisionWidth_Bottles();
            this.cutBottleFrom_Array();
        }, 1000 / 60);
    }

    collected = 0;
    d_wasPressed = false;
    drawOtherDirection = false;
    coinAmount = 0;

    /**here we check for collisions with coins */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coins) => {
            if (this.isCollidingWidth_Coin(coins)) {
                coins.y = 500;
                this.coinAmount++;
                this.coinBar.setCoinImage(this.coinAmount)
            }
        })
    }

    /**here we check for collisions with regular chickens */
    isCollidingWithChicken(enemies) {
        return (
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) + this.throwableObjects[0]?.width > enemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < enemies.x + enemies.width &&
            this.throwableObjects[0]?.y < enemies.y + enemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > enemies.y
        );
    }

    /**here we check for collisions with mini chickens */
    isCollidingWithMiniChicken(miniEnemies) {
        return (
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) + this.throwableObjects[0]?.width > miniEnemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < miniEnemies.x + miniEnemies.width &&
            this.throwableObjects[0]?.y < miniEnemies.y + miniEnemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > miniEnemies.y
        );
    }

    /**here we report the bottle length for the status bar */
    reportBottleLenght() {
        if (this.collected < 6) {
            return this.collected;
        } else if (this.collected >= 6) {
            return 5;
        } else {
            return 0;
        }
    }

    /**here we cut a bottle from the array and update the statusbar */
    cutBottleFrom_Array() {
        if (this.Keyboard.d) {
            setTimeout(() => {
                this.throwableObjects.pop()
            }, 1000);
        }
    }

    /**here we check the throw objects and update the status bar */
    checkThrowObjects() {
        this.bottleBar.setbottleImage()
    }

    /**here we check if the character is dead */
    checkIfDeath() {
        if (this.Character.isDeath()) {
            this.Character.energy = 0;
            this.Character.playDeathAnimation();
        }
    }

    /**here we check for collisions with bottles on the ground */
    isCollidingWidth_Bottle(bottles) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > bottles.x &&
            this.Character.x + this.Character.offsetCharacter.left < bottles.x + bottles.width &&
            this.Character.y < bottles.y + bottles.height &&
            this.Character.y + this.Character.height + this.Character.offsetCharacter.bottom > bottles.y
        );
    }

    /**here we check for collisions with coins */
    isCollidingWidth_Coin(coins) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > coins.x &&
            this.Character.x + this.Character.offsetCharacter.left < coins.x + coins.width &&
            this.Character.y < coins.y + coins.height &&
            this.Character.y + this.Character.height + this.Character.offsetCharacter.bottom > coins.y
        );
    }


    // /**here we check for collisions with the end boss */
    // isCollidingWithEndboss(endboss) {console.log('checking collision in World');
    //     return (this.Character.x + this.Character.width > endboss.x &&
    //         this.Character.x < endboss.x + endboss.width &&
    //         this.Character.y < endboss.y + endboss.height &&
    //         this.Character.y + this.Character.height > endboss.y);
    // }

    /**here we link the world to the character, bottlebar and endboss objects */
    setWorld() {
        this.Character.world = this;
        this.bottleBar.worldStatus = this;
        this.level.endboss[0].camera = this;
    }

    /**here we draw all objects on the canvas */
    drawObjects() {
        this.addObjektsToMap(this.level.enemies);
        this.addObjektsToMap(this.level.miniEnemies);
        this.addObjektsToMap(this.level.endboss);
        this.addObjektsToMap(this.level.clouds);
        this.addBarToMap(this.endbossHealthBar);//spezial
        this.addBarToMap(this.bottleBar);//spezial
        this.addObjektsToMap(this.level.bottles);
        this.addBarToMap(this.healthBar);//spezial
        this.addStatusToMap(this.coinBar);//spezial
        this.addObjektsToMap(this.level.coins)
        this.addObjektsToMapThrow(this.throwableObjects); //spezial
        let self = this;
        requestAnimationFrame(function () {
            self.drawObjects()
        })
    }

    /**here we iterate through objects and add them to the map */
    addObjektsToMap(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMap(o)
        })
    }


    /**this function executes the drawing of an object on the map with the native drawImage function */
    drawToMap(o) {
        try {
            this.ctx.translate(this.camera_x, 0)
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            this.ctx.translate(-this.camera_x, 0)
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    /**here we iterate through throw objects and add them to the map seperately */
    addObjektsToMapThrow(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMapThrow(o)
        })
    }

    /**here we draw throw objects on the map */
    drawToMapThrow(o) {
        try {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }
    
    /**this function draws the character on the map */
    drawCharacter() {
        this.addTomap(this.Character)
        let self = this;
        requestAnimationFrame(function () {
            self.drawCharacter()
        })
    }
    
    /**here we draw the background layers on the map */
    drawBackgroundLayers() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundToMap(this.level.bg);
        let self = this;
        requestAnimationFrame(function () {
            self.drawBackgroundLayers()
        })
    }
    
    
    /**here we iterate through background objects and add them to the map */
    addBackgroundToMap(objects) {
        objects.forEach((o) => {
            this.drawBackgroundToMap(o)
        })
    }


    /**this function draws a background object on the map */
    drawBackgroundToMap(mo) {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)
        mo.draw(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.restore();
        // mo.drawRectangleForBackground(this.ctx, this.camera_x)
    }
    previousX;

    /**this function adds a bar to the map */
    addBarToMap(o) {
        this.drawBarToMap(this.ctx, o)
    }

    /**this draws a bar on the map with the native drawImage function */
    drawBarToMap(ctx, o) {
        if (o.img) {
            try {
                ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            } catch (error) {
                console.warn('Konnte nicht geladen werden', error)
            }
        }
    }

    /**here we add a status bar to the map */
    addStatusToMap(o) {
        this.drawToMapBar(this.ctx, o)
    }

    /**here we draw a status bar on the map */
    drawToMapBar(ctx, o) {
        try {
            ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    /**this draws the character on the map normally and reversed */
    addTomap(mo) {
        if (!mo.otherDirection) {
            this.ctx.restore();
            this.ctx.translate(this.camera_x, 0)
            mo.draw(this.ctx)
            this.ctx.translate(-this.camera_x, 0)
        }

        // Blue rectangle
        // mo.drawRectangle(this.ctx, this.camera_x)
        // this.ctx.beginPath();
        // this.ctx.lineWidth = '3';
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        // this.ctx.translate(-this.camera_x, 0)
        // this.ctx.stroke();

        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(this.camera_x, 0)
            this.ctx.translate(mo.width, 0);
            this.drawOtherDirection = true;
            this.ctx.scale(-1, 1);
            mo.drawBackward(this.ctx)
            this.ctx.translate(-this.camera_x, 0)
            this.ctx.restore();
        }
    }

}
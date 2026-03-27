class World {

    bottleBar = new statusBar(this, 20, 10, 210, 40,
        [
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ]
    ) //hier als Parameter die Koordinaten angeben
    healthBar = new statusBar(this, 20, 50, 210, 40,
        [
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'

        ]
    ) //hier als Parameter die Koordinaten angeben

    coinBar = new statusBar(this, 20, 90, 210, 40,
        [
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'

        ]
    ) //hier als Parameter die Koordinaten angeben


    endbossHealthBar = new statusBar(this, 505, 50, 210, 40,
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
        this.drawCharacter();
        this.drawObjects();
        this.checkCharacter_State();
        this.reportBottleLenght();
    }

    img;

    lastHit = 0;
    timePassed = 0;
    hitSound = new Audio('./audio/hit_sound.wav')

    //=============================================

    hit() {
        this.Character.energy -= 2;
        this.healthBar.sethealthImage(this.Character.energy)
        if (this.Character.energy < 0) {
            this.Character.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
        }
    }

    hitEndboss() {
        this.level.endboss.endbossEnergy;
        this.endbossHealthBar.setEndbossHealthImage(this.level.endboss.endbossEnergy)
    }

    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed == 10 ? this.timePassed = 0 : "", this.timePassed < 2; //fragt ab wie lange es schon dauert
    }


    checkCharacter_State() {
        setStoppableInterval(() => {
            this.checkColliding_PlayHurt_andDeleyChicken()
            this.checkColliding_PlayHurt_andDeleyMiniChicken()
            this.checkIfDeath(this.Character)
            this.checkThrowObjects() //responsible for bottle bar lenght
        }, 1000 / 10)
        //==============================================
        setStoppableInterval(() => {
            this.checkCollision_PlayHurt_andDeleyEndboss()
            this.checkIfDeath(this.Character)
        }, 1000 / 10);

        setStoppableInterval(() => {
            this.checkCollisionWithCoins()
            this.checkCollisionWidth_Bottles();
            this.cutBottleFrom_Array();
        }, 1000 / 10);
    }

    collected = 0;
    d_wasPressed = false;
    drawOtherDirection = false;
    coinAmount = 0;
    checkCollisionWithCoins() {
        this.level.coins.forEach((coins) => {
            if (this.isCollidingWidth_Coin(coins)) {
                coins.y = 500;
                this.coinAmount++;
                this.coinBar.setCoinImage(this.coinAmount)
            }
        })
    }


    isCollidingWithChicken(enemies) {
        return (
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) + this.throwableObjects[0]?.width > enemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < enemies.x + enemies.width &&
            this.throwableObjects[0]?.y < enemies.y + enemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > enemies.y
        );
    }

    isCollidingWithMiniChicken(miniEnemies) {
        return (
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) + this.throwableObjects[0]?.width > miniEnemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < miniEnemies.x + miniEnemies.width &&
            this.throwableObjects[0]?.y < miniEnemies.y + miniEnemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > miniEnemies.y
        );
    }

    reportBottleLenght() {
        if (this.collected < 6) {
            return this.collected;
        } else if (this.collected >= 6) {
            return 5;
        } else {
            return 0;
        }
    }

    cutBottleFrom_Array() {
        if (this.Keyboard.d) {
            setTimeout(() => {
                this.throwableObjects.pop()
            }, 1000);
        }
    }

    checkThrowObjects() {
        this.bottleBar.setbottleImage()
        console.log(this.throwableObjects.length)
    }


    checkIfDeath() {
        if (this.Character.isDeath()) {
            this.Character.energy = 0;
            this.Character.playDeathAnimation();
            console.log('Game Over');
        }
    }

    isCollidingWidth_Bottle(bottles) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > bottles.x &&
            this.Character.x + this.Character.offsetCharacter.left < bottles.x + bottles.width &&
            this.Character.y < bottles.y + bottles.height &&
            this.Character.y + this.Character.height + this.Character.offsetCharacter.bottom > bottles.y
        );
    }

    isCollidingWidth_Coin(coins) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > coins.x &&
            this.Character.x + this.Character.offsetCharacter.left < coins.x + coins.width &&
            this.Character.y < coins.y + coins.height &&
            this.Character.y + this.Character.height + this.Character.offsetCharacter.bottom > coins.y
        );
    }


    checkCollision_PlayHurt_andDeleyEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.Character.isCollidingWithEndboss(endboss)) {
                this.hitEndboss()
                this.Character.playHurtAnimation(this.isHurt);
            }

            if (!this.Character.isColliding(endboss) && this.lastHit > 0 && this.isHurt()) {
                this.Character.playHurtAnimation(this.isHurt);
            }

            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
            }
        })
    }

    isCollidingWithEndboss(endboss) {
        return (this.Character.x + this.Character.width > endboss.x &&
            this.Character.x < endboss.x + endboss.width &&
            this.Character.y < endboss.y + endboss.height &&
            this.Character.y + this.Character.height > endboss.y);
    }

    setWorld() {
        this.Character.world = this;
        this.bottleBar.worldStatus = this;
        this.level.endboss[0].camera = this;
    }


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

    addObjektsToMap(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMap(o)
        })
    }


    drawToMap(o) {
        try {
            this.ctx.translate(this.camera_x, 0)
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            this.ctx.translate(-this.camera_x, 0)
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    addObjektsToMapThrow(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMapThrow(o)
        })
    }

    drawToMapThrow(o) {
        try {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }


    drawCharacter() {
        this.addTomap(this.Character)
        let self = this;
        requestAnimationFrame(function () {
            self.drawCharacter()
        })
    }

    drawBackgroundLayers() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundToMap(this.level.bg);
        let self = this;
        requestAnimationFrame(function () {
            self.drawBackgroundLayers()
        })
    }


    //=============EndbossAngry====================================
    addBackgroundToMap(objects) {
        objects.forEach((o) => {
            this.drawBackgroundToMap(o)
        })
    }
    previousX;

    addBarToMap(o) {
        this.drawBarToMap(this.ctx, o)
    }

    drawBarToMap(ctx, o) {
        if (o.img) {
            try {
                ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            } catch (error) {
                console.warn('Konnte nicht geladen werden', error)
            }
        }
    }

    //=======================health Bar====================================================================
    addStatusToMap(o) {
        this.drawToMapBar(this.ctx, o)
    }

    drawToMapBar(ctx, o) {
        try {
            ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

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

    drawBackgroundToMap(mo) {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)
        mo.draw(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.restore();
        mo.drawRectangleForBackground(this.ctx, this.camera_x)
    }
}
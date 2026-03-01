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
        this.drawClouds();
        this.drawBottleBar()
        this.drawHealthBar()
        this.drawCoinBar()
        this.showBottleImage()
        this.showBottleToShoot()
        this.drawEndboss();
        this.drawCharacter();
        this.drawChickens();
        this.checkCharacter_State();
        this.reportBottleLenght();
    }
    
    img;
    img;
    
    lastHit = 0;
    timePassed = 0;
    
    
    //=============================================
    
    hit() {
        this.Character.energy -= 2;
        console.log('Energy of Character ', this.Character.energy);
        this.healthBar.sethealthImage(this.Character.energy)
        if (this.Character.energy < 0) {
            this.Character.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
            // console.log('Collision detected with ========================', this.timePassed);
        }
    }
    
    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed == 10 ? this.timePassed = 0 : "", this.timePassed < 2; //fragt ab wie lange es schon dauert
    }
    
    
    checkCharacter_State() {
        setInterval(() => {
            this.checkColliding_PlayHurt_andDeleyChicken()
            this.checkIfDeath(this.Character)
            this.checkThrowObjects()
        }, 1000 / 10)
        //==============================================
        setInterval(() => {
            this.checkCollision_PlayHurt_andDeleyEndboss()
            this.checkIfDeath(this.Character)
        }, 1000 / 10);
        
        setInterval(() => {
            this.checkCollisionWidth_Bottles();
            
        }, 1000 / 10);
    }
    
    checkCollisionWidth_Bottles(){
        this.level.bottles.forEach((bottles) => {
            if(this.isCollidingWidth_Bottle(bottles)){
                // let rightBottle = bottles.indexOf(this.isCollidingWidth_Bottle())
                bottles.y = 1000;
                let bottle = new ThrowableObject(this.Character.x, this.Character.y, this);
                this.throwableObjects.push(bottle);
                console.log('collinding with bottle')
                // this.level.bottles.splice(rightBottle, 1)
            }
        })
    }
    
    
    checkColliding_PlayHurt_andDeleyChicken() {
        this.level.enemies.forEach((enemies) => {
            if (this.Character.isColliding(enemies)) {
                // console.log('is colliding', this.Character.isColliding(enemies))
                this.hit()
                this.Character.playHurtAnimation(this.isHurt);
            }
            
            if (!this.Character.isColliding(enemies) && this.lastHit > 0 && this.isHurt()) {
                this.Character.playHurtAnimation(this.isHurt);
                // this.clearIntervall(this.Character.hurtInterval)
            }
            
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
                // console.log('hat versucht zu stoppen&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', this.timePassed)
            }
        });
    }
    
    reportBottleLenght(){
        let amount = this.throwableObjects?.length;
        if(amount){
            return amount;
        }else if(amount > 6){
            
        }else{
            return 0;}
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
            this.Character.x + this.Character.width > bottles.x &&
            this.Character.x < bottles.x + bottles.width &&
            this.Character.y < bottles.y + bottles.height &&
            this.Character.y + this.Character.height > bottles.y
        );
    }



    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y
        );
    }


    checkCollision_PlayHurt_andDeleyEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.Character.isCollidingWithEndboss(endboss)) {
                console.log('Collision detected with endboss', endboss);
                this.hit()
                this.Character.playHurtAnimation(this.isHurt);
            }

            if (!this.Character.isColliding(endboss) && this.lastHit > 0 && this.isHurt()) {
                this.Character.playHurtAnimation(this.isHurt);
                // this.clearIntervall(this.Character.hurtInterval)
            }

            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
                // console.log('hat versucht zu stoppen&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', this.timePassed)
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
        // this.level.bottles = this;
        //ich lege in der class Character eine Variable namens world an und sage, sie soll genau diese Instanz hier, also auf alles hier zugreifen können
        //damit verbinde ich die Klassen world und character miteinander
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
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.translate(-this.camera_x, 0)
        let self = this;
        requestAnimationFrame(function () {
            self.drawBackgroundLayers()
        })
    }


    drawChickens() {
        this.addObjektsToMap(this.level.enemies);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawChickens()
        })
    }

    drawEndboss() {
        this.addEndbossToMap(this.level.endboss);
        let self = this;
        requestAnimationFrame(function () {
            self.drawEndboss()
        })
    }

    addEndbossToMap(objects) {
        objects.forEach((o) => {
            this.addENDBOOSTomap(o)
        })
    }

    addENDBOOSTomap(mo) {
        // this.ctx.save();

        this.ctx.translate(this.camera_x, 0)
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        this.ctx.translate(-this.camera_x, 0)
    }

    drawClouds() {
        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(-this.camera_x, 0)
        this.addObjektsToMap(this.level.clouds);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawClouds()
        })
    }


    addObjektsToMap(objects) {
        objects.forEach((o) => {
            this.addTomap(o)
        })
    }




    addBackgroundToMap(objects) {
        objects.forEach((o) => {
            this.drawBackgroundToMap(o)
        })
    }
    previousX;


    //status Bar =================================
    drawBottleBar() {
        this.addStatusToMapbottle(this.bottleBar)
        let self = this;
        requestAnimationFrame(function () {
            self.drawBottleBar()
        })
    }

    addStatusToMapbottle(bottleBar) {
        this.drawToMapbottle(this.ctx, bottleBar)
    }


    drawToMapbottle(ctx, bottleBar) {
        try {
            ctx.drawImage(this.bottleBar.img, bottleBar.x, bottleBar.y, bottleBar.width, bottleBar.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }


    //======================================================================

    //================bottles=====================================================

    showBottleImage() {
        this.addToMapbottle(this.level.bottles)
        let self = this;
        requestAnimationFrame(function () {
            self.showBottleImage()
        })
    }

    addToMapbottle(bottles) {
        this.addObjektsToMap(bottles)
    }


    //================================Bottle to shoot==============================

    showBottleToShoot() {
        
        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMapbottleToShoot(this.throwableObjects)
        let self = this;
        requestAnimationFrame(function () {
            self.showBottleToShoot()
        })}
    

    addToMapbottleToShoot(to) {
        this.addObjektsToMapShoot(to)
    }


    addObjektsToMapShoot(objects) {
        objects.forEach((o) => {
            // ctx.drawImage(to.img, to.x, to.y, to.width, to.height);
            // this.addObjektsToMapShoot(to)
            this.drawToMapbottleImage(this.ctx, o)
        })
    }


    drawToMapbottleImage(ctx, to) {
        try {
            ctx.drawImage(to.img, to.x, to.y, to.width, to.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }



    //=======================health Bar====================================================================

    drawHealthBar() {
        this.addStatusToMap(this.healthBar)
        let self = this;
        requestAnimationFrame(function () {
            self.drawHealthBar()
        })
    }


    addStatusToMap(healthBar) {
        this.drawToMaphealth(this.ctx, healthBar)
    }

    drawToMaphealth(ctx, healthBar) {
        try {
            ctx.drawImage(this.healthBar.img, healthBar.x, healthBar.y, healthBar.width, healthBar.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }


    //===============================================================================================

    //===========================Coin Status Bar===============================================

    drawCoinBar() {
        this.addStatusToMap(this.coinBar)
        let self = this;
        requestAnimationFrame(function () {
            self.drawCoinBar()
        })
    }

    addStatusToMap(coinBar) {
        this.drawToMapCoinBar(this.ctx, coinBar)
    }

    drawToMapCoinBar(ctx, coinBar) {
        try {
            ctx.drawImage(coinBar.img, coinBar.x, coinBar.y, coinBar.width, coinBar.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }


    //=======================================================================================
    addTomap(mo) {
        if (!mo.otherDirection) {
            this.ctx.restore();
            this.ctx.translate(this.camera_x, 0)
            mo.draw(this.ctx)
            this.ctx.translate(-this.camera_x, 0)
        }

        // Blue rectangle
        mo.drawRectangle(this.ctx, this.camera_x)

        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'blue';
        this.ctx.translate(this.camera_x, 0)
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.stroke();



        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(this.camera_x, 0)
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.drawBackward(this.ctx)
        }
    }

    drawBackgroundToMap(mo) {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)

        mo.draw(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.restore();

        mo.drawRectangleForBackground(this.ctx, this.camera_x)
        // this.ctx.beginPath();
        // this.ctx.lineWidth = '3';
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        // this.ctx.translate(-this.camera_x, 0)
        // this.ctx.stroke();
    }
}
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
        this.drawClouds();
        this.drawBottleBar()
        this.drawHealthBar()
        this.drawCoinBar()
        this.drawEndbossHealthbar()
        this.showBottleImage()
        this.showBottleToShoot()
        this.drawEndboss();
        this.drawCharacter();
        this.drawChickens();
        this.checkCharacter_State();
        this.reportBottleLenght();
        this.drawDeathChicken();
        this.drawMiniChickenWaling();
        this.drawCoins()
    }

    img;
    // img;

    lastHit = 0;
    timePassed = 0;


    //=============================================

    hit() {
        this.Character.energy -= 2;
        // console.log('Energy of Character ', this.Character.energy);
        this.healthBar.sethealthImage(this.Character.energy)
        if (this.Character.energy < 0) {
            this.Character.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
            // console.log('Collision detected with ========================', this.timePassed);
        }
    }

    hitEndboss() {
        this.level.endboss.endbossEnergy;
        // console.log('Energy of Character ', this.Character.energy);
        this.endbossHealthBar.setEndbossHealthImage(this.level.endboss.endbossEnergy)
        
    }

    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed == 10 ? this.timePassed = 0 : "", this.timePassed < 2; //fragt ab wie lange es schon dauert
    }


    checkCharacter_State() {
        setInterval(() => {
            this.checkColliding_PlayHurt_andDeleyChicken()
            this.checkColliding_PlayHurt_andDeleyMiniChicken()
            this.checkIfDeath(this.Character)
            this.checkThrowObjects() //responsible for bottle bar lenght
        }, 1000 / 10)
        //==============================================
        setInterval(() => {
            this.checkCollision_PlayHurt_andDeleyEndboss()
            this.checkIfDeath(this.Character)
        }, 1000 / 10);

        setInterval(() => {
            this.checkCollisionWithCoins()
            this.checkCollisionWidth_Bottles();
            this.cutBottleFrom_Array();
        }, 1000 / 10);
    }

    collected = 0;
    d_wasPressed = false;
    drawOtherDirection = false;

    checkCollisionWithCoins(){
        this.level.coins.forEach((coins) => {
            if(this.isCollidingWidth_Coin(coins)){
                coins.y = 500;
                // hier noch die StatusBar der Coins verändern
            }
        })}

    checkCollisionWidth_Bottles() {

        this.level.bottles.forEach((bottles) => {
            if (this.isCollidingWidth_Bottle(bottles)) {
                bottles.y = 1000;
                this.collected++
                console.log(this.collected)
                // this.level.bottles.splice(rightBottle, 1)
            }

            if (this.Keyboard.d == true && !this.d_wasPressed && this.collected > 0) {
                let bottle = new ThrowableObject(this.Character.x, this.Character.y);
                this.throwableObjects.push(bottle);
                let index = (this.throwableObjects?.length - 1)
                console.log(this.throwableObjects.length);
                if(this.Character.otherDirection){
                    console.log(this.Character.otherDirection);
                this.throwableObjects[index]?.throw(-35)
            }else{this.throwableObjects[index]?.throw(35)}
                this.collected--
                this.d_wasPressed = true;
            }

            if(this.d_wasPressed && this.Keyboard.d == false){
                this.d_wasPressed = false
            }

        }
        )
    }


    checkColliding_PlayHurt_andDeleyChicken() {
        this.level.enemies.forEach((enemies) => {            
            if (this.Character.isChrushingChicken(enemies)) {
                console.log('chicken gechrushed')
                this.Character.makeInvincible(3)
                enemies.chrushChicken()
            }
            
            if(this.isCollidingWithChicken(enemies)){ //check if throwable Bottle is colliding with enemie
                console.log('chicken getroffen')
                enemies.chrushChicken(enemies);
            }
            
            if (this.Character.isColliding(enemies)) {
                if(!this.Character.isInvincible()){
                    this.hit()
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            
            if (!this.Character.isColliding(enemies) && this.lastHit > 0 && this.isHurt()) {
                if(!this.Character.isInvincible()){
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
                
            }
        });
    }

    checkColliding_PlayHurt_andDeleyMiniChicken() {
        this.level.miniEnemies.forEach((miniEnemies) => {            
            if (this.Character.isChrushingChicken(miniEnemies)) {
                console.log('MiniChicken gechrushed')
                this.Character.makeInvincible(3)
                miniEnemies.chrushMiniChicken(miniEnemies)
            }
            
            if(this.isCollidingWithMiniChicken(miniEnemies)){ //checks if a throwable bottle is colliding with a miniEnemie
                console.log('chicken getroffen')
                miniEnemies.chrushMiniChicken(miniEnemies);
            }
            
            if (this.Character.isColliding(miniEnemies)) {
                if(!this.Character.isInvincible()){
                    this.hit()
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            
            if (!this.Character.isColliding(miniEnemies) && this.lastHit > 0 && this.isHurt()) {
                if(!this.Character.isInvincible()){
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
                
            }
        });
    }

    isCollidingWithChicken(enemies){
        return (
            (this.Character.x + (this.throwableObjects[0]?.x -120)) + this.throwableObjects[0]?.width > enemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < enemies.x + enemies.width &&
            this.throwableObjects[0]?.y < enemies.y + enemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > enemies.y
        );
    }

    isCollidingWithMiniChicken(miniEnemies){
        return (
            (this.Character.x + (this.throwableObjects[0]?.x -120)) + this.throwableObjects[0]?.width > miniEnemies.x &&
            (this.Character.x + (this.throwableObjects[0]?.x - 120)) < miniEnemies.x + miniEnemies.width &&
            this.throwableObjects[0]?.y < miniEnemies.y + miniEnemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > miniEnemies.y
        );
    }

    reportBottleLenght() {
        // let amount = this.throwableObjects?.length;

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
            }, 1500);
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
            this.Character.x + this.Character.width > bottles.x &&
            this.Character.x < bottles.x + bottles.width &&
            this.Character.y < bottles.y + bottles.height &&
            this.Character.y + this.Character.height > bottles.y
        );
    }

    isCollidingWidth_Coin(coins) {
        return (
            this.Character.x + this.Character.width > coins.x &&
            this.Character.x < coins.x + coins.width &&
            this.Character.y < coins.y + coins.height &&
            this.Character.y + this.Character.height > coins.y
        );
    }



    isColliding(mo) { //  eventuell Doppelt - auch in character
        return (
            this.x + this.width + this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
        );
    }

    

    checkCollision_PlayHurt_andDeleyEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.Character.isCollidingWithEndboss(endboss)) {
                console.log('Collision detected with endboss', endboss);
                this.hitEndboss()
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
        this.level.endboss[0].camera = this;
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

    drawDeathChicken() {
        this.addObjektsToMap(this.level.enemies);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawChickens()
        })
    }



//=============miniChicken ===============================
drawMiniChickenWaling(){
    this.addMiniChickenWalkingToMap(this.level.miniEnemies);
        let self = this;
        requestAnimationFrame(function () {
            self.drawMiniChickenWaling()
        })
}

addMiniChickenWalkingToMap(objects) {
        objects.forEach((o) => {
            this.addminiChickenWalkingToMap(o)
        })
    }

    addminiChickenWalkingToMap(mo) {
        // this.ctx.save();

        this.ctx.translate(this.camera_x, 0)
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        this.ctx.translate(-this.camera_x, 0)
    }

//=============EndbossAngry====================================
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

    //===========EndbossHealthbar=======================
    drawEndbossHealthbar(){
        this.addEndbossHealthStatusToMap(this.endbossHealthBar)
        let self = this;
        requestAnimationFrame(function (){
            self.drawEndbossHealthbar()
        })
    }

    addEndbossHealthStatusToMap(endbossHealthBar){
        this.drawEndbossHealthStatusToMap(this.ctx, endbossHealthBar)
    }

    drawEndbossHealthStatusToMap(ctx, endbossHealthBar){
        if(endbossHealthBar.img){
        try{
            ctx.drawImage(this.endbossHealthBar.img, endbossHealthBar.x, endbossHealthBar.y, endbossHealthBar.width, endbossHealthBar.height);
        } catch (error){
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }}
    }

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
        })
    }


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

            // if(this.Keyboard.d == true){
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

    //==========Coins =======================================
    drawCoins(){
        this.addCoinToMap(this.level.coins)
        let self = this;
        requestAnimationFrame(function(){
            self.drawCoins()
        })
    }

    addCoinToMap(objects) {
        objects.forEach((o) => {
            this.drawToMapCoins(this.ctx, o)
        })
    }

    // addCoinToMap(coins){
    //     this.drawToMapCoins(this.ctx, coins)
    // }

    drawToMapCoins(ctx, o){
        try{
            this.ctx.translate(this.camera_x, 0)
            ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            this.ctx.translate(-this.camera_x, 0)
        } catch(error){
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }


    //=======================================================================================
    addTomap(mo) {
        if (!mo.otherDirection) {
            this.ctx.restore();
            this.ctx.translate(this.camera_x, 0)
            // this.drawOtherDirection = false;
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
            this.drawOtherDirection = true;
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
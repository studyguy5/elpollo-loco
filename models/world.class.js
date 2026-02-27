class World {

    bottleBar = new statusBar(this, 20, 20, 210, 30,
        [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]
    ) //hier als Parameter die Koordinaten angeben
    healthBar = new statusBar(this, 20, 70, 210, 30,
        [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        
    ]
    ) //hier als Parameter die Koordinaten angeben

    Character = new character()

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
        this.drawEndboss();
        this.drawCharacter();
        this.drawChickens();
        this.checkCollisions();
    }

    img;
    img;

    lastHit = 0;
    timePassed = 0;


    
    //=============================================
    
    hit() {
        this.Character.energy -= 2;
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
        return this.timePassed == 10 ? this.timePassed = 0 : "", this.timePassed < 2;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemies) => {
                if (this.Character.isColliding(enemies)) {
                    // console.log('is colliding', this.Character.isColliding(enemies))
                    this.hit()
                    // this.Character.energy -= 2;
                    this.Character.playHurtAnimation(this.isHurt);
                }

                if (!this.Character.isColliding(enemies) && this.lastHit > 0 && this.isHurt()) {
                    // console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////', this.timePassed)
                    
                    this.Character.playHurtAnimation(this.isHurt);
                    // this.clearIntervall(this.Character.hurtInterval)
                }

                if (this.timePassed > 2) {
                    if (this.timePassed > 30) { this.timePassed = 0 }
                    // console.log('hat versucht zu stoppen&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', this.timePassed)
                }
            });
            

            
            // // Only set isHurt to false if no collision occurred with any enemy
            // if (!isCollidingAny) {
            //     this.isHurt = false;
            //     this.Character.stopHurtAnimation();
            // }

            if (this.Character.isDeath()) {
                this.Character.energy = 0;
                this.Character.playDeathAnimation();
                console.log('Game Over');
            }
        }, 1000 / 10)
        
        
        setInterval(() => {
            this.level.endboss.forEach((endboss) => {
                if (this.Character.isCollidingWithEndboss(endboss)) {
                    console.log('Collision detected with endboss', endboss);
                }
            }, 1000 / 10);
        })
    }
    
    isCollidingWithEndboss(endboss) {
        return (this.Character.x + this.Character.width > endboss.x &&
            this.Character.x < endboss.x + endboss.width &&
            this.Character.y < endboss.y + endboss.height &&
            this.Character.y + this.Character.height > endboss.y);
        }

        isColliding(mo) {
            return (
            this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y
        );
    }

    setWorld() {
        this.Character.world = this;
        this.bottleBar.worldStatus = this;
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
        this.addStatusToMap(this.bottleBar)
            let self = this;
            requestAnimationFrame(function () {
                    self.drawBottleBar()
                })
            }

    addStatusToMap(bottleBar){
        this.drawToMap(this.ctx, bottleBar)
    }

    
    drawToMap(ctx, bottleBar) {
        try {
            ctx.drawImage(this.bottleBar.img, bottleBar.x, bottleBar.y, bottleBar.width, bottleBar.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }
   

    //======================================================================
    //=======================health Bar====================================================================

        drawHealthBar(){
        this.addStatusToMap(this.healthBar)
            let self = this;
            requestAnimationFrame(function () {
                    self.drawHealthBar()
                })
            }
        

        addStatusToMap(healthBar){
        this.drawToMap(this.ctx, healthBar)
    }

    drawToMap(ctx, healthBar) {
        try {
            ctx.drawImage(this.healthBar.img, healthBar.x, healthBar.y, healthBar.width, healthBar.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }
    }





    //===============================================================================================
    addTomap(mo) {
        if (!mo.otherDirection) {
            this.ctx.restore();
            this.ctx.translate(this.camera_x, 0)
            mo.draw(this.ctx)
            this.ctx.translate(-this.camera_x, 0)
        }

        // Blue rectangle
        mo.drawRectangle(this.ctx, this.camera_x)
        // this.ctx.beginPath();
        // this.ctx.lineWidth = '3';
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.rect(mo.x, mo.y,mo.width,mo.height);
        // this.ctx.translate(-this.camera_x, 0)
        // this.ctx.stroke();



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
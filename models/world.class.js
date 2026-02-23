class World {

    Character = new character()

    level = level1;
    // enemies = level1.enemies;
    

    // clouds = level1.clouds;

    
    // bg = level1.bg;

    

    // ground = new floor()
    canvas;
    ctx;
    Keyboard;
    camera_x = 0;

    constructor(canvas, Keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.Keyboard = Keyboard;
        this.drawBackgroundLayers();
        this.drawClouds();
        // this.drawGround();
        this.drawCharacter();
        this.drawChickens();
        this.setWorld();
    }

    setWorld() {
        this.Character.world = this;
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
    
    drawBackgroundLayers(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundToMap(this.level.bg);
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.translate(-this.camera_x, 0)
        let self = this;
        requestAnimationFrame(function (){
            self.drawBackgroundLayers()
        })
    }

    // drawGround() {
    //     // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.addTomap(this.ground)
        
    //     let self = this;
    //     requestAnimationFrame(function () {
    //         self.drawGround()
    //     })
    // }
    
    drawChickens() {
        this.addObjektsToMap(this.level.enemies);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawChickens()
        })
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
    
    
    addObjektsToMap(objects){      
        objects.forEach((o) => {
            this.addTomap(o)
            // this.ctx.translate(this.camera_x, 0)
            // this.ctx.translate(-this.camera_x, 0)
        })
    }
    
    addBackgroundToMap(objects){
        objects.forEach((o) => {
            // this.ctx.translate(this.camera_x, 0)
            // this.ctx.translate(-this.camera_x, 0)
            this.drawBackgroundToMap(o)
        })
    }
    previousX;

    addTomap(mo){
        
        if (mo.otherDirection) {
            this.ctx.save();
            
            this.ctx.translate(this.camera_x, 0)
            this.ctx.translate(mo.width, 0);
            
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, -mo.x, mo.y, mo.width, mo.height)
            // this.ctx.translate(-this.camera_x, 0)
        }
        if (!mo.otherDirection) {
            this.ctx.restore();
            this.ctx.translate(this.camera_x, 0)
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
            this.ctx.translate(-this.camera_x, 0)
        }
    }
    
    drawBackgroundToMap(mo){
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        this.ctx.restore();
        // this.ctx.translate(-this.camera_x, 0)
    }
}
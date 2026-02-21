class World {

    Character = new character()

    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ]

    clouds = [
        new cloud()
    ]

    backgroundObjects = [
        new background()
    ]

    ground = new floor()
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.drawBackground();
        this.drawClouds();
        this.drawCharacter();
        this.drawChickens();
        this.drawGround();
    }

    drawCharacter() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addTomap(this.Character)

        let self = this;
        requestAnimationFrame(function () {
            self.drawCharacter()
        })
    }

    drawBackground(){
        this.addObjektsToMap(this.backgroundObjects);
        
        let self = this;
        requestAnimationFrame(function (){
            self.drawBackground()
        })
    }

    drawGround() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addTomap(this.ground)
        
        let self = this;
        requestAnimationFrame(function () {
            self.drawGround()
        })
    }
    
    drawChickens() {
        this.addObjektsToMap(this.enemies);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawChickens()
        })
    }
    
    
    drawClouds() {
        this.addObjektsToMap(this.clouds);
        // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
        let self = this;
        requestAnimationFrame(function () {
            self.drawClouds()
        })
    }
    
    
    
    addTomap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
    
    addObjektsToMap(objects){
        objects.forEach((o) => {
            this.addTomap(o)
        })
    }
}
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

    
    bg = [
        new background(0, 0, 720, 400, 'img/5_background/layers/air.png'),
        new background(0, 80, 720, 400, 'img/5_background/layers/3_third_layer/1.png'),
        new background(0, 80, 720, 400, 'img/5_background/layers/2_second_layer/1.png'),
        new background(0, 80, 720, 400, 'img/5_background/layers/1_first_layer/1.png'),
    ]

    

    // ground = new floor()
    canvas;
    ctx;
    Keyboard;

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
    }

    drawCharacter() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addTomap(this.Character)

        let self = this;
        requestAnimationFrame(function () {
            self.drawCharacter()
        })
    }

    drawBackgroundLayers(){
        this.addBackgroundToMap(this.bg);
        
        let self = this;
        requestAnimationFrame(function (){
            self.drawBackgroundLayers()
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

    drawBackgroundToMap(mo){
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
    
    addObjektsToMap(objects){
        objects.forEach((o) => {
            this.addTomap(o)
        })
    }

    addBackgroundToMap(objects){
        objects.forEach((o) => {
            this.drawBackgroundToMap(o)
        })
    }
}
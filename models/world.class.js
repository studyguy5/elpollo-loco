class World {

    Character = new character()
    
    enemies = [
        new chicken(150, 300),
        new chicken(250, 300),
        new chicken(400, 300),
    ]
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.drawCharacter();
        this.drawChickens();
    }

    drawCharacter() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.Character.img,this.Character.x, this.Character.y, this.Character.width, this.Character.height)

        let self = this;
        requestAnimationFrame(function(){
            self.drawCharacter()
        })
    }

    drawChickens(){
        this.enemies.forEach((enemies) =>
        {this.ctx.drawImage(enemies.img, enemies.x, enemies.y, enemies.width, enemies.height)
            
        }
    )
    // so wird drawChickens immer wieder aufgerufen (sieht man bei einem console.log)
    let self = this;
    requestAnimationFrame(function(){
        self.drawChickens()
    })
}
}
class DrawableObjekt {

    imageChache = {};
    
    
    subtrahendMax = -20;
    ctx;
    canvas;
    x = 80;
    y = 145;
    height = 300;
    width = 100;
    img;    //das gespeicherte Bild hier soll dem Bild aus characterImages entsprechen, damit wir es später in der animate Funktion ansprechen können, um es zu animieren
    // img;

    constructor() {
        const canvas = document.getElementById('gameCanvas');
        this.ctx = canvas.getContext('2d');
        
    }

    /**here we draw some single images whithout animation for the drawable object */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    
    /**here we draw the image for the drawable object */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    /**here we draw the image for the drawable object in the other direction */
    drawBackward(ctx) {
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }
    /**here we draw the background images for the world */
    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    
    /**here we load all Images from all classes into the image cache */
    loadImages(arr) { 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.imageChache[path] = img; 
        })
    }
}
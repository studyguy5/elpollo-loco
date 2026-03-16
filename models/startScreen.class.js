class StartScreen {
    img;
    canvas;
    heigth;
    width;
    y;
    x;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.loadStartScreen('img/9_intro_outro_screens/start/startscreen_1.png')
        this.width = 720;
        this.height = 480;
        this.y = 0;
        this.x = 0;
        this.drawStartScreen()
    }

    hideStartScreen(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }


    loadStartScreen(path) {
        this.img = new Image();
        this.img.src = path;

    }

    drawStartScreen() {
        // this.ctx.clearRect(0, 0, this.width, this.height);
        this.addStartScreenToMap(this.img)
        let self = this;
        requestAnimationFrame(function () {
            self.drawStartScreen()
        })
    }
    
    addStartScreenToMap() {
        this.drawStartScreenToMap(this.ctx, this.img)
    }
    
    drawStartScreenToMap(ctx, img) {
        try {
            
            ctx.beginPath()
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
        catch (error) {
            console.warn('Konnte nicht geladen werden', error)
            console.log('Fehler bei ', this.img)
        }

    }
}
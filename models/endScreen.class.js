class endScreen {
    img;
    img2;
    x;
    y;
    width;
    height;
    ctx;
    winLoose;

    constructor(canvas, state) {
        this.winLoose = state;
        this.ctx = canvas.getContext('2d')
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
        this.checkWinLoose()
        this.drawScreen();
        this.drawScreen2();
    }


    checkWinLoose() {
        if (this.winLoose == 'win') {
            this.loadScreen('img/5_background/first_half_background.png')
            this.loadScreen2('img/You_won_you_lost/You_win.png')
        } else {
            this.loadScreen('img/5_background/first_half_background.png')
            this.loadScreen2('img/You_won_you_lost/Game_Over.png')
        }
    }


    loadScreen(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadScreen2(path) {
        this.img2 = new Image();
        this.img2.src = path;
    }

    drawScreen() {
        this.drawImageToMap(this.ctx, this.img)
        let self = this
        requestAnimationFrame(function () {
            self.drawScreen()
        })
    }

    drawScreen2() {
        this.drawImageToMap2(this.ctx, this.img2)
        let self = this
        requestAnimationFrame(function () {
            self.drawScreen2()
        })
    }

    drawImageToMap(ctx, img) {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.beginPath()
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }

    drawImageToMap2(ctx, img2) {
        // ctx.clearRect(0, 0, this.width, this.height)
        // ctx.beginPath()
        ctx.drawImage(img2, this.x +100, this.y +100, this.width -200, this.height -150)
    }
}
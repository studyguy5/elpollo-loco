class statusBar extends DrawableObjekt {

    x;
    y;
    statusBarr;
    width;
    height;
    //connection to world class
    currentStatusImage = 5;
    camera_x = 0;
    percentige = 100;
    
    // bottle_statusbar = [
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    //     'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    // ]

    // health_statusbar = [
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    //     'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        
    // ]


    constructor(world, x, y, width, height, statusBarr) {
        super()
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.statusBarr = statusBarr
        this.loadImagesStatus(statusBarr)
        this.loadImagesStatushealth(statusBarr)
        this.setbottleImage(100)
        this.sethealthImage(100)
    }

    setbottleImage(energy) {
        this.percentige = energy
        let path = this.statusBarr[this.setPercentige(energy)];
        this.img = this.statusBarImages[path];
        // console.log(this.img);
    }

    sethealthImage(energy) {
        this.percentige = this.energy;
        let path = this.statusBarr[this.setPercentige(energy)];
        this.img = this.statusHealthImage[path];
    }


    setPercentige(energy) {
        this.percentige = energy;
        if (this.percentige == 100) {
            return 5;  
        }else if (this.percentige > 80 && this.percentige < 100) {
            return 4;
        }else if (this.percentige > 60 && this.percentige < 80) {
            return 3;
        }else if (this.percentige > 40 && this.percentige < 60) {
            return 2;
        }else if (this.percentige > 20 && this.percentige < 40) {
            return 1;
        }else{
            return 0;
        }

    }



    // waitForWorld(){
    // if(this.world)
    // this.world.loadStatusBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png')
    // // this.world.drawStatusBar(this.bottle_statusbar, this.camera_x)
    // // this.world.draw()

    // }


}
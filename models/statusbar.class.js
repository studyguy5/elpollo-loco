class statusBar extends DrawableObjekt {
    world;
    x;
    y;
    width;
    height;
    statusBarr;
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
        this.loadImageStatusCoin(statusBarr)
        this.loadImageStatusEndbossHealth(statusBarr)
        this.setbottleImage(0)
        this.sethealthImage(100)
        this.setCoinImage(0)
        this.checkCharacterReach()
    }
    
    checkCharacterReach(){
        
        setStoppableInterval(() => {
            console.log(this.world.Character.x);
            if(this.world.Character.x > (719 * 3.5))
            this.setEndbossHealthImage(this.world.level.endboss[0].endbossEnergy)
        
        }, 719*3.5);
        }

    setbottleImage() {
        // this.percentige = ThrowableObject
        if(this.statusBarr[0].includes('bottle', 0)){;
        let path = this.statusBarr[this.world.reportBottleLenght()];
        this.img = this.statusBottleImages[path];
        // console.log(this.img);
    }
    }

    sethealthImage(energy) {
        if(this.statusBarr[0].includes('health', 0)){
        this.percentige = this.energy;
        let path = this.statusBarr[this.setPercentige(energy)];
        this.img = this.statusHealthImage[path];}
        // console.log(this.img);
    }

    setCoinImage(coinAmount) {
        if(this.statusBarr[0].includes('coin', 0)){
        
        let path = this.statusBarr[this.checkCoinAmount(coinAmount)];
        this.img = this.statusCoinImage[path];}
        console.log(this.img);
    }

    setEndbossHealthImage(endbossEnergy){
        if(this.statusBarr[0].includes('endboss', 0)){
            let path = this.statusBarr[this.setEndbossPercentige(endbossEnergy)]
            this.img = this.statusEndbossHealthImage[path];
        }
    }

    checkCoinAmount(coinAmount){
        if(coinAmount == 0){
            return 0;
        }else if(coinAmount == 1){
            return 1;
        }else if(coinAmount == 2){
            return 2;
        }else if(coinAmount == 3){
            return 3;
        }else if(coinAmount == 4){
            return 4;
        }else{return 5}
    }

    setEndbossPercentige(endbossEnergy){
        // let endbossEnergy = this.world.level.endboss.endbossEnergy
        if(endbossEnergy == 100){
            return 5;
        }else if(endbossEnergy > 80 && endbossEnergy < 100){
            return 4;
        }else if(endbossEnergy > 60 && endbossEnergy < 80){
            return 3;
        }else if(endbossEnergy > 40 && endbossEnergy < 60){
            return 2;
        }else if(endbossEnergy > 20 && endbossEnergy < 40){
            return 1;
        }else{ return 0;}
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
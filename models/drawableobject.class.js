class DrawableObjekt {


    characterImages = {};
    chickenImages = {};
    endbossImages = {};
    hurtImages = {};
    deathImages = {};
    idleImages = {};
    statusBottleImages = {};
    statusHealthImage = {};
    statusCoinImage = {};
    subtrahendMax = 0;
    ctx;
    canvas;
    x = 80;
    y = 145;
    height = 300;
    width = 100;
    img;    //das gespeicherte Bild hier soll dem Bild aus characterImages entsprechen, damit wir es später in der animate Funktion ansprechen können, um es zu animieren

    constructor() {
        const canvas = document.getElementById('gameCanvas');
        this.ctx = canvas.getContext('2d');
    }

    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBackward(ctx) {
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }

    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    //==========load Images ========================================





    loadChickenImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.chickenImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der chickenImages Objekt ansprechen können, um sie dann zu animieren
        })
    }

    loadImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.characterImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadImagesStatus(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.statusBottleImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadImagesStatushealth(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.statusHealthImage[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadImageStatusCoin(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.statusCoinImage[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadIdleImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.idleImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der idleImages Objekt ansprechen können, um sie dann zu animieren
        })
    }

    loadJumpImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.characterImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadHurtImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.hurtImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der hurtImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    loadDeathImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.deathImages[path] = img;
        })
    }

    loadEndbossImages(arr) {
        console.log('loadEndbossImages', arr)
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.endbossImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der endbossImages Objekt ansprechen können, um sie dann zu animieren
        })
    };
}
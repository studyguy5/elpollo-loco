
class MovableObject extends DrawableObjekt {




    speed = 0.5;
    speedY = 0;
    acceleration = 3;
    otherDirection = false;
    energy = 100;
    gravityInterval = null;

    //=================bilder laden und zeichnen=====================================



    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    drawRectangle(ctx, camera_x) {
        if (this instanceof character || this instanceof chicken || this instanceof endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.translate(camera_x, 0)
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.translate(-camera_x, 0)
            ctx.stroke();
            // console.log('drawRectangle', this.x)
        }
    }

    drawRectangleForBackground(ctx, camera_x) {
        if (this instanceof character || this instanceof chicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.translate(camera_x, 0)
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.translate(-camera_x, 0)
            ctx.stroke();
            // console.log('drawRectangle', this.x)
        }
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

    applyGravity() {
        if (this.gravityInterval) {
        clearInterval(this.gravityInterval);
        }
    this.gravityInterval = setInterval(() => {
        if (this.isAboveGround()) {
            this.y -= this.speedY; // hier ziehen wir speedY von this.y ab (speedY started aber bei 0)
            this.speedY -= this.acceleration;
            console.log('applyGravity läuft','speedY ', this.speedY,'y-achese ', this.y)
                if(this instanceof ThrowableObject){
                    this.x += this.speedX;
                }
            } else {
                if(this instanceof ThrowableObject){
                    clearInterval(this.gravityInterval);
                }
                 this.speedY = 0;
                this.y = 125 } // hier wird die acceleration von speedY abgezogen, also das null von speedY - 1 von acceleration = -1
            // console.log('applyGravity', this.speedY, this.y)   // dieser Prcess passiert 25 mal in der Sekunde, daher wird speedY immer kleiner und ab einer grenze stoppt der Prozess
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 500;
        } else {
            return this.y < 100;
        }
    }

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


    //could be good for chicken to move left or right
    moveRightCharacter() {
        this.x += this.speed;
        this.otherDirection = false;
    };

    moveLeftCharacter() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jumpCharacter() {
        this.y -= this.jumpSpeed; // hier setzen wir die y Position des Charakters um 150 höher, damit er springt, aber nur wenn er nicht schon in der Luft ist (isAboveGround)
        this.jump = true;
        this.jumpSpeed -= 2; // hier verringern wir die jumpSpeed um 1, damit der Charakter wieder runterkommt, aber nur wenn er in der Luft ist (isAboveGround)
        console.log('Jumping', this.y)
        setTimeout(() => {
            this.jump = false; // hier setzen wir jump wieder auf false, damit der Charakter wieder springen kann, aber erst nach 1 Sekunde, damit er nicht sofort wieder springen kann
        }, 600);
    }

    //used for clouds to move left
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x < this.subtrahendMax) {
                this.x = Math.random() * 3100;
            }
        }, 1000 / 30);
    }

    //===================test fuction for image loop of character, chicken, endboss combined========================
    // playAnimation(images) {
    //     let path = images[this.currentImage];
    //     this.img = this.images[path];
    //     this.currentImage = (this.currentImage + 1) % images.length;
    // }

    jump() {

    }
}
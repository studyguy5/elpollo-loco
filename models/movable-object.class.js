
class MovableObject extends DrawableObjekt {

    /**here we define the offset for collision and chrushing detection */
    offset = { //setup Values for Offset here
        top: 15,
        left: 20,
        right: 20,
        bottom: 30
    };

    /**here we define the offset for collision and chrushing detection for mini chickens */
    offsetMini = { //setup Values for Offset here
        top: 10,
        left: 3,
        right: 3,
        bottom: 30
    };


    speed = 0.5;
    speedY = 200;
    acceleration = 0.5;
    otherDirection = false;
    energy = 100;
    gravityInterval = null;

    //=================bilder laden und zeichnen=====================================


    /**here we load the image for the movable object */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }


    // drawRectangle(ctx, camera_x) {
    //     if (this instanceof character) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'blue';
    //         ctx.translate(camera_x, 0)
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.translate(-camera_x, 0)
    //         ctx.stroke();

    //     }
    // }

    // drawRectangleForBackground(ctx, camera_x) {
    //     if (this instanceof chicken || this instanceof miniChicken) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '3';
    //         ctx.strokeStyle = 'blue';
    //         ctx.translate(camera_x, 0)
    //         ctx.rect((this.x + this.offset.left), (this.y + this.offset.top), this.width, this.height);
    //         ctx.translate(-camera_x, 0)
    //         ctx.stroke();
    //     }
    // }

    /**here we draw the image for the movable object */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**here we draw the image for the character object in the other direction */
    drawBackward(ctx) {
        // this.ctx.translate(this.camera_x, 0)
        // this.ctx.translate(-this.camera_x, 0)
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }

    /**here we draw the background images for the world */
    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**here we apply gravity to the movable object */

    applyGravity() {
        if (this.gravityInterval !== null) {
            clearInterval(this.gravityInterval);
        }
        this.gravityInterval = setStoppableInterval(() => {
            if (this.isAboveGround() || this.jump) {
                if (this.y > 125) return 
                this.y -= this.speedY; // hier ziehen wir speedY von this.y ab (speedY started aber bei 0)
                this.speedY -= this.acceleration;
                this.acceleration += 0.06;
            } else {
                this.speedY = 15;
                this.y = 125
                this.acceleration = 0.3;
            }
        }, 1000 / 25);
    }

    
    /**here we check if the movable object is above the ground */
    isAboveGround() {
            return this.y < 100;
        }
    
    /**here we move the character to the right */
    moveRightCharacter() {
        this.x += this.speed;
        this.otherDirection = false;

    };

    /**here we move the character to the left */
    moveLeftCharacter() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**here we make the character jump */
    jumpCharacter() {
        this.applyGravity(this.y = 125) // hier setzen wir die y Position des Charakters um 150 höher, damit er springt, aber nur wenn er nicht schon in der Luft ist (isAboveGround)
        this.jump = true;
        setTimeout(() => {
            this.jump = false; // hier setzen wir jump wieder auf false, damit der Charakter wieder springen kann, aber erst nach 1 Sekunde, damit er nicht sofort wieder springen kann
        }, 600);
        return true;
    }

    /**here we move the clouds to the left */
    moveLeft() {
        setStoppableInterval(() => {
            this.x -= this.speed;
            if (this.x < this.subtrahendMax) {
                this.x = Math.random() * 3100;
            }
        }, 1000 / 30);
    }

}
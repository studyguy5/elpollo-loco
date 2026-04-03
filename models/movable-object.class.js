/**
 * @classdesc this class is the parent class for all movable objects in the game, such as the character, enemies and clouds
 * it contains the properties and methods that are common to all movable objects, such as speed, gravity and collision detection
 * it also contains the methods to load and draw images for the movable objects
 */
class MovableObject extends DrawableObjekt {

    /**
     * @type {Object} we define the offset to make messurements precise for collision and chrushing detection
     * 
    */
   offset = {
       top: 15,
       left: 20,
       right: 20,
       bottom: 30
    };
    
    /**
     * @type {Object} we define the offset for collision and chrushing detection for mini chickens
    */
    offsetMini = { //setup Values for Offset here
        top: 10,
        left: 3,
        right: 3,
        bottom: 30
    };
    
    /**
     * @property {number} speed we define the speed for the movable object
     * @property {number} speedY we define the speedY for the movable object, which is used for jumping and gravity
     * @property {number} acceleration we define the acceleration for the movable object, which is used for jumping and gravity
     * @property {boolean} otherDirection we define the otherDirection for the movable object, 
     * which is used for drawing the character in the other direction
     * @property {number} energy we define the energy for the movable object, 
     * which is used for the character and enemies
     * @property {number} gravityInterval we define the gravityInterval for the movable object, 
     * which is used for applying gravity
     * @property {number} jumpTimeout we define the jumpTimeout for the character
    */
   speed = 0.5;
   speedY = 200;
   acceleration = 0.5;
   otherDirection = false;
   energy = 100;
   gravityInterval = null;
   jumpTimeout = null
   
   


    /**here we load the image for the movable object 
    * @param {string} path the path to the image for the movable object
    * @type {HTMLImageElement} img the image for the movable object
    * @returns void 
    */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }


    /**here we draw the image for the movable object
     * @param {HTMLCanvasElement} ctx the canvas element for drawing the movable object
     * @returns void
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**here we draw the image for the character object in the other direction
     * @param {HTMLCanvasElement} ctx the canvas element for drawing the character object
     * @returns void
     */
    drawOtherDirection(ctx) {
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }

    /**
     * 
     * @param {HTMLCanvasElement} ctx
     * this function draws the image for the movable object in the other direction     * it is used for the character object when it is moving to the left
     * @returns void 
     */
    drawBackward(ctx) {
        ctx.drawImage(this.img, -this.x, this.y, this.width, this.height);
    }

    /**here we draw the background images for the world
     * @param {HTMLCanvasElement} ctx the canvas element for drawing the background images
     * @returns void
     */
    drawBackground(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**here we apply gravity to the movable object
     * we use setInterval to continuously apply gravity to the movable object,
     * we check if the movable object is above the ground or if it is jumping, 
     * if it is, we apply gravity to it by changing its y position and speedY
     * if it is not, we reset its speedY and y position to the ground level
     * @returns void
     */

    applyGravity() {
        if (this.gravityInterval !== null) {
            clearInterval(this.gravityInterval);
        }
        this.gravityInterval = setStoppableInterval(() => {
            if (this.isAboveGround() || this.jump) {
                this.y -= this.speedY; // hier ziehen wir speedY von this.y ab (speedY started aber bei 0)
                this.speedY -= this.acceleration;
                this.acceleration += 0.06;
                if (this.y > 126){
                    this.y = 125;
                    this.speedY = 15;
                    this.acceleration = 0.3;}
                } else {
                    this.speedY = 15;
                    this.y = 125
                    this.acceleration = 0.3;
                }
            }, 1000 / 25);
    }


    /**here we check if the movable object is above the ground
     * we check if the y position of the movable object is less than 100, which is almost ground level
     * @returns {boolean} true if the movable object is below the 100, false if it is higher than 100
     */
    isAboveGround() {
        return this.y < 125;
    }

    /**here we move the character to the right
     * we change the x position of the character by adding the speed to it,
     * we also set the otherDirection to false, because the character is moving to the right
     * @returns void
     */
    moveRightCharacter() {
        this.x += this.speed;
        this.otherDirection = false;

    };

    /**here we move the character to the left
     * we change the x position of the character to the left by subtracting the speed from it,
     * we also set the otherDirection to true, because the character is moving to the left
     * @returns void
     */
    moveLeftCharacter() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**here we make the character jump
     * we apply gravity to the character by calling the applyGravity method, 
     * which continuously changes the y position of the character and its speedY
     * we also set the jump property to true, 
     * which is used to check if the character is jumping in the applyGravity method
     * we use setTimeout to reset the jump property to false after 600 milliseconds, 
     * which is the duration of the jump, so that the character can jump again after it has landed
     * @returns boolean true if the character is jumping, false if it is not
     */
    jumpCharacter() {
        this.applyGravity(this.y = 125) // hier setzen wir die y Position des Charakters um 150 höher, damit er springt, aber nur wenn er nicht schon in der Luft ist (isAboveGround)
        this.jump = true;
        if (this.jumpTimeout !== null) {
            clearTimeout(this.jumpTimeout);
            this.jumpTimeout = null;
        }
        this.jumpTimeout = setTimeout(() => {
            this.jump = false; // hier setzen wir jump wieder auf false, damit der Charakter wieder springen kann, aber erst nach 1 Sekunde, damit er nicht sofort wieder springen kann
        }, 1000);

    }

    /**here we move the clouds to the left 
     * we use setInterval to continuously move the clouds to the left by changing their x position,
     * we also check if the x position of the clouds is less than -100, which means they are off the screen, 
     * if they are, we reset their x position to a random value between 800 and 2000, 
     * so that they can reappear on the screen
     * @returns void
    */
    moveLeft() {
        setStoppableInterval(() => {
            this.x -= this.speed;
            if (this.x < this.subtrahendMax) {
                this.x = Math.random() * 3100;
            }
        }, 1000 / 30);
    }

}
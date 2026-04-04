/**
 * @class World class combines all objects in the game, holds all objects and functions to draw them on the canvas
 * simultanously we initialize the character, bottlebar and endboss objects and link them to the world in order to hold them as
 * a package
 */

class World {

    /**
     * @property {arry} bottleBar the array of bottle images for the bottlebar
     * @property {arry} healthBar the array of health images for the healthbar
     * @property {arry} coinBar the array of coin images for the coinbar
     * @property {arry} endbossHealthBar the array of health images for the endboss healthbar
     * @property {object} Character the character object
     * @property {object} throwableObjects the array of throwable objects
     * @property {object} level this is the connection to the level property
     * @property {HTMLCanvasElement} canvas this is the connection to the canvas div
     * @property {HTMLContext2D} ctx this is the connection to the canvas context
     * @property {object} keyboard this is the connection to the keyboard object
     * @property {number} camera_x this is the connection to the camera_x value for camera movement
     * @property {HTMLImageElement} img this is the img object for the world
     * @property {number} lasthit this is the last time the character was hit
     * @property {number} timepassed this is the time passed since the last hit
     * @property {audio} hitSound this is the audio object for the hit sound
     */
    bottleBar = new statusBar(this, 20, 10, 185, 50,
        [
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ]
    )
    healthBar = new statusBar(this, 20, 50, 185, 50,
        [
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'

        ]
    )
    coinBar = new statusBar(this, 20, 90, 185, 50,
        [
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'

        ]
    )


    endbossHealthBar = new statusBar(this, 505, 50, 185, 50,
        [
            'img/7_statusbars/2_statusbar_endboss/green/green0.png',
            'img/7_statusbars/2_statusbar_endboss/green/green20.png',
            'img/7_statusbars/2_statusbar_endboss/green/green40.png',
            'img/7_statusbars/2_statusbar_endboss/green/green60.png',
            'img/7_statusbars/2_statusbar_endboss/green/green80.png',
            'img/7_statusbars/2_statusbar_endboss/green/green100.png',
        ]
    )


    Character = new CharacterExtention()

    throwableObjects = []

    level = level1;
    canvas;
    ctx;
    Keyboard;
    camera_x = 0;
    lastCameraX = this.camera_x; // einmal initialisieren
    img;
    lastHit = 0;
    timePassed = 0;
    hitSound = new Audio('./audio/hit_audio.mp3')

    /**
     * @constructor this constructor is called when the world object is created, it connects the canvas and the keyboard, 
     * sets up the world and loads the images, loads background layers, draws objects, character and checks the character state
     * @param {object} canvas this is the connection to the canvas div 
     * @param {object} Keyboard this is the connection to the keyboard object in order to track the keys
     * @type {function} setWorld this connects child classes reverse to the world object in order to 
     * work with variables from the world
     * @type {function} drawBackgroundLayers this loads the background images for the world
     * @type {function} drawObjects this loads allmost all the objects for the world
     * @type {function} drawCharacter this loads the character for the world
     * @type {function} checkCharacter_State this checks the character state and shows animations accordingly
     * @type {function} reportBottleLenght this reports the length of the bottle statusbar
     */

    constructor(canvas, Keyboard) {
        this.ctx = canvas.getContext('2d')
        this.setWorld();
        this.canvas = canvas;
        this.Keyboard = Keyboard;
        this.drawBackgroundLayers();
        this.reportBottleLenght();
    }


    /**this function is called when the character is hit
     * @retunrns void
     */
    hit() {
        this.Character.energy -= 0.3;
        this.healthBar.sethealthImage(this.Character.energy)
        if (this.Character.energy < 0) {
            this.Character.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
        }
    }
    /**here we updated the endboss health width an image accoding to the index that matches the endboss energy
     * @return void
     */
    hitEndboss() {
        this.level.endboss.endbossEnergy;
        this.endbossHealthBar.setEndbossHealthImage(this.level.endboss.endbossEnergy)
    }

    /**here we make the hurt animation go on for further 1.5 seconds
     * @return boolean
     */
    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed < 1.5; //fragt ab wie lange es schon dauert
    }


    /**
     * @property {number} collected this counts the amount of bottles the character has collected
     * @property {boolean} d_wasPressed this checks if the character is throwing bottles
     * @property {boolean} drawOtherDirection this checks if the character is throwing bottles in the opposite direction
     * @property {number} coinAmount this counts the amount of coins the character has
     */
    collected = 0;
    d_wasPressed = false;
    drawOtherDirection = false;
    coinAmount = 0;



    /**here we report the bottle length for the bottle status bar
     * @returns number
     */
    reportBottleLenght() {
        if (this.collected < 6) {
            return this.collected;
        } else if (this.collected >= 6) {
            return 5;
        } else {
            return 0;
        }
    }

    /**here we cut a bottle from the array and update the statusbar combined with a setTimeout
     * @returns void
     */
    cutBottleFrom_Array() {
        if (this.Keyboard.d) {
            setTimeout(() => {
                this.throwableObjects.pop()
            }, 1000);
        }
    }

    /**here we check the throw objects and update the status bar by checking the bottle length
     * @returns void
     */
    checkThrowObjects() {
        this.bottleBar.setbottleImage()
    }

    /**here we check if the character is dead, if so we set the energy to 0 and play the death animation
     * @returns void
     */
    checkIfDeath() {
        if (this.Character.isDeath()) {
            this.Character.energy = 0;
            this.Character.playDeathAnimation();
        }
    }




    /**here we link the world to the character, bottlebar and endboss objects by giving the variables in the subclasses
     * the value of this, as a parameter
     * @returns void
     */
    setWorld() {
        this.Character.world = this;
        this.bottleBar.worldStatus = this;
        this.level.endboss[0].camera = this;
    }


    /**here we iterate through objects and add them to the map by iterating above every element in these arrays with for each
     * and calling the drawToMap function
     * @param {object} objects the objects from various classes
     */
    addObjektsToMap(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMap(o)
        })
    }


    /**this function executes the drawing of an object on the map with the native drawImage function and we change the
     * camera position before and after the drawing in order to take the camera view with the character
     * @param {object} o the object
     * @returns void or error message
     */
    drawToMap(o) {
        try {
            this.ctx.translate(this.camera_x, 0)
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            this.ctx.translate(-this.camera_x, 0)
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    /**here we iterate through throw objects and add them to the map seperately because bottles are only existend if
     * the player collects them and presses the button d
     * @param {object} objects the objects from various classes
     */
    addObjektsToMapThrow(objects) {
        const arr = Array.isArray(objects) ? objects : [objects];
        arr.forEach((o) => {
            this.drawToMapThrow(o)
        })
    }

    /**here we draw throw objects on the map and catch errors
     * @param {object} o the object from the throwableObjects array
     */
    drawToMapThrow(o) {
        try {
            this.ctx.translate(this.camera_x, 0)
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            this.ctx.translate(-this.camera_x, 0)
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    /**this function draws the character on the map and creates a loop with requestAnimationFrame
     * @type {object} self self represents this, and is needed to call the function recursively
     * @returns void
     */
    drawCharacter() {
        this.addTomap(this.Character)
        let self = this;
        requestAnimationFrame(function () {
            self.drawCharacter()
        })
    }

    /**here we draw the background layers on the map and clear the context before drawing and create a loop with
     * requestAnimationFrame
     * @returns void
     */
    drawBackgroundLayers() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundToMap(this.level.bg);
        let self = this;
        requestAnimationFrame(function () {
            self.drawBackgroundLayers()
        })
    }


    /**here we iterate through background objects and add them to the map by iterating over every background img in the array
     * @param {object} objects the objects from the background class
     * @returns void
     */
    addBackgroundToMap(objects) {
        objects.forEach((o) => {
            this.drawBackgroundToMap(o)
        })
    }


    /**this function draws a background object on the map
     * @param {object} mo the object from the background class
     * @returns void
     */
    drawBackgroundToMap(mo) {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)
        mo.draw(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.restore();
        // mo.drawRectangleForBackground(this.ctx, this.camera_x)
    }
    previousX;

    /**this function adds a bar to the map
     * @param {object} o the object from the statusbars class
     * @param {object} ctx the 2D context for the canvas
     * @returns void
     */
    addBarToMap(o) {
        this.drawBarToMap(this.ctx, o)
    }

    /**this draws a bar on the map with the native drawImage function
     * @param {object} ctx the 2D context for the canvas
     * @param {object} o the object from the statusbars class
     * @returns void or error message
     */
    drawBarToMap(ctx, o) {
        if (o.img) {
            try {
                ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            } catch (error) {
                console.warn('Konnte nicht geladen werden', error)
            }
        }
    }

    /**here we add a status bar to the map
     * @param {object} o the object from the statusbars class
     * @param {object} ctx the 2D context for the canvas
     * @returns void
     */
    addStatusToMap(o) {
        this.drawToMapBar(this.ctx, o)
    }

    /**here we draw a status bar on the map
     * @param {object} ctx the 2D context for the canvas
     * @param {object} o the object from the statusbars class
     * @returns void or error message
     */
    drawToMapBar(ctx, o) {
        try {
            ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        } catch (error) {
            console.warn('Konnte nicht geladen werden', error)
        }
    }

    /**this draws the character on the map normally and reversed
     * @param {object} mo the object from the character class
     * @param {object} ctx the 2D context for the canvas
     * @returns void
     */
    addTomap(mo) {
        if (!mo.otherDirection) {
            this.draw_restore_and_translate_Character(mo);
        }
        if (mo.otherDirection) {
            this.draw_restor_and_translate_Character_reverse(mo);
        }
    }

    draw_restore_and_translate_Character(mo) {
        this.ctx.restore();
        this.ctx.translate(this.camera_x, 0)
        mo.draw(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
    }

    draw_restor_and_translate_Character_reverse(mo) {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(mo.width, 0);
        this.drawOtherDirection = true;
        this.ctx.scale(-1, 1);
        mo.drawBackward(this.ctx)
        this.ctx.translate(-this.camera_x, 0)
        this.ctx.restore();
    }

}
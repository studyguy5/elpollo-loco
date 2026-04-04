
/**
 * @class WorldClassExtention this class is used to draw all objects on the canvas
 */
class WorldClassExtention extends World {


    /**
     * 
     * @param {HTMLCanvasElement} canvas this is the connection to the canvas div 
     * @param {keyBoard} Keyboard this is the keyboard Class as a parameter
     * @type {function} drawObjects this is a function to draw all objects on the canvas
     * @type {function} checkCharacter_State this is a function to check the character's state, like
     * is he jumping, colliding with enemies, mini enemies and the endboss
     */
    constructor(canvas, Keyboard) {
        super(canvas, Keyboard);
        this.drawObjects();
        this.drawCharacter();
        this.checkCharacter_State();
    }


    /**here we draw all objects on the canvas by taking all the objects from the level and adding them to the map in
 * a iteration function and draw it with the js native drawImage function and make a loop with the requestAnimationFrame
 * @returns void
    */
    drawObjects() {
        this.addObjektsToMap(this.level.enemies);
        this.addObjektsToMap(this.level.miniEnemies);
        this.addObjektsToMap(this.level.endboss);
        this.addObjektsToMap(this.level.clouds);
        this.addBarToMap(this.endbossHealthBar);//spezial
        this.addBarToMap(this.bottleBar);//spezial
        this.addObjektsToMap(this.level.bottles);
        this.addBarToMap(this.healthBar);//spezial
        this.addStatusToMap(this.coinBar);//spezial
        this.addObjektsToMap(this.level.coins)
        this.addObjektsToMapThrow(this.throwableObjects); //spezial
        let self = this;
        requestAnimationFrame(function () {
            self.drawObjects()
        })
    }

    /**here we check the character's state, if he is colliding or hurt with/by enemies, mini Enemies and update statusbars
     * @property {function} checkColliding_PlayHurt_andDeleyChicken this checks if the character is colliding with a chicken
     * and plays the animation accordingly
     * @property {function} checkColliding_PlayHurt_andDeleyMiniChicken this checks if the character 
     * is colliding with a mini chicken and plays the animation accordingly
     * @type {function} checkThrowObjects this checks if the character is throwing bottles and updates the bottle statusbar
     * @type {function} checkCollision_PlayHurt_andDeleyEndboss this checks if the character is colliding with the endboss
     * and plays the animation accordingly
     * @type {function} checkIfDeath this checks if the character is dead and plays the death animation
     * @type {function} checkCollisionWithCoins this checks if the character is colliding with coins and updates the coin statusbar
     * @type {function} checkCollisionWidth_Bottles this checks if the character is colliding with bottles and updates the bottle statusbar
     * @type {function} cutBottleFrom_Array this checks if the character is throwing bottles and updates the bottle statusbar
     */
    checkCharacter_State() {
        setStoppableInterval(() => {
            this.checkColliding_PlayHurt_andDeleyChicken()
            this.checkColliding_PlayHurt_andDeleyMiniChicken()
            this.checkThrowObjects() //responsible for bottle bar lenght
            this.checkCollision_PlayHurt_andDeleyEndboss()
        }, 1000 / 60)
        setStoppableInterval(() => {
            this.checkIfDeath(this.Character)
            // this.checkIfDeath(this.Character)
        }, 1000 / 10);
        setStoppableInterval(() => {
            this.checkCollisionWithCoins()
            this.checkCollisionWidth_Bottles();
            this.cutBottleFrom_Array();
        }, 1000 / 60);
    }

    /**here we check for collisions with coins
     * @type {function} isCollidingWidth_Coin this checks if the character is colliding with a coin
     * @type {function} setCoinImage this sets the image for the coin status bar according to the amount of coins
     * the character has gained
     * @returns void
     */
    checkCollisionWithCoins() {
        this.level.coins.forEach((coins) => {
            if (this.isCollidingWidth_Coin(coins)) {
                coins.y = 500;
                this.coinAmount++;
                this.coinBar.setCoinImage(this.coinAmount)
            }
        })
    }

    /**here we check for collisions with regular chickens
     * @param {object} enemies the chicken object
     * @returns boolean
     */
    bottleisCollidingWithChicken(enemies) {
        const hit = (
            this.throwableObjects[0]?.x + this.throwableObjects[0]?.width > enemies.x &&
            this.throwableObjects[0]?.x < enemies.x + enemies.width &&
            this.throwableObjects[0]?.y < enemies.y + enemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > enemies.y
        )
        return hit ? enemies : null;
    }

    /**here we check for collisions with mini chickens
     * @param {object} miniEnemies the mini chicken object
     * @returns boolean
     */
    bottleisCollidingWithMiniChicken(miniEnemies) {
        const hit = (
            this.throwableObjects[0]?.x + this.throwableObjects[0]?.width > miniEnemies.x &&
            this.throwableObjects[0]?.x < miniEnemies.x + miniEnemies.width &&
            this.throwableObjects[0]?.y < miniEnemies.y + miniEnemies.height &&
            this.throwableObjects[0]?.y + this.throwableObjects[0]?.height > miniEnemies.y
        )
        return hit ? miniEnemies : null;
    }

    /**here we check for collisions with bottles on the ground
     * @param {object} bottles the bottle object
     * @returns boolean
     */
    isCollidingWidth_Bottle(bottles) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > bottles.x &&
            this.Character.x + this.Character.offsetCharacter.left < bottles.x + bottles.width &&
            this.Character.y < bottles.y + bottles.height &&
            this.Character.y + this.Character.height - this.Character.offsetCharacter.bottom > bottles.y
        );
    }

    

    /**here we check for collisions with coins
     * @param {object} coins the coin object
     * @returns boolean
     */
    isCollidingWidth_Coin(coins) {
        return (
            this.Character.x + this.Character.width - this.Character.offsetCharacter.right > coins.x &&
            this.Character.x + this.Character.offsetCharacter.left < coins.x + coins.width &&
            this.Character.y < coins.y + coins.height &&
            this.Character.y + this.Character.height - this.Character.offsetCharacter.bottom > coins.y
        );
    }

    /**Here we check for collisions and for isChrushing with normal chickens 
     * and crushes the chicken
     * @returns void
    */
    checkColliding_PlayHurt_andDeleyChicken() {
        this.level.enemies.forEach((enemies) => {
            this.checkCharacter_or_bottle_crushing(enemies)
            this.checkCollission_timestamp_resetTimestamp(enemies)
        });
    }

    /**
     * 
     * @param {enemies} enemies
     * @type {function} makeInvincible_and_CrushChicken this makes the character invincible for a specified number of seconds
     * @type {function} chrushChicken this crushes the chicken, if a bottle is thrown at the chicken
     *  
     */
    checkCharacter_or_bottle_crushing(enemies) {
        if (this.Character.isChrushingChicken(enemies)) {
                this.makeInvincible_and_CrushChicken(enemies);
            }
            if (this.bottleisCollidingWithChicken(enemies)) { //check if throwable Bottle is colliding with enemie
                enemies.chrushChicken(enemies);
            }
    }

    /**
     * 
     * @param {enemies} enemies
     * @type {function} hurttAnimation_and_Sound this plays the hurt animation for the character and plays the sound effect
     * @type {function} keepHurting_Character this keeps the character hurting for a specified number of seconds 
     * 
     */
    checkCollission_timestamp_resetTimestamp(enemies) {
        if (this.Character.isColliding(enemies)) {
                this.hurtAnimation_and_Sound();
            }
            if (!this.Character.isColliding(enemies) && this.lastHit > 0 && this.isHurt()) {
                this.keepHurting_Character();
            }
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
            }
    }



    /**
     * @param {object} enemies the chicken object
     * @returns void
     */
    makeInvincible_and_CrushChicken(enemies) {
        this.Character.makeInvincible(3)
        enemies.chrushChicken(enemies)
        return;
    }

    /**
     * this function plays the hurt animation longer than the character is hurt to make the game real
     * @returns void
     */
    keepHurting_Character() {
        if (!this.Character.isInvincible()) {
            this.Character.playHurtAnimation(this.isHurt);
        }
    }

    /**
     * this function plays the hurt animation for the character and plays the sound effect
     * @returns void
     */
    hurtAnimation_and_Sound() {
        if (!this.Character.isInvincible()) {
            this.hit()
            this.Character.playHurtAnimation(this.isHurt);
            if (localStorage.getItem('muteStatus') == 'true') { } else {
                this.hitSound.volume = 0.2
                this.hitSound.play();
            }
        }
    }


    /**Here we check for collisions and for isChrushing with normal mini chickens
     * @param {object} miniEnemies the mini chicken object
     * @returns void
    */
   
    checkColliding_PlayHurt_andDeleyMiniChicken() {
        this.level.miniEnemies.forEach((miniEnemies) => {
            this.check_chrushing_character_or_bottle_miniChicken(miniEnemies);
            this.check_collission_timestamp_resetTimestamp_MiniChicken(miniEnemies);
        });
    }


    /**
     * 
     * @param {miniEnemies} miniEnemies
     * @type {function} makeInvincible this makes the character invincible for a specified number of seconds
     * @type {function} chrushMiniChicken this crushes the mini chicken, if a bottle is thrown at the mini chicken
     * @returns void 
     */
    check_chrushing_character_or_bottle_miniChicken(miniEnemies) {
        if (this.Character.isChrushingMiniChicken(miniEnemies)) {
                this.Character.makeInvincible(3)
                miniEnemies.chrushMiniChicken(miniEnemies)
                }
            //checks if a throwable bottle is colliding with a miniEnemies
            if (this.bottleisCollidingWithMiniChicken(miniEnemies)) {
                miniEnemies.chrushMiniChicken(miniEnemies);
            }
        }

    /**
     * 
     * @param {miniEnemies} miniEnemies 
     * @type {function} hurtAnimation_and_Sound_MiniChicken this plays the hurt animation for the character and plays the sound effect
     * @type {function} keepHurting_MiniChicken this keeps the character hurting for a specified number of seconds
     * @returns void
     */
    check_collission_timestamp_resetTimestamp_MiniChicken(miniEnemies) {
        if (this.Character.isCollidingMiniChicken(miniEnemies)) {
                this.hurtAnimation_and_Sound_MiniChicken();
            }
            if (!this.Character.isCollidingMiniChicken(miniEnemies) && this.lastHit > 0 && this.isHurt()) {
                this.keepHurting_MiniChicken();
            }
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
            }
    }

    /**
     * this function plays the hurt animation longer than the character is hurt to make the game real
     * @returns void
     */
    keepHurting_MiniChicken() {
        if (!this.Character.isInvincible()) {
            this.Character.playHurtAnimation(this.isHurt);
        }
    }

    /**
     * this function plays the hurt animation for the character and plays the sound effect
     * @returns void
     */
    hurtAnimation_and_Sound_MiniChicken() {
        if (!this.Character.isInvincible()) {
            this.hit()
            this.Character.playHurtAnimation(this.isHurt);
            if (localStorage.getItem('muteStatus') == 'true') { } else {
                this.hitSound.volume = 0.6
                this.hitSound.play();
            }
        }
    }

    /**here we check for collisions with bottles
     * @type {function} isCollidingWidth_Bottle this checks if the character is colliding with a bottle
     * @type {function} pushBottle_And_Throw this checks if the character is pressing d, pushes the bottle and throws it
     * @returns void
     */
    checkCollisionWidth_Bottles() {
        this.level.bottles.forEach((bottles) => {
            if (this.isCollidingWidth_Bottle(bottles)) {
                bottles.y = 1000;
                this.collected++
            }
            if (this.Keyboard.d == true && !this.d_wasPressed && this.collected > 0) {
                this.pushBottle_And_Throw()
            }
            if (this.d_wasPressed && this.Keyboard.d == false) {
                this.d_wasPressed = false
            }
        })
    }


    /**
     * this function pushes the bottle in the throwableObjects array and throws it with the character's direction
     * @returns void
     */
    pushBottle_And_Throw() {
        let bottle = new ThrowableObject(this.Character);
        // bottle.world = this
        this.throwableObjects.push(bottle);
        let index = (this.throwableObjects?.length - 1)
        if (this.Character.otherDirection) {
            this.throwableObjects[index]?.throw(-25, this)
        } else { this.throwableObjects[index]?.throw(25, this) }
        this.collected--
        this.d_wasPressed = true;
    }


    /**here we check for collisions with the endboss and extend the hurt animation
     * @param {object} endboss the endboss object
     * @type {function} isHurt this checks if the character is still hurt, aka the time of apx 2 seconds has passed
     * @returns void
     */
    checkCollision_PlayHurt_andDeleyEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.Character.isCollidingWithEndboss(endboss)) {
                this.hit()
                this.Character.playHurtAnimation(this.isHurt);
            }
            if (!this.Character.isCollidingWithEndboss(endboss) && this.lastHit > 0 && this.isHurt()) {
                this.Character.playHurtAnimation(this.isHurt);
            }
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }
            }
        })
    }
}



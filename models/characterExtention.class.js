
/**
 * @class characterExtention this class extends the character class and adds additional functionality to the character
 * it is a way to split the longer charcacter class into smaller parts
 */
class CharacterExtention extends character {

    /**
     * @type {number} slows down the jump frequency
     */
    jumpCounter = 0;

    /**
     * @constructor this constructor loads the images for the character animations, 
     * applies gravity to the character, shows the idle animation on the character, 
     * handles the character's movement and plays the character's animations
     * @type {function} showIdle_OnCharacter this function shows the idle animation on the character after a set time,
     * which is used for the character's idle behavior when the player is not providing input
     * @type {function} Move_Character this function checks for keyboard input and updates the character's position accordingly,
     * which is used for handling the character's movement to the right, left and jump actions
     * @type {function} playCharacter_Animations this function plays the character's animations based 
     * on the character's state and actions,
     * @type {function} animatejumpAndWalking_Character this function animates the character's jump 
     * and walking animations based on the character's state and actions
     */
    constructor() {
        super();
        this.move_Character();
        this.playCharacter_Animations();
        this.animatejumpAndWalking_Character();
        this.showIdle_OnCharacter();
        this.setTimeout();
    }


    /**here we play the character's hurt and death animation
     * @type {function} playHurtAnimation this function plays the hurt animation for the character when it gets hurt
     * @type {function} playDeathAnimation this function plays the death animation for the character when it dies
     */
    playCharacter_Animations() {
        setStoppableInterval(() => {
            this.playHurtAnimation();
            this.playDeathAnimation();
        }, 1000 / 20);

    }

    started = false;
    
    setTimeout() {
        setTimeout(() => {
            this.started = true;
        }, 1000);
    }


    /**here we animate the character's jumping and walking
     * @type {HTMLImageElement} img for the walking Animation
     * @type {HTMLImageElement} img for the jumping Animation
     * @returns void
     */
    animatejumpAndWalking_Character() {
        setStoppableInterval(() => {
            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
                this.animateWalking();
            }
        }, 1000 / 24);
        setStoppableInterval(() => {
            this.jumpCounter++;
            if (this.y < 100 && this.jumpCounter % 13 === 0 && this.started) {
                this.animateJumping();
            }
            if (!this.isAboveGround()) {
                this.currentJumpImage = 0;
            }
        }, 1000 / 40);
    }

    /**
     * animate the images of walking in a intervall
     * @type {HTMLImageElement} img for the walking Animation
     * @returns void
     */
    animateWalking() {
        let path = this.IMAGES_WALKING[this.currentImage];
        this.img = this.imageChache[path];
        this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
    }

    /**
     * animate the images of jumping in a intervall
     * @type {HTMLImageElement} img for the jumping Animation
     * @returns void
     */
    animateJumping(){
        let path = this.IMAGES_JUMPING[this.currentJumpImage];
                this.img = this.imageChache[path];
                this.currentJumpImage = (this.currentJumpImage + 1) % this.IMAGES_JUMPING.length;
    }

    /**
     * @type {function} Move_Character this function checks for keyboard input and updates the character's position accordingly
     * @type {Object} this.world.Keyboard this object is used to check for keyboard input
     * @type {object} endboss this object is used to check for the endboss position
     * @type {number} world.camera_x this number is used to check for the camera position
     * @returns void
     */
    move_Character() {
        setStoppableInterval(() => {
            if (this.world.Keyboard.RIGHT && this.x < this.world.level.endboss[0].x) { this.moveRightActions(); }
            if (this.world.Keyboard.LEFT && this.x > 100) { this.moveLeftActions(); }
            if (!this.world.Keyboard.RIGHT && !this.world.Keyboard.LEFT) { this.walkSound.pause(); this.walkSound.currentTime = 0; }
            if (!this.world.Keyboard.SPACE) { this.jumpsound.pause(); this.jumpsound.currentTime = 0; }
            if (!this.world.Keyboard.RIGHT && !this.world.Keyboard.LEFT && !this.world.Keyboard.SPACE && !this.isAboveGround()) {
                if (!this.normal) { this.setNormalTimeout(); }
                if (!this.long) { this.setLongTimeout(); }
                this.animationCounter++
                if (this.animationCounter % 3 === 0 && this.normalIdle) {
                    this.playIdleAnimation()
                }
                if (this.animationCounter % 3 === 0 && this.sleepIdle) {
                    this.playLongIdleAnimation()
                }
            }
            this.world.camera_x = -this.x + 80; //versetzt die Kamera proportional zur Position des Charakters
        }, 1000 / 30);
        setStoppableInterval(() => {
            if (this.world.Keyboard.SPACE && !this.isAboveGround() && !this.jump) { this.jumpActions(); }
        }, 1000 / 25);

    }

    /**this shows the idle animation on the character after a set time
     * @type {function} playIdleAnimation this function shows the idle animation on the character
     * @type {function} playLongIdleAnimation this function shows the long idle animation on the character
     * @returns void
     */
    showIdle_OnCharacter() {
        this.IdleTimeout = setTimeout(() => {
            this.playIdleAnimation()
        }, 3000);
        this.longIdleTimeout = setTimeout(() => {
            this.playLongIdleAnimation()
        }, 8000);
    }
}

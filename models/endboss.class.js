
/**
 * @classdesc {endboss} This class represents the endboss in the game, which is a chicken that gets angry and attacks the character when the character gets close to it. The endboss has different animations for getting angry, walking, getting hurt, attacking and dying. The endboss also has energy that decreases when the character throws a bottle at it, and when the energy reaches 0, the endboss dies.
 */
class endboss extends MovableObject {

    /**
     *  @property {number} x is the x-coordinate of the endboss 
     *  @property {number} y is the y-coordinate of the endboss
     *  @property {number} height is the height of the endboss
     *  @property {number} width is the width of the endboss
     * @property {number} currentEndbossImage is the index of the current image for the endboss getting angry animation, which is used for the endboss getting angry animation
     * @property {number} currentEndbossMoveImage is the index of the current image for the endboss walking animation, which is used for the endboss walking animation
     * @property {number} currentEndbossDeathImage is the index of the current image for the endboss death animation, which is used for the endboss death animation
     * @property {number} currentHurtEndbossImage is the index of the current image for the endboss hurt animation, which is used for the endboss hurt animation
     * @property {number} currentEndbossAttackImage is the index of the current image for the endboss attack animation, which is used for the endboss attack animation
     * @property {Object} camera is the camera object, which is used to access the character and the throwable objects in order to check for collisions and distance
     * @property {number} endboss_speed is the speed of the endboss, which is used for moving the endboss to the left when the character gets close to it
     * @property {number} endbossEnergy is the energy of the endboss, which is used for checking if the endboss is dead when the character throws a bottle at it
     * @property {object} offset the offset is to precice the endboss square
     * @property {number} attackjump this number changes the y-value in order to let the endboss jump
     * @property {number} gravity this controls the amount which is subtrahated on the y-value in order to let the enboss fall
     * @property {boolean} jumped this boolean lets the function know if the endboss is currently jumping and should not trigger again
     * @property {Audio} chickenHurtSound is the sound that plays when the endboss gets hurt, which is used for adding sound effects to the game
     * @property {string[]} endboss_getsAngry is the array of image paths for the endboss getting angry animation, which is used for the endboss getting angry animation
     * @property {string[]} endboss_Moves_Left is the array of image paths for the endboss walking animation, which is used for the endboss walking animation
     * @property {string[]} endboss_Is_Hurt is the array of image paths for the endboss hurt animation, which is used for the endboss hurt animation
     * @property {string[]} endboss_IS_Death is the array of image paths for the endboss death animation, which is used for the endboss death animation
     * @property {string[]} endboss_IS_Attacking is the array of image paths for the endboss attack animation, which is used for the endboss attack animation
     * @type {boolean} this flage prevents the if statement from playing two animation at the same time
     * 
    */
    x;
    y;
    height;
    width;
    currentEndbossImage = 0;
    currentEndbossMoveImage = 0;
    currentEndbossDeathImage = 0;
    currentHurtEndbossImage = 0;
    currentEndbossAttackImage = 0;
    camera;
    endboss_speed = 12;
    endbossEnergy = 100;

    offset = { 
        top: 15,
        left: 50,
        right: 20,
        bottom: 15
    };
    
    flag = true;

    attackjump = 30;
    gravity = 6;
    jumped = false;

    chickenHurtSound = new Audio('audio/chicken_hurtSound.mp3')
    endboss_getsAngry = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    endboss_Moves_Left = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    endboss_Is_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    endboss_IS_Death = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    endboss_IS_Attacking = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    /**
     * @constructor creates a new endboss object with the given x position and loads the images for the endboss animations
     * @type {function} loadImage function to load the first image for the endboss getting angry animation @returns void
     * @type {function} loadImages functions to load all the images for the different objects  @returns void
     * @property {number} x the x position of the endboss, which is used for moving 
     * the endboss and checking the distance to the character
     * @property {number} y the y position of the endboss, which is used for moving 
     * the endboss and checking the distance to the character
     * @property {number} height the height of the endboss, which is used 
     * for checking collisions with the character and the throwable objects
     * @property {number} width the width of the endboss, which is used for 
     * checking collisions with the character and the throwable objects
     * @type {function} animateEndboss function to animate the endboss by checking 
     * the distance to the character and if the endboss is dead, and acting accordingly @returns void
     */
    constructor(x = 0) {
        super().loadImage(this.endboss_getsAngry[0])
        this.loadImages(this.endboss_getsAngry)
        this.loadImages(this.endboss_Moves_Left)
        this.loadImages(this.endboss_Is_Hurt)
        this.loadImages(this.endboss_IS_Death);
        this.loadImages(this.endboss_IS_Attacking)
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 400;
        this.animateEndboss()
    }


    /**here we open two intervals in order to check distance and health
     * @type {function} checkDistanceToCharacter_And_Act this function check the distance as the names says and let the endboss
     * act in diferent ways
     * @type {function} isDeath this checks if the endboss is death, if so the Death Animation beginns to play
     */
    animateEndboss() {
        setStoppableInterval(() => {
            this.checkDistanceToCharacter_And_Act();
        }, 1000 / 10);
        setStoppableInterval(() => {
            if (this.isDeath()) {
                this.endbossDeath()
            }
        }, 600);
    }


    /**
     * here we check the distance to the endboss and act accordingly
     * @type {world} camera this is a connection to the world object 
     * @returns true or false
     */
    checkDistanceToCharacter_And_Act() {
        if ((this.camera?.Character.x + 800) > this.x && !this.isDeath() && this.flag) {
            this.endbossIsAngry()
        }
        if ((this.camera?.Character.x + 600) > this.x && !this.isDeath()) {
            this.endbossWalking_Actions();
        } else { this.flag = true; }

        if (((this.camera?.Character.x + 400) > this.x && !this.isDeath() && !this.jumped) || this.y < 70) {
            this.endbossAttack_and_jump();
        }
        if (this.bottleisCollidingWithEndboss() && !this.isDeath()) {
            this.endbossIsHurtActions();
        }
    }

    /**
     * in this function we make the endboss walking and play the walking Animation
     * @returns void
     */
    endbossWalking_Actions(){
        this.x -= this.endboss_speed
            this.endboss_Walking()
            this.flag = false;
    }

    /**here we handle the endboss attacks and jump animation and set Value back to start
     * @returns void
    */
    endbossAttack_and_jump() {
        if (this.y < 90) {
            this.endbossJump();
            this.endbossAttacking()
        }
        if (this.y > 80) {
            this.y = 80;
            this.attackjump = 30;
        }
    }

    /**here we handle the endboss getting hurt and play sound
     * @type {function} endbossHurt this function plays the hurt animation for the endboss when it gets hurt
     * @type {Audio} chickenHurtSound this is the sound that plays when the endboss gets hurt, which is used for adding sound effects to the game
      * @returns void
     */
    endbossIsHurtActions() {
        this.endbossEnergy -= 3.5;
        this.endbossHurt();
        if (localStorage.getItem('muteStatus') == 'true') { } else {
            this.chickenHurtSound.volume = 0.3
            this.chickenHurtSound.play();
        }
    }

    /**here we handle the endboss jump and set jumped to true to avoid multiple jumps at the same time
     * @type {number} attackjump with attackjump we make the endboss jump by reducing the y-position
     * simultaneously we subtract gravity from attackjump in a loop in order to make y-position go bigger
     * again and let the endboss fall
     * @returns void
     */
    endbossJump() {
        this.jumped = true;
        this.y -= this.attackjump;
        this.x -= this.endboss_speed;
        this.attackjump -= this.gravity;
        setTimeout(() => {
            this.jumped = false;
        }, 3000);
    }

    /**here we check if the endboss is dead 
     * @returns true or false
    */
    isDeath() {
        return this.endbossEnergy < 0;
    }

    /**this is the endboss hurt animation
     * @type {HTMLImageElement} img this img is for the hurt animation
     * @returns void
      */
    endbossHurt() {
        let path = this.endboss_Is_Hurt[this.currentHurtEndbossImage];
        this.img = this.imageChache[path];
        this.currentHurtEndbossImage = (this.currentHurtEndbossImage + 1) % this.endboss_Is_Hurt.length;
    }

    /**here we handle the endboss attack animation
     * @type {HTMLImageElement} img this img is for the Attacing Animation
     * @returns void
     */
    endbossAttacking() {
        let path = this.endboss_IS_Attacking[this.currentEndbossAttackImage];
        this.img = this.imageChache[path];
        this.currentEndbossAttackImage = (this.currentEndbossAttackImage + 1) % this.endboss_IS_Attacking.length;
    }

    /**here we handle the endboss death animation
     * @type {HTMLImageElement} img this img is for the Death Animation
     * @returns void
     */
    endbossDeath() {
        let path = this.endboss_IS_Death[this.currentEndbossDeathImage];
        this.img = this.imageChache[path];
        this.currentEndbossDeathImage = (this.currentEndbossDeathImage + 1) % this.endboss_IS_Death.length;
    }

    /**here we handle the endboss walking animation
     * @type {HTMLImageElement} img this img is for the walking Animation
     * @returns void
     */
    endboss_Walking() {
        let path = this.endboss_Moves_Left[this.currentEndbossMoveImage];
        this.img = this.imageChache[path];
        this.currentEndbossMoveImage = (this.currentEndbossMoveImage + 1) % this.endboss_Moves_Left.length;
    }

    /**here we handle the endboss getting angry animation
     * @type {HTMLImageElement} img this img is for the get Angry Animation
     * @returns void
     */
    endbossIsAngry() {
        let path = this.endboss_getsAngry[this.currentEndbossImage];
        this.img = this.imageChache[path];
        this.currentEndbossImage = (this.currentEndbossImage + 1) % this.endboss_getsAngry.length;
    }

    /**here we check if the character's bottle is colliding with the endboss
     * @type {world} camera this is a connection to the world object
     * @returns void
     */
    bottleisCollidingWithEndboss() {
        const hit = (this.camera?.throwableObjects[0]?.x + this.camera?.throwableObjects[0]?.width > this.x + this.offset.left &&
            this.camera?.throwableObjects[0]?.x < this.x + this.width &&
            this.camera?.throwableObjects[0]?.y < this.y + this.height &&
            this.camera?.throwableObjects[0]?.y + this.camera?.throwableObjects[0]?.height > this.y + this.offset.top);
            return hit ? this.x : null;
    }
}


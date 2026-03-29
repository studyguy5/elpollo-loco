class ThrowableObject extends MovableObject {

    img;

    x;
    y;
    width;
    height;
    speedY;
    speedX;
    fallOfBottle = 0.13;
    // wordLink;
    otherDirection = false;
    currentRotateImage = 0;
    currentBottleSplashImage = 0;

    bottle_Rotate_Images = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    bottle_SPLASH_Images = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]


    constructor() {
        super()
        this.x = 120;
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadImages(this.bottle_Rotate_Images);
        this.loadImages(this.bottle_SPLASH_Images);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImage('img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png')
    }


    intervalId;
    hit = false;
    speedY = 0;
    acceleration = 3;
    speedY = 15;

    /**here we handle the throwing of the bottle and the collision with the enemies and the endboss */
    throw(speedX, world) {
        this.intervalId = setStoppableInterval(() => {
            if (this.hit) return;
            const { enemiesC, miniEnemiesC, endbossC } = this.checkCollisionsWithBottle(world);
            if (enemiesC || miniEnemiesC || endbossC || this.y > 360) {
                console.log('bottle hit something')
                this.hit = true;
                clearInterval(this.intervalId);
                this.splashBottle()
                return;}
            this.bottleRotation_Animation();
            this.applyGravityBottle(speedX)
        }, 1000 / 35);
    }

    /**here we play the bottle rotation animation */
    bottleRotation_Animation() {
        let path = this.bottle_Rotate_Images[this.currentRotateImage];
        this.img = this.imageChache[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
        this.currentRotateImage = (this.currentRotateImage + 1) % this.bottle_Rotate_Images.length;
    }

    /**here we check if the bottle is colliding with the enemies or the endboss and return true or false */
    checkCollisionsWithBottle(world) {
        let enemiesC = world.level.enemies.some(e => world.isCollidingWithChicken(e));
        let miniEnemiesC = world.level.miniEnemies.some(e => world.isCollidingWithMiniChicken(e));
        let endbossC = world.level.endboss.some(e => e.isCollidingWithEndboss(e));
        return { enemiesC, miniEnemiesC, endbossC };
    }

    /**here we apply gravity to the bottle */
    applyGravityBottle(speedX) {
        this.x += speedX;
        this.y -= this.speedY;
        this.speedY -= this.acceleration
    }

    /**this animation appears when the bottle hits something */
    splashBottle() {
        setStoppableInterval(() => {
            let path = this.bottle_SPLASH_Images[this.currentBottleSplashImage]
            this.img = this.imageChache[path];
            this.currentBottleSplashImage = (this.currentBottleSplashImage + 1) % this.bottle_SPLASH_Images.length
        }, 1000 / 5)
    }
}

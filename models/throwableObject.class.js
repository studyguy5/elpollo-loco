class ThrowableObject extends MovableObject {

    img;
    img2;
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
        this.loadbottleRotationImages(this.bottle_Rotate_Images);
        this.loadBottleSplashImages(this.bottle_SPLASH_Images);
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_splash.png')
    }


intervalId;
hit = false;

    throw(speedX, world) {
       this.intervalId = setStoppableInterval(() => {
            if(this.hit) return;
            let enemiesC = world.level.enemies.some(e => world.isCollidingWithChicken(e));
            let miniEnemiesC = world.level.miniEnemies.some(e => world.isCollidingWithMiniChicken(e));
            let endbossC = world.isCollidingWithEndboss(world.level.endboss[0]);
            console.log('collision mit Enemie ', enemiesC, 'collision mit MiniEnemie ', miniEnemiesC, 'collision mit endboss ', endbossC)
            if (enemiesC || miniEnemiesC || endbossC || this.y > 400) {
                this.hit = true;
                clearInterval(this.intervalId);
                return;
            }
            console.log('throw läuft ========================');
            let path = this.bottle_Rotate_Images[this.currentRotateImage];
            this.img = this.bottleRotateImage[path]; //objekt idleImages befindet sich im Movalble Objekt, das wird im img tag gespeichert, welcher mit drawImage im Movable Objekt gezeichent wird
            this.currentRotateImage = (this.currentRotateImage + 1) % this.bottle_Rotate_Images.length;
            console.log('koordinaten vom der Bottle ', this.x + 'x-achse', this.y + 'y-achse')

        }, 1000 / 35);
        this.speedY = 15;
        this.applyGravity(speedX)
    }

    splashBottle() {
        setStoppableInterval(() => {
            let path = this.bottle_SPLASH_Images[this.currentBottleSplashImage]
            this.img = this.bottleSplashImage[path];
            this.currentBottleSplashImage = (this.currentBottleSplashImage + 1) % this.bottle_SPLASH_Images.length
        }, 1000 / 5)
    }





}

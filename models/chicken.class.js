
class chicken extends MovableObject {
    // Höhe und Breite von Chicken
    height = 70;
    width = 40;
    img;
    chicken_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    speed = 0.3 + Math.random() * 0.5;
    chickenIntervall;
    currentImage = 0;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.chicken_WALKING)
        this.y = 345;
        this.x = 400 + Math.random() * 3000;
        this.animateChicken()
        this.moveLeft(this.speed);
    }

    
    /**this is the animation for the chicken to walk */
    animateChicken() {
        this.chickenIntervall = setStoppableInterval(() => {
            let path = this.chicken_WALKING[this.currentImage];
            this.img = this.imageChache[path];
            this.currentImage = (this.currentImage + 1) % this.chicken_WALKING.length;
        }, 1000 / 20);
    }

    /**this is the animation for the chicken to crush */
    chrushChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        clearInterval(this.chickenIntervall)
        this.speed = 0;
        setTimeout(() => { 
            this.y = 490 }, 1500);
    }
}
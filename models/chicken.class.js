
class chicken extends MovableObject {
    // Höhe und Breite von Chicken
    height = 80;
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
        this.loadChickenImages(this.chicken_WALKING)
        //wir haben Zugriff auf die keys im MovableObjekt und sagen this.x = (....) und weisen hier in der chicken class jedem Chicken einen random x wert zu
        this.x = 400 + Math.random() * 450;
        //die chickens sollen vorerst alle am boden sein, deshalb gesamthöhe mit eigene Höhe ergebit abstand von oben y = 0, x = 0  ist in diesem 2d canvas ganz links oben in der Ecke
        this.y = 335;
        this.animateChicken()
        this.moveLeft(this.speed);
    }

    

    animateChicken() {
        this.chickenIntervall = setInterval(() => {
            let path = this.chicken_WALKING[this.currentImage];
            this.img = this.chickenImages[path];
            this.currentImage = (this.currentImage + 1) % this.chicken_WALKING.length;
        }, 1000 / 20);
    }

    chrushChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
        clearInterval(this.chickenIntervall)
        this.speed = 0;
        setTimeout(() => { 
            this.y = 490 }, 1500);
    }



}
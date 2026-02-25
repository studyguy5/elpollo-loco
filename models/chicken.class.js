
class chicken extends MovableObject {
    // Höhe und Breite von Chicken
    height = 110;
    width = 60;
    img;
    chicken_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]
    speed = 0.3 + Math.random() * 0.5;
    
    currentImage = 0;

    constructor(y = 0) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadChickenImages(this.chicken_WALKING)
        //wir haben Zugriff auf die keys im MovableObjekt und sagen this.x = (....) und weisen hier in der chicken class jedem Chicken einen random x wert zu
        this.x = 200 + Math.random() * 450;
        //die chickens sollen vorerst alle am boden sein, deshalb gesamthöhe mit eigene Höhe ergebit abstand von oben y = 0, x = 0  ist in diesem 2d canvas ganz links oben in der Ecke
        this.y = 320;
        this.animateChicken()
        this.moveLeft(this.speed);
    }

    // hit() {
    //     this.Character.energy -= 2;
    //     if (this.Character.energy < 0) {
    //         this.Character.energy = 0;
    //         this.lastHit = new Date.getTime();
    //     }else{
    //         this.lastHit = new Date().getTime()
    //     }
    // }

    
    // isHurt(){
    //     timePassed = new Date().getTime() - this.lastHit;
    //     timePassed = timePassed / 1000;
    //     return timePassed < 2;
    // }

    animateChicken() {
        setInterval(() => {
            let path = this.chicken_WALKING[this.currentImage];
            this.img = this.chickenImages[path];
            this.currentImage = (this.currentImage + 1) % this.chicken_WALKING.length;
        }, 1000 / 20);
    }




}
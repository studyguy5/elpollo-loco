
class chicken extends MovalbleObject {
    // Höhe und Breite von Chicken
    height = 140;
    width = 100;
    img;
    

    constructor(y = 0) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        //wir haben Zugriff auf die keys im MovableObjekt und sagen this.x = (....) und weisen hier in der chicken class jedem Chicken einen random x wert zu
        this.x = 200 + Math.random() * 500;
        //die chickens sollen vorerst alle am boden sein, deshalb gesamthöhe mit eigene Höhe ergebit abstand von oben y = 0, x = 0  ist in diesem 2d canvas ganz links oben in der Ecke
        this.y = 340;
    }


}

class cloud extends MovalbleObject{
    y = 20;
    height = 150;
    width = 300;

    constructor(y = 0) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        //wir haben Zugriff auf die keys im MovableObjekt und sagen this.x = (....) und weisen hier in der chicken class jedem Chicken einen random x wert zu
        this.x = Math.random() * 500;
        //die clouds sollen alle am Himmel sein, deshalb gesamthöhe mit eigene Höhe ergebit abstand von oben y = 0, x = 0  ist in diesem 2d canvas ganz links oben in der Ecke
        
    }
}
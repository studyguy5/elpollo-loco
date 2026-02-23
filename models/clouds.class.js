
class cloud extends MovableObject{
    y = 20;
    height = 480;
    width = 720;
    

    constructor(y = 0, x = 0) {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        //wir haben Zugriff auf die keys im MovableObjekt und sagen this.x = (....) und weisen hier in der chicken class jedem Chicken einen random x wert zu
        this.x = Math.random() * (Math.random() * 3400);
        //die clouds sollen alle am Himmel sein, deshalb gesamthöhe mit eigene Höhe ergibt abstand von oben y = 0, x = 0  ist in diesem 2d canvas ganz links oben in der Ecke
        this.y = y;

        this.animate()
    };

    animate() {
    this.moveLeft()
}

    
};
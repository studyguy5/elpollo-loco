
class chicken extends MovalbleObject {
    height = 140;
    width = 100;
    img;

    constructor(x = 0, y = 0) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = x;
        this.y = y;
    }


}
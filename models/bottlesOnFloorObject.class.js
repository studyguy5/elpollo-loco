class bottlesOnFloorObject extends MovableObject {

    x;
    y;
    width;
    height;
    img;
    worldConnection;
    randomIndex = (Math.random() * 2)
    random_x;


    constructor(x = 0, y = 0) {
        super()
        this.chooseNumber()
        this.loadImage(`img/6_salsa_bottle/${this.randomIndex}_salsa_bottle_on_ground.png`)
        this.worldConnection = this.worldConnection;
        this.random_x = 300 + Math.random() * 3300;
        this.x = Math.trunc(this.random_x)
        this.y = 360
        this.width = 50
        this.height = 60;
    }


    /**this function chooses a random number for the bottle image */
    chooseNumber() {
        if (this.randomIndex > 1.5) {
            this.randomIndex = 2;
        } else { this.randomIndex = 1 }
        return this.randomIndex;
    }
}
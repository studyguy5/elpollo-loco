
class character extends MovalbleObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    currentImage = 0;
    world;
    speed = 0.15;
    constructor() {

        super().loadImage('img/2_character_pepe/2_walk/W-21.png'),
        this.loadImages(this.IMAGES_WALKING)
        this.animate()
        this.catchKeyboard()
    }


    animate() {
        
        setInterval(() => {
            if (this.world.Keyboard.RIGHT || this.world.Keyboard.LEFT) {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img = this.characterImages[path];
            this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;}
        }, 1000 / 40);
    }


    catchKeyboard() {
        setInterval(() => {
            if (this.world.Keyboard.LEFT) {
                this.moveLeft();
            }
            if (this.world.Keyboard.RIGHT) {
                this.moveRight();
            }
            if (this.world.Keyboard.SPACE) {
                this.jump();
            }
            if (this.world.Keyboard.UP) {
                this.jump();
            }
            if (this.world.Keyboard.DOWN) {
                // this.duck();
            } else { }
        }, 1000 / 60);


    }

}
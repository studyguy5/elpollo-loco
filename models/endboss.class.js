class endboss extends MovableObject {
 
x;
y;
height;
width;
currentEndbossImage = 0;
    
endboss_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]


    constructor(x = 0, y = 0) {
        super().loadImage(this.endboss_WALKING[0])
        this.loadEndbossImages(this.endboss_WALKING)
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 400;
        this.animateEndboss()
    }

    // loadEndbossImage(path){
    //     this.img = new Image()
    //     this.img.src= path;
        
    // }


    //load images of endboss ==== zusammenfassen: alle arraybenennungen ersetzen mit einem allgemeinen namen, z.b images
    animateEndboss() {
        setInterval(() => {
            let path = this.endboss_WALKING[this.currentEndbossImage];
            this.img = this.endbossImages[path];
            this.currentEndbossImage = (this.currentEndbossImage + 1) % this.endboss_WALKING.length;
         }, 1000 / 10);
        }

}
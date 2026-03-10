class endboss extends MovableObject {

    x;
    y;
    height;
    width;
    currentEndbossImage = 0;
    currentEndbossMoveImage = 0;
    camera;
    endboss_speed = 2;

    endboss_getsAngry = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    endboss_Moves_Left = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]


    constructor(x = 0) {
        super().loadImage(this.endboss_getsAngry[0])
        this.loadEndbossImages(this.endboss_getsAngry)
        this.loadEndbossWalkingImages(this.endboss_Moves_Left)
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
            if((this.camera.Character.x + 200) > this.x){
                this.endbossIsAngry()
            }
            if ((-this.camera.Character.x < (-2900)) && (this.camera.Character.x + 200) < this.x) {
                this.x -= this.endboss_speed
                this.endboss_Walking()
                console.log(this.camera.Character.x)
        
            }
        }, 1000 / 10);
        
    }



    endboss_Walking(){
        let path = this.endboss_Moves_Left[this.currentEndbossMoveImage];
        this.img = this.endboss_WalkingImage[path];
        this.currentEndbossMoveImage = (this.currentEndbossMoveImage + 1) % this.endboss_Moves_Left.length;
    }

    endbossIsAngry(){
        let path = this.endboss_getsAngry[this.currentEndbossImage];
            this.img = this.endbossAngryImages[path];
            this.currentEndbossImage = (this.currentEndbossImage + 1) % this.endboss_getsAngry.length;
    }
}


class endboss extends MovableObject {

    x;
    y;
    height;
    width;
    currentEndbossImage = 0;
    currentEndbossMoveImage = 0;
    currentEndbossDeathImage = 0;
    currentHurtEndbossImage = 0;
    camera;
    endboss_speed = 2;
    endbossEnergy = 100;
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

    endboss_Is_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    endboss_IS_Death = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor(x = 0) {
        super().loadImage(this.endboss_getsAngry[0])
        this.loadEndbossImages(this.endboss_getsAngry)
        this.loadEndbossWalkingImages(this.endboss_Moves_Left)
        this.loadEndbossHurtImages(this.endboss_Is_Hurt)
        this.loadEndbossDeathImages(this.endboss_IS_Death);
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

    // played = 0;
    //load images of endboss ==== zusammenfassen: alle arraybenennungen ersetzen mit einem allgemeinen namen, z.b images
    animateEndboss() {
        setInterval(() => {
            if((this.camera.Character.x + 200) > this.x){
                this.endbossIsAngry()
            }
            if((-this.camera.Character.x < (-2900)) && (this.camera.Character.x + 200) < this.x && !this.isDeath()) {
                this.x -= this.endboss_speed
                this.endboss_Walking()
                console.log(this.camera.Character.x)
        
            }

            if(this.isCollidingWithEndboss()){
                this.endbossEnergy -= 9,5
                this.endbossHurt()  
                console.log('bottle hit Endboss Energy: ', this.endbossEnergy)
            }
            
        }, 1000 / 10);
        
        setInterval(() => {
            if(this.isDeath()){
                this.endbossDeath()
                setTimeout(() => {
                    this.y = 1000;
                    
                }, 2000);
            }
            
        }, 1000);
        
    }

    isDeath(){
        return this.endbossEnergy < 0;
    }


    endbossHurt(){
        let path = this.endboss_Is_Hurt[this.currentHurtEndbossImage];
        this.img = this.endbossHurtImage[path];
        this.currentHurtEndbossImage = (this.currentHurtEndbossImage + 1) % this.endboss_Is_Hurt.length;
    }

    endbossDeath(){
        let path = this.endboss_IS_Death[this.currentEndbossDeathImage];
        this.img = this.endbossDeathImage[path];
        this.currentEndbossDeathImage = (this.currentEndbossDeathImage + 1) % this.endboss_IS_Death.length;
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

    isCollidingWithEndboss(){
        return ((this.camera.Character.x + (this.camera.throwableObjects[0]?.x - 120))  + this.camera.throwableObjects[0]?.width > this.x &&
            (this.camera.Character.x + (this.camera.throwableObjects[0]?.x - 120)) < this.x + this.width &&
            this.camera.throwableObjects[0]?.y < this.y + this.height &&
            this.camera.throwableObjects[0]?.y + this.camera.throwableObjects[0]?.height > this.y);
    }
}


class miniChicken extends MovableObject{
width = 50;
height = 50;
x;
y;
walkingSpeed = 1.2;
currentMiniChickenImage = 0;
miniChickenIntervall;


smallChickenWalk = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
]

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadminiChickenWalkImages(this.smallChickenWalk)
        this.x = 400 + Math.random() *3000;
        this.y = 365;
        // this.animateMiniChicken()      
        this.MiniChickenWalk()
    }

    
    
    MiniChickenWalk(){
        this.miniChickenIntervall = setInterval(() => {
            this.x -=this.walkingSpeed;
            let path = this.smallChickenWalk[this.currentMiniChickenImage];
            this.img = this.smallChickenWalksImage[path];
            this.currentMiniChickenImage = (this.currentMiniChickenImage + 1) % this.smallChickenWalk.length;
        }, 1000/24);
    }

    chrushMiniChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
        clearInterval(this.miniChickenIntervall)
        this.speed = 0;
        setTimeout(() => { 
            this.y = 490 }, 1500);
    }
    
}
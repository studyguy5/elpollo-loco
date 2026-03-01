class ThrowableObject extends MovableObject {

    img;
    x;
    y;
    width;
    height;
    speedY;
    speedX;
    fallOfBottle = 0.13;


    constructor() {
        super().throw(100, 150)
        this.x = 120;
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
    }
    
    
    reset(){
        this.x = 120;
        this.y = 260;
        
    }
    
    throw(){
            let pressed = false;
            
            
                console.log('Taste gedrückt ')
                this.speedY = 25;
                this.speedX = 25;
                this.y -= this.speedY;
                this.applyGravity()
                pressed = true;
            
        }
        // setInterval(() => {
        //     if(this.y < 250)
        //     this.x += this.speedX;
        //     this.y -= this.speedY;
        //     this.speedY -= this.fallOfBottle 
        //     console.log(this.speedY);
        //     if(this.y > 330){this.speedY = 0}
        // }, 1000/25);
    }

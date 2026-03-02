class ThrowableObject extends MovableObject {

    img;
    x;
    y;
    width;
    height;
    speedY;
    speedX;
    fallOfBottle = 0.13;
    wordLink;


    constructor() {
        super()
        // this.throw(100, 150)
        this.x = (Math.random() *120);
        this.y = 260;
        this.width = 40;
        this.height = 80;
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        // this.matchJump()
    }


    // matchJump() {
    //     setInterval(() => {
    //         if (this.isAboveGround()){
    //         this.y -= this.jumpSpeed; // hier setzen wir die y Position des Charakters um 150 höher, damit er springt, aber nur wenn er nicht schon in der Luft ist (isAboveGround)
    //         this.jump = true;
    //         this.jumpSpeed -= 2;}
            
    //     }, 60);
    // }


    throw() {
        // document.addEventListener('keydown', (e) => {
            // if (e.key == 'd') {
                console.log('Taste gedrückt ')
                this.speedY = 25;
                this.speedX = 25;
                // this.y -= this.speedY;
                this.applyGravity()
                // console.log(this.world.throwableObjects)
            }
    


    
    
}

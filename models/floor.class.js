class floor extends MovableObject{
width = 720;
height = 240;
x;
y;

    constructor(x = 0, y = 0){
        super().loadImage('img/5_background/layers/1_first_layer/1.png')
        this.x = 0;
        this.y = 100;      
    }
    
}
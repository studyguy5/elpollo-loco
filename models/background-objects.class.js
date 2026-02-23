class background extends MovableObject{
x;
y;
img;



    constructor(x = 0, y = 0, width = 720, height = 480, path = ''){
        super()
        this.loadBackgroundImage(path)
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width; 
    }

    loadBackgroundImage(path){
        this.img = new Image()
        this.img.src= path;
        
    }


}
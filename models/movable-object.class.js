
class MovalbleObject {
    x = 80;
    y = 180;
    img;
    height = 300;
    width = 100;

    loadImage(path){
        this.img = new Image()
        this.img.src= path;
    }

    moveRight(){
        console.log('moveRight');
    }

    moveLeft(){

    }

    jump(){

    }
}
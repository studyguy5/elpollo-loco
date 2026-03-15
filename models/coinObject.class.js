class Coin extends MovableObject{

x;
y;
width;
height;


    constructor(){
    super().loadImage('img/7_statusbars/3_icons/icon_coin.png')
    this.x = 300 + Math.random() * 3000;
    this.y = 200 + Math.random() * 150;
    this.width = 60;
    this.height = 60;
    }
}
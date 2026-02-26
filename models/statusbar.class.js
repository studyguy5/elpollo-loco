class statusBar extends MovableObject{

x;
y;
img;
width;
height;
//connection to world class
// worldStatus;
camera_x = 0;

bottle_statusbar = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
]


    constructor(world, x, y, width, height){
        super()
        this.world = world;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.waitForWorld()
    }
    


    waitForWorld(){
    if(this.world)
    this.world.loadStatusBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png')
    this.world.addStatusToMap(this.bottle_statusbar, this.camera_x)
    // this.world.draw()
    
    }


}
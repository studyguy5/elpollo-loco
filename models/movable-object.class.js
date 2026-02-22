
class MovalbleObject {
    x = 80;
    y = 145;
    img;    //das gespeicherte Bild hier soll dem Bild aus characterImages entsprechen, damit wir es später in der animate Funktion ansprechen können, um es zu animieren
    characterImages = {};
    chickenImages = {};
    subtrahendMax = 10;
    height = 300;
    width = 100;
    speed = 0.15;
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    loadChickenImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.chickenImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der chickenImages Objekt ansprechen können, um sie dann zu animieren
        })
    }

    loadImages(arr) {
        // Array.isArray(arr) && 
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.characterImages[path] = img; //hier legen wir den Pfad als key und value in einem Objekt ab, 
            // also der key besteht aus dem path und der value besteht aus dem img-Objekt, 
            // damit wir später mit diesem Pfad die Bilder in der characterImages Objekt ansprechen können, um sie dann zu animieren
        })
    };

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
            if (this.x > 700) {
                this.x = 50;
            }
        }, 1000 / 30)
        console.log('moveRight');
    };

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x < this.subtrahendMax) {
                this.x = 700;
            }
        }, 1000 / 30);
        console.log('moveLeft');
    }

    jump() {

    }
}
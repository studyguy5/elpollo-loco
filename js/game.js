
let canvas;

let Keyboard = new keyBoard();
let world;

function init() {
    canvas = document.getElementById('gameCanvas')
    world = new World(canvas, Keyboard);


    console.log('My Character is ', world.enemies)
}

window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'ArrowRight':
            console.log('Right arrow key pressed');
            Keyboard.RIGHT = true;
            // world.Character.moveRight();
            break;
        case 'ArrowLeft':
            console.log('Left arrow key pressed');
            Keyboard.LEFT = true;
            break;
    }})


    window.addEventListener('keyup', (e) => {

        switch (e.key) {
            case 'ArrowRight':
                console.log('Right arrow key released');
                Keyboard.RIGHT = false;
                break;
            case 'ArrowLeft':
                console.log('Left arrow key released');
                Keyboard.LEFT = false;
                break;
        }
    })



        // if(e.key == 'ArrowRight'){
        //     console.log('Right arrow key pressed');
        //     world.Character.moveRight();
        // }   else if(e.key == 'ArrowLeft'){
        //     console.log('Left arrow key pressed');
        //     world.Character.moveLeft();


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
            Keyboard.RIGHT = true; // variablen werden für gedrückte Tasten auf true gesetzt
            break;
        case 'ArrowLeft':
            console.log('Left arrow key pressed');
            Keyboard.LEFT = true;
            break;

        case 'ArrowUp':
            console.log('Up arrow key pressed');
            Keyboard.UP = true;
            break;
        case 'ArrowDown':
            console.log('Down arrow key pressed');
            Keyboard.DOWN = true;
            break;
        case ' ':
            console.log('Space key pressed');
            Keyboard.SPACE = true;
            break;
    }})


    window.addEventListener('keyup', (e) => {

        switch (e.key) {
            case 'ArrowUp':
                console.log('Up arrow key released');
                Keyboard.UP = false; // variablen werden für losgelassene Tasten auf false gesetzt
                break;
            case 'ArrowDown':
                console.log('Down arrow key released');
                Keyboard.DOWN = false;
                break;
            case 'ArrowRight':
                console.log('Right arrow key released');
                Keyboard.RIGHT = false;
                break;
            case 'ArrowLeft':
                console.log('Left arrow key released');
                Keyboard.LEFT = false;
                break;
            case ' ':
                console.log('Space key released');
                Keyboard.SPACE = false;
                break;
        }
    })



        // if(e.key == 'ArrowRight'){
        //     console.log('Right arrow key pressed');
        //     world.Character.moveRight();
        // }   else if(e.key == 'ArrowLeft'){
        //     console.log('Left arrow key pressed');
        //     world.Character.moveLeft();


let canvas;
let world;
let Keyboard = new keyBoard();


function init() {
    canvas = document.getElementById('gameCanvas')
    world = new World(canvas, Keyboard);
    


    console.log('My Character is ', world.level.enemies)
}

window.addEventListener('keydown', (e) => {
    // e.preventDefault();  // ← Alle Keys blocken!
    switch (e.key) {
        case 'ArrowRight':
            Keyboard.RIGHT = true; // variablen werden für gedrückte Tasten auf true gesetzt
            break;
        case 'ArrowLeft':
            Keyboard.LEFT = true;
            break;
        case 'ArrowUp':
            Keyboard.UP = true;
            break;
        case 'ArrowDown':
            Keyboard.DOWN = true;
            break;
        case  'd':
            Keyboard.d = true;
            console.log('d Taste gedrückt')
            break;
        case ' ':
            Keyboard.SPACE = true;
            break;
            
    }})


    window.addEventListener('keyup', (e) => {
    
        switch (e.key) {
            case 'ArrowUp':
                Keyboard.UP = false; // variablen werden für losgelassene Tasten auf false gesetzt
                break;
            case 'ArrowDown':
                Keyboard.DOWN = false;
                break;
            case 'ArrowRight':
                Keyboard.RIGHT = false;
                break;
            case 'ArrowLeft':
                Keyboard.LEFT = false;
                break;
            case  'd':
            Keyboard.d = false;
            console.log('d Taste losgelassen')
                break;
            case ' ':
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

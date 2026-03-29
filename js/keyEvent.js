
/**here we listen for keydown events to controle gamePlay */
window.addEventListener('keydown', (e) => {
    // e.preventDefault();  // ← Alle Keys blocken!
    switch (e.key) {
        case 'ArrowRight':
            Keyboard.RIGHT = true; // variablen werden für gedrückte Tasten auf true gesetzt
            let right = document.getElementById('LeftRight')
            right.style.color = 'white';
            break;
        case 'ArrowLeft':
            Keyboard.LEFT = true;
            let left = document.getElementById('LeftRight')
            left.style.color = 'white';
            break;
        case 'ArrowUp':
            Keyboard.UP = true;
            break;
        case 'ArrowDown':
            Keyboard.DOWN = true;
            break;
        case 'd':
            Keyboard.d = true;
            let d = document.getElementById('Shoot')
            d.style.color = 'white';
            break;
        case ' ':
            Keyboard.SPACE = true;
            let space = document.getElementById('Jump')
            space.style.color = 'white';
            break;

    }
})

/**here we listen for keyup events to controle gamePlay */
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
            let test = document.getElementById('LeftRight')
            test.style.color = 'black';
            break;
        case 'ArrowLeft':
            Keyboard.LEFT = false;
            let left = document.getElementById('LeftRight')
            left.style.color = 'black';
            break;
        case 'd':
            Keyboard.d = false;
            let d = document.getElementById('Shoot')
            d.style.color = 'black';
            break;
        case ' ':
            Keyboard.SPACE = false;
            let space = document.getElementById('Jump')
            space.style.color = 'black';
            break;
    }
})

/**here we listen for touch Start events to control gamePlay */
window.addEventListener('touchstart', (e) => {
    switch (e.target.id) {
        case 'btnLeft':
            Keyboard.LEFT = true;
            break;
        case 'btnRight':
            Keyboard.RIGHT = true;
            break;
        case 'btnShoot':
            Keyboard.d = true; //shoot bottle
            break;
        case 'btnJump':
            Keyboard.SPACE = true; // jump
    }
})

/**here we listen for touch End events to control gamePlay */
window.addEventListener('touchend', (e) => {
    switch (e.target.id) {
        case 'btnLeft':
            Keyboard.LEFT = false;
            break;
        case 'btnRight':
            Keyboard.RIGHT = false;
            break;
        case 'btnShoot':
            Keyboard.d = false;
            break;
        case 'btnJump':
            Keyboard.SPACE = false;
    }
})

let canvas;
let world;
let Keyboard = new keyBoard();
let startscreen;
let endState;

function init() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    checkWinLooseIntervall;


    // console.log('My Character is ', world.level.enemies)
}

function startMaskforGame() {
    let mask = document.getElementById('startMask')
    mask.innerHTML += `
    <div id="startDialog" class="startDialog">
    <h3 onclick="startGame()">StartGame</h3>
    
    <h3>Settings</h3>
    </div>
    `
}

function startGame() {
    let dialog = document.getElementById('startDialog')
    dialog.style.display = "none";
    startscreen.hideStartScreen()
    world = new World(canvas, Keyboard);
}

let checkWinLooseIntervall = setInterval(() => {
    if (world?.Character.isDeath()) {
        // clearInterval(checkWinLooseIntervall);
        checkWinLooseIntervall = null;
        world.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
        world = null;
        // this.ctx.clearRect(0, 0, this.width, this.height)
        endState = new endScreen(canvas, 'loose')
        endMaskForGame()
    } else if (world?.level.endboss[0].isDeath()) {
        // clearInterval(checkWinLooseIntervall);
        checkWinLooseIntervall = null;
        world.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
        world = null;
        // this.ctx.clearRect(0, 0, this.width, this.height)
        endState = new endScreen(canvas, 'win')
        endMaskForGame()
    }
    
}, 1000 / 20);

function endMaskForGame(){
    let end = document.getElementById('endMask')
    end.innerHTML= "";
    end.style.display = "flex";
    end.innerHTML += `
    <div id="endDialog" class="endDialog">
    <h3 onclick="startGame(); hideEndDialog()">Restart Game</h3>
    
    <h3>Placeholder</h3>
    </div>
    `
    setTimeout(() => {
    document.querySelector('.endDialog').classList.add('visible');
  }, 20);  // 10ms reicht!
}

function hideEndDialog(){
    let end = document.getElementById('endDialog')
    end.classList.remove('visible')
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
        case 'd':
            Keyboard.d = true;
            // console.log('d Taste gedrückt')
            break;
        case ' ':
            Keyboard.SPACE = true;
            break;

    }
})


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
        case 'd':
            Keyboard.d = false;
            // console.log('d Taste losgelassen')
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

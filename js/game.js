
let canvas;
let world;
let Keyboard = new keyBoard();
let startscreen;
let endState;
backgroundSound = new Audio('audio/background-mexico.mp3')

function init() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderControlButton();
    renderSoundButton();
    checkWinLooseIntervall;
}

// document.addEventListener('click', () => {
//   playBackgroundMusic();
// })

function playBackgroundMusic(){
    backgroundSound.volume = 0.1
    backgroundSound.play()
    
}

function startMaskforGame() {
    let mask = document.getElementById('startMask')
    mask.innerHTML += `
    <div id="startDialog" class="startDialog">
    <h3 onclick="startGame()">Start Game</h3>
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
        setTimeout(() => {
            
            endState = new endScreen(canvas, 'loose')
            endMaskForGame()
        }, 500);
    } else if (world?.level.endboss[0].isDeath()) {
        // clearInterval(checkWinLooseIntervall);
        checkWinLooseIntervall = null;
        world.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
        world = null;
        setTimeout(() => {
            endState = new endScreen(canvas, 'win')
            endMaskForGame()
        }, 1500);
    }

}, 1000 / 20);

function endMaskForGame() {
    let end = document.getElementById('endMask')
    end.innerHTML = "";
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

function hideEndDialog() {
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


function renderControlButton() {
    let buttonField = document.getElementById('controlHudCharacter')
    buttonField.innerHTML += `
    <div class="MovePanel">
    <button class="btnLeft" id="btnLeft">Left</button>
    <button class="btnRight" id="btnRight">Right</button>
    </div>
    <div class="JumpShootPanel">
    <button class="btnShoot" id="btnShoot">Shoot</button>
    <button class="btnJump" id="btnJump">Jump</button>
    </div>
    `

}

function renderSoundButton() {
    let sound = document.getElementById('controlHudSound')
    sound.innerHTML += `
    <div class="soundPanel" id="soundPanel">
    <img onclick="changeMuteStatus()" src="./img/muted_icon.jpg">
    <img onclick="changeToFullscreen()" src="./img/full-screen_logo.png">
    </div>
    `
}

let elem = document.getElementById('canvaAria');

document.addEventListener('fullscreenchange', () => {
    setTimeout(() => {
        if (document.fullscreenElement) {
          canvas.style.width = window.innerWidth + 'px';
          canvas.style.height = window.innerHeight + 'px';
        } else {
          canvas.style.width = 720 + 'px';
          canvas.style.height = 480 + 'px';
        }
    }, 100);
});

function changeToFullscreen(){
    if (elem.requestFullscreen && !document.fullscreenElement){
        openFullscreen(elem)
    }else{
        resetFullscreen(elem)
    }
}

// let canvas = document.getElementById('gameCanvas')
function openFullscreen() {
  if (elem.requestFullscreen && !document.fullscreenElement) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen && !document.fullscreenElement) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen && !document.fullscreenElement) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function resetFullscreen(){
    if(document.exitFullscreen && document.fullscreenElement){
      document.exitFullscreen();
    } else if (document.webkitexitFullscreen && document.fullscreenElement) { /* Safari */
      document.exitFullscreen();
    } else if (elem.msRequestFullscreen && document.fullscreenElement) { /* IE11 */
      document.exitFullscreen();
    }

}

function changeMuteStatus(){
    let img = document.getElementById('soundPanel')
    let currentImg = img.querySelector('img');
    if(currentImg.src.includes('muted_icon')){
        currentImg.src = './img/not_mute.png';
        playBackgroundMusic();
    }else{
        currentImg.src = './img/muted_icon.jpg'
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
    }
}


// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) { /* Safari */
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) { /* IE11 */
//     document.msExitFullscreen();
//   }
// }


// window.addEventListener("orientationchange", () => {
//   if (window.matchMedia("(orientation: landscape)").matches) {
//     console.log("Jetzt Querformat");
//   } else {
//     console.log("Jetzt Hochformat");
//   }
// });

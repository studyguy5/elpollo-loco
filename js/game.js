
let canvas;
let world;
let Keyboard = new keyBoard();
let startscreen;
let endState;
backgroundSound = new Audio('audio/background-music_short.mp3')
backgroundSound.loop = true;

function init() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderControlButton();
    renderSoundButton();
    renderInfo();
    localStorage.setItem('muteStatus', true)
    checkMuteStatus();
    checkWinLooseIntervall;
}

function reloadInit() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderInfo();
    localStorage.setItem('muteStatus', true)
    checkMuteStatus();
    checkWinLooseIntervall;
}


function playBackgroundMusic() {
    backgroundSound.volume = 0.15
    backgroundSound.play()

}

function stopBubbling(event) {
    event.stopPropagation();
}

function startMaskforGame() {
    let mask = document.getElementById('startMask')
    mask.innerHTML = "";
    mask.innerHTML += `
    <div id="startDialog" class="startDialog">
    <h3 onclick="startGame()">Start Game</h3>
    <h3 onclick="makeInfoVisible()">Info/Impressum</h3>
    </div>
    `
}

function renderInfo() {
    let info = document.getElementById('infoDiv')
    info.innerHTML = /*html*/`
    <div  class="infoWrapper">
    <div class="closeButton">Back to Start Screen ><img onclick ="makeInfoVisible()" src="./img/closeFrame.svg"></div>
    <div class="infoHead">Info for the game
    <img src="img/little_chicken.jpg">
    </div>
    <div class="infoMainText">
    <ol>
    <li><h4>Goal</h4> - conquer or avoid all enemies and finaly conquer the big endboss chicken to win</li>
    <li><h4>Chicken</h4> - conquer chicken by shooting a bottle at them oder jump on them</li>
    <li><h4>mini Chicken</h4> - conquer mini Chicken by shotting bottles or jump on them</li>
    <li><h4>Endboss</h4> - conquer the endboss by shooting three or up to four bottle on the endboss</li>
    </div>
    <hr>
    <div class="inmpressum">
    <h4>Impressum</h4>
    <p>Leonhard<br />
            Fantasy Street 28b<br />
            45971 Koppenhagen Avenue</p>

        <h3>Kontakt</h3>
        <p>E-Mail: beispiel@gmail.com</p>

        <p>Quelle: <a class="footer-link" href="https://www.e-recht24.de">e-recht24.de</a></p>
    </div>
    </div>
    `
}

function makeInfoVisible() {
    let info = document.getElementById('infoDiv')
    let ad = document.getElementById('closeDiv')
    if (info.classList.contains('infoDivVisible')) {
        info.classList.remove('infoDivVisible')
        ad.style.display = "none"
    } else {
        info.classList.add('infoDivVisible')
        ad.style.display = 'flex'

    }
}

let checkWinLooseIntervall;

function checkWinLoose() {
    if (world?.Character.isDeath()) {
        setLoosingEndscreen();
    } else if (world?.level.endboss[0].isDeath()) {
        setWinningEndscreen()
    }
};


function setLoosingEndscreen() {
    checkWinLooseIntervall = null;
    world.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
    world = null;
    setTimeout(() => {
        endState = new endScreen(canvas, 'loose')
        endMaskForGame()
        stopAllIntervall()
    }, 500);
}

function setWinningEndscreen() {
    checkWinLooseIntervall = null;
    world.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
    world = null;
    setTimeout(() => {
        endState = new endScreen(canvas, 'win')
        endMaskForGame()
        stopAllIntervall()
    }, 1500);
}


function startGame() {
    let dialog = document.getElementById('startDialog')
    dialog.style.display = "none";
    startscreen.hideStartScreen()
    world = new World(canvas, Keyboard);
    checkWinLooseIntervall = setInterval(checkWinLoose, 1000 / 20);
}

function restartGame() {
    // let dialog = document.getElementById('startDialog')
    // dialog.style.display = "none";
    clearInterval(checkWinLoose);
    startscreen.hideStartScreen()
    level1 = new Level([
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],

        [
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),

        ],

        [
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
        ],

        [
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
        ],

        [
            new cloud(),
            new cloud(),
            new cloud(),
            new cloud(),
        ],

        [
            new background(0, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),
        ],

        [
            new endboss(3400, 80, 400, 400, 'img/4_enemie_boss_chicken/2_alert/G5.png'),
        ])
    world = new World(canvas, Keyboard);
    setTimeout(() => {
        checkWinLooseIntervall = setInterval(() => {
            checkWinLoose();
        }, 1000 / 20);;
    }, 500);
}


function stopAllIntervall() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function backToStartScreen() {
    endState.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
    endState = null;
    let end = document.getElementById('endMask')
    end.innerHTML = "";
    end.style.display = "none"
    reloadInit();
    level1 = new Level([
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],

        [
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),
            new bottlesOnFloorObject(),

        ],

        [
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
            new miniChicken(),
        ],

        [
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
            new chicken(),
        ],

        [
            new cloud(),
            new cloud(),
            new cloud(),
            new cloud(),
        ],

        [
            new background(0, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(0, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(719 * 2, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719 * 3, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),

            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/3_third_layer/1.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/2_second_layer/1.png'),
            new background(719 * 4, 0, 720, 480, 'img/5_background/layers/1_first_layer/1.png'),

            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/air.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/3_third_layer/2.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/2_second_layer/2.png'),
            new background(719 * 5, 0, 720, 480, 'img/5_background/layers/1_first_layer/2.png'),
        ],

        [
            new endboss(3400, 80, 400, 400, 'img/4_enemie_boss_chicken/2_alert/G5.png'),
        ])
}

function endMaskForGame() {
    let end = document.getElementById('endMask')
    end.innerHTML = "";
    end.style.display = "flex";
    end.innerHTML += `
    <div id="endDialog" class="endDialog">
    <h3 onclick="restartGame(); hideEndDialog()">Restart Game</h3>
    <h3 onclick="backToStartScreen()">Back to Start Screen</h3>
    <h3 onclick="makeInfoVisible()">Info/Impressum</h3>
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
    buttonField.innerHTML += /*html */`
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
    sound.innerHTML += /*html */ `
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

function changeToFullscreen() {
    if (elem.requestFullscreen && !document.fullscreenElement) {
        openFullscreen(elem)
    } else {
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

function resetFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitexitFullscreen && document.fullscreenElement) { /* Safari */
        document.exitFullscreen();
    } else if (elem.msRequestFullscreen && document.fullscreenElement) { /* IE11 */
        document.exitFullscreen();
    }

}

function checkMuteStatus() {
    if (localStorage.getItem('muteStatus') == 'true') {
    } else {
        playBackgroundMusic()
    }
}

function changeMuteStatus() {
    let img = document.getElementById('soundPanel')
    let currentImg = img.querySelector('img');
    if (currentImg.src.includes('muted_icon')) {
        currentImg.src = './img/not_mute.png';
        playBackgroundMusic();
        localStorage.removeItem('muteStatus')
        // localStorage.removeItem('shoppingCart')
        localStorage.setItem('muteStatus', false)
    } else {
        currentImg.src = './img/muted_icon.jpg'
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        localStorage.removeItem('muteStatus')
        localStorage.setItem('muteStatus', true)
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

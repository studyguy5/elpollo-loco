
let canvas;
let world;
let Keyboard = new keyBoard();
let startscreen;
let endState;
backgroundSound = new Audio('audio/background-music_short.mp3')
backgroundSound.loop = true;

/**this is the normal initialization function to start the game first time */
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

/**this is the initialization function to reload the game and go back to the startscreen */
function reloadInit() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderInfo();
    localStorage.setItem('muteStatus', true)
    checkMuteStatus();
    checkWinLooseIntervall;
}

/**this function plays the background music */
function playBackgroundMusic() {
    backgroundSound.volume = 0.15
    backgroundSound.play()

}

/**this is for UX purposes only */
function stopBubbling(event) {
    event.stopPropagation();
}

/**here we create the start mask for the game */
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

/**this function renders the info div to show extra Info and the Impressum  */
function renderInfo() {
    let info = document.getElementById('infoDiv')
    info.innerHTML = /*html*/`
    <div  class="infoWrapper">
    <div class="closeButton"><img onclick ="makeInfoVisible()" src="./img/closeFrame.svg"></div>
    <div class="infoHead"><h2>Info for the game</h2>
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

/**this function toggles the visibility of the info div */
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

/**this function checks if the player has won or lost the game */
function checkWinLoose() {
    if (world?.Character.isDeath()) {
        setLoosingEndscreen();
    } else if (world?.level.endboss[0].isDeath()) {
        setWinningEndscreen()
    }
};


/**this function sets the endscreen when the player loses shows the loosing EndMask and stopps all Intervalls */
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

/**this function sets the endscreen when the player wins shows the winning EndMask and stopps all Intervalls */
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

/**this function starts the game and starts the win/loose checking Intervall */
function startGame() {
    let dialog = document.getElementById('startDialog')
    dialog.style.display = "none";
    startscreen.hideStartScreen()
    world = new World(canvas, Keyboard);
    checkWinLooseIntervall = setInterval(checkWinLoose, 1000 / 20);
}


/**here we initialize the game for restart, set up a new level and but all new movalbe objects as parameters in it and start the game instantly*/
function restartGame() {
    clearInterval(checkWinLoose);
    startscreen.hideStartScreen()
    level1 = new Level(
        Array.from({ length: 10 }, () => new Coin()),
        Array.from({ length: 6 }, () => new bottlesOnFloorObject()),
        Array.from({ length: 6 }, () => new miniChicken()),
        Array.from({ length: 6 }, () => new chicken()),
        Array.from({ length: 4 }, () => new cloud()),
        

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

/**this function stops all active intervals and clears the array with interval IDs */
function stopAllIntervall() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**this function takes the player back to the start screen - the same way as the user opens the game the first time but not play instantly*/
function backToStartScreen() {
    endState.ctx.clearRect(0, 0, 720, 480);  // Canvas leeren
    endState = null;
    let end = document.getElementById('endMask')
    end.innerHTML = "";
    end.style.display = "none"
    reloadInit();
    level1 = new Level(
        Array.from({ length: 10 }, () => new Coin()),
        Array.from({ length: 6 }, () => new bottlesOnFloorObject()),
        Array.from({ length: 6 }, () => new miniChicken()),
        Array.from({ length: 6 }, () => new chicken()),
        Array.from({ length: 4 }, () => new cloud()),

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

/**this shows the end mask with three options for the game  (restart, back to start screen, info) */
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

/**this function hides the end dialog if the user wants to reload the game or go back to the start screen */
function hideEndDialog() {
    let end = document.getElementById('endDialog')
    end.classList.remove('visible')
}

/**this function renders the control buttons for the handy/tablet Mode*/
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

/**this function renders the sound/mute button for the game in the right top corner */
function renderSoundButton() {
    let sound = document.getElementById('controlHudSound')
    sound.innerHTML += /*html */ `
    <div class="soundPanel" id="soundPanel">
    <img onclick="changeMuteStatus()" src="./img/muted_icon.jpg">
    <img onclick="changeToFullscreen()" src="./img/full-screen_logo.png">
    </div>
    `
}


/**this function handles the fullscreen change event by toggling the fullscreen mode */
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

/**this variable is used in the fullscreen/reset fullscreen request function and catches the canvas of the document */
let elem = document.getElementById('canvaAria');


/**this function changes the game to fullscreen mode */
function changeToFullscreen() {
    if (elem.requestFullscreen && !document.fullscreenElement) {
        openFullscreen(elem)
    } else {
        resetFullscreen(elem)
    }
}

/**this function opens the fullscreen mode for various browsers */
function openFullscreen() {
    if (elem.requestFullscreen && !document.fullscreenElement) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen && !document.fullscreenElement) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen && !document.fullscreenElement) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**this function resets the fullscreen mode for various browsers */
function resetFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitexitFullscreen && document.fullscreenElement) { /* Safari */
        document.exitFullscreen();
    } else if (elem.msRequestFullscreen && document.fullscreenElement) { /* IE11 */
        document.exitFullscreen();
    }

}

/**here we check the mute status of the game by checking the local storage variable */
function checkMuteStatus() {
    if (localStorage.getItem('muteStatus') == 'true') {
    } else {
        playBackgroundMusic()
    }
}

/**here we toggle the img for the mute button, play or mute the background music and change the variable in local storage */
function changeMuteStatus() {
    let img = document.getElementById('soundPanel')
    let currentImg = img.querySelector('img');
    if (currentImg.src.includes('muted_icon')) {
        currentImg.src = './img/not_mute.png';
        playBackgroundMusic();
        localStorage.removeItem('muteStatus')
        localStorage.setItem('muteStatus', false)
    } else {
        currentImg.src = './img/muted_icon.jpg'
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        localStorage.removeItem('muteStatus')
        localStorage.setItem('muteStatus', true)
    }
}


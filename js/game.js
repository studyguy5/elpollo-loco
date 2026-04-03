
/**
 * @property {HTMLCanvasElement} canvas the canvas element where the game is rendered
 * @property {World} world the connection to the world object
 * @property {keyBoard} Keyboard the connection/definition of the keyboard
 * @property {StartScreen} startscreen the variable for the startscreen
 * @property {EndScreen} endState the variable for the endscreen
 * @property {Audio} backgroundSound the variable who holds the background music
 */

let canvas;
let world;
let Keyboard = new keyBoard();
let startscreen;
let endState;
backgroundSound = new Audio('audio/background-music_short.mp3')
backgroundSound.loop = true;

/**this is the normal initialization function to start the game first time
 * @type {HTMLCanvasElement} canvas the canvas element is the connection to the canvas div
 * @type {StartScreen} startscreen the variable for the startscreen
 * @function {startMaskforGame} the start mask for the game makes the start screen visible
 * @function {renderControlButton} the control buttons are rendered on the surface of the canvas
 * @function {renderSoundButton} the sound button is rendered on the surface of the canvas
 * @function {renderInfo} the info is rendered in a special div to inform the user about instructions and the Impressum
 * @type {setItem}  the mute status is saved in the local storage
 * @function {checkMuteStatus} the mute status is checked from the local storage
 * @type {checkWinLooseIntervall} the checkWinLooseIntervall is set up and saved with this variable
 * @returns void 
 */
function init() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderSound_MuteButton();
    renderInfo();
    localStorage.setItem('muteStatus', true)
    checkMuteStatus();
    checkWinLooseIntervall;
}

/**this is the initialization function to reload the game and go back to the startscreen
 * @function {reloadInit} the reloadInit function is used to load only required variables but not all
 * @returns void
 */
function reloadInit() {
    canvas = document.getElementById('gameCanvas')
    startscreen = new StartScreen(canvas)
    startMaskforGame();
    renderInfo();
    localStorage.setItem('muteStatus', true)
    checkMuteStatus();
    checkWinLooseIntervall;
}

/**this function plays the background music
 * @function {playBackgroundMusic} the background music is played and volume is set
 * @returns void
*/
function playBackgroundMusic() {
    backgroundSound.volume = 0.15
    backgroundSound.play()
    
}


/**here we create the start mask for the game
 * @function {startMaskforGame} the start mask for the game makes the start screen visible
 * and renders the menu buttons to start the game or show the info
 * @returns void
*/
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

/**this function renders the info div to show extra Info and the Impressum
 * @function {renderInfo} this is the function itself who renders the info div into the dom
 * @returns void
*/
function renderInfo() {
    let info = document.getElementById('infoDiv')
    info.innerHTML = /*html*/`
    <div  class="infoWrapper">
    <div class="closeButton"><img onclick ="makeInfoVisible()" src="./img/closeFrame.svg"></div>
    <div class="infoHead"><p class="infoHeadText">Info for the game</p>
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

    <h4>Kontakt</h4>
        <p>E-Mail: beispiel@gmail.com</p>
        
        <p>Quelle: <a class="footer-link" href="https://www.e-recht24.de">e-recht24.de</a></p>
        </div>
    </div>
    `
}

/**this function toggles the visibility of the info div
 * @function {makeInfoVisible} this function toggles the visibility of the info div
 * @returns void
*/
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

/**
 * @type {number} checkWinLooseIntervall is used to check the character state end stop it after the game is over
 */
let checkWinLooseIntervall;

/**this function checks if the player has won or lost the game
 * @function {checkWinLoose} this function checks if the player has won or lost the game
 * @function {setLoosingEndscreen} this function sets the endscreen when the player 
 * loses shows the loosing EndMask and stopps all Intervalls
 * @function {setWinningEndscreen} this function sets the endscreen when the 
 * player wins shows the winning EndMask and stopps all Intervalls
 * @returns void
*/
function checkWinLoose() {
    if (world?.Character.isDeath()) {
        setLoosingEndscreen();
    } else if (world?.level.endboss[0].isDeath()) {
        setWinningEndscreen()
    }
};


/**
 * @function {setLoosingEndscreen} this function sets the endscreen when the player loses 
 * shows the loosing EndMask and stopps all Intervalls
*/
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

/**
 * @function {setWinningEndscreen} this function sets the endscreen when the player 
 * wins shows the winning EndMask and stopps all Intervalls
 * @returns void
*/
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

/**
 * @function {startGame} this function starts the game and starts the win/loose checking Intervall
 * @returns void
 *  */
function startGame() {
    let dialog = document.getElementById('startDialog')
    dialog.style.display = "none";
    startscreen.hideStartScreen()
    world = new WorldClassExtention(canvas, Keyboard);
    renderControlButton();
    checkWinLooseIntervall = setInterval(checkWinLoose, 1000 / 20);
}


/**
 * @function {restartGame} here we initialize the game for restart, 
 * set up a new level and but all new movalbe objects as parameters in it and start the game instantly
 * @type {object} level1 the new level
 * @type {object} coins the new coins in the level
 * @type {object} bottles the new bottles in the level
 * @type {object} miniEnemies the new mini chicken in the level
 * @type {object} enemies the new chicken in the level
 * @type {object} clouds the new clouds in the level
 * @type {object} background the new background images are repeatedly used for a longer world
 * @type {object} endboss the new endboss in the game
 * @returns void*/
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
    world = new WorldClassExtention(canvas, Keyboard);
    renderControlButton();
    setTimeout(() => {
        checkWinLooseIntervall = setInterval(() => {
            checkWinLoose();
        }, 1000 / 20);;
    }, 500);
}

/**
 * @function {stopAllIntervall} this function stops all active intervals and clears the array with interval IDs
 * @returns void
 *  */
function stopAllIntervall() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * @function {backToStartScreen}  function takes the player back to the start screen - the same 
 * way as the user opens the game the first time but not play instantly
 * Allmost the same as the function start game
 * @returns void
 * */
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

/**
 * @function {endMaskForGame} this shows the end mask with three options for 
 * the game  (restart, back to start screen, info)
 * @returns void
 *  */
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

/**
 * @function {hideEndDialog} this function hides the end dialog if the user wants 
 * to reload the game or go back to the start screen
 * @returns void */
function hideEndDialog() {
    let end = document.getElementById('endDialog')
    end.classList.remove('visible')
}

/**
 * @function {renderControlButton} this function renders the control buttons for the handy/tablet Mode
 * @returns void */
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
    `}

/**
 * @function {renderSoundButton} this function renders the sound/mute button for the game in the right top corner
 * @returns void */
function renderSound_MuteButton() {
    let sound = document.getElementById('controlHudSound')
    sound.innerHTML += /*html */ `
    <div class="soundPanel" id="soundPanel">
    <img onclick="changeMuteStatus()" src="./img/muted_icon_ob.png">
    <img class="fullScreenButton" onclick="changeToFullscreen()" src="./img/full-screen_logo_ob.png">
    </div>
    `
}


        /**
         * @function {checkMuteStatus} here we check the mute status of the game by checking the local storage variable
         * @returns {boolean}
         *  */
        function checkMuteStatus() {
            if (localStorage.getItem('muteStatus') == 'true') {
            } else {
                playBackgroundMusic()
            }
        }

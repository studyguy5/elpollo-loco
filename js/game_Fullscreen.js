
/**
 * @function {changeToFullscreen} this function handles the fullscreen change event by toggling the fullscreen mode
 * @returns void */
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

/**
 * @type {HTMLCanvasElement} this variable is used in the fullscreen/reset fullscreen request function and catches the canvas of the document */
let elem = document.getElementById('canvaAria');


/**
 * @function {changeToFullscreen} this function changes the game to fullscreen mode or back to normal
 * @returns void */
function changeToFullscreen() {
    if (elem.requestFullscreen && !document.fullscreenElement) {
        openFullscreen(elem)
    } else {
        resetFullscreen(elem)
    }
}

/**
 * @function {openFullscreen} this function opens the fullscreen mode for various browsers
 * @returns void */
function openFullscreen() {
    if (elem.requestFullscreen && !document.fullscreenElement) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen && !document.fullscreenElement) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen && !document.fullscreenElement) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**
 * @function {resetFullscreen} this function resets the fullscreen mode for various browsers
 * @returns void */
function resetFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.webkitexitFullscreen && document.fullscreenElement) { /* Safari */
        document.exitFullscreen();
    } else if (elem.msRequestFullscreen && document.fullscreenElement) { /* IE11 */
        document.exitFullscreen();
    }

}


/**
 * @function {changeMuteStatus} here we toggle the img for the mute button, play or mute the 
 * background music and change the variable in local storage
 *  */
function changeMuteStatus() {
    let img = document.getElementById('soundPanel')
    let currentImg = img.querySelector('img');
    if (currentImg.src.includes('muted_icon')) {
        currentImg.src = './img/not_mute.png';
        playBackgroundMusic();
        localStorage.removeItem('muteStatus')
        localStorage.setItem('muteStatus', false)
    } else {
        currentImg.src = './img/muted_icon_ob.png'
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        localStorage.removeItem('muteStatus')
        localStorage.setItem('muteStatus', true)
    }
}

/**this is for UX purposes only
 * @function {stopBubbling} the event.stopPropagation() is used to prevent the event from bubbling up to the parent element
 * and is currently used for the info div to close via click outside the div
 * @returns void
 */
function stopBubbling(event) {
    event.stopPropagation();
}
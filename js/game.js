
let canvas;
let ctx;
let caracter = new Image();

function init(){
canvas = document.getElementById('gameCanvas')
ctx = canvas.getContext('2d');
caracter.src= '../img/2_character_pepe/2_walk/W-21.png';

setTimeout(() => {
    ctx.drawImage(caracter, 20, 300, 50, 150);
    
}, 2000);
}
/**
 * here we collect all Id's from the intervals we start in the code in order to animate the game
 * then if we restart the game or simply end the game, we need to stop all intervalls to restart it properly again
 * because otherwise the endboss would be still death
 * @type {number[]} array with all Id's
 * @type {function} setStoppableInterval the function who pushes all Id's into the array
 */

intervalIds = [];


function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);  // fn = deine anonyme Funktion
  intervalIds.push(id);
  return id;
}
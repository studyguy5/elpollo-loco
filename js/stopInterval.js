intervalIds = [];


function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);  // fn = deine anonyme Funktion
  intervalIds.push(id);
  return id;
}
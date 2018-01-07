function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}
var stopped = false;
function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }
  if (!stopped){
      fetch('/stop');
      stopped = true;
  }
  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[12])) {
      fetch('/forward');
      stopped = false;
  } else if (buttonPressed(gp.buttons[13])) {
      fetch('/backward');
      stopped = false;
  } else if (buttonPressed(gp.buttons[14])) {
      fetch('/left');
      stopped = false;
  } else if (buttonPressed(gp.buttons[15])) {
      fetch('/right');
      stopped = false;
  } else if (buttonPressed(gp.buttons[1])) {
      fetch('/twerk');
      stopped = false;
  }


  start = requestAnimationFrame(gameLoop);
}
window.onkeydown = function keyboard(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (!stopped){
      fetch('/stop');
      stopped = true;
    }
    if (code === 87) { //w key
        fetch('/forward');

    } else if (code === 83) { //s key
        fetch('/backward');

    } else if (code === 65) { //a key
        fetch('/left');

    } else if (code === 68) { //d key
        fetch('/right');

    }
};
gameLoop();

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function gameLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads) {
    return;
  }

  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[12])) {
      fetch('/forward')
  } else if (buttonPressed(gp.buttons[13])) {
      fetch('/backward')
  } else if (buttonPressed(gp.buttons[14])) {
      fetch('/left')
  } else if (buttonPressed(gp.buttons[15])) {
      fetch('/right')
  } else if (buttonPressed(gp.buttons[1])) {
      fetch('/twerk')
  }
  else {
      fetch('/stops')
  }


  start = requestAnimationFrame(gameLoop);
}
gameLoop()

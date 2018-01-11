var stopped = false;
var w, a, s, d;

function connect(callback) {
  ws = new WebSocket("ws://172.20.20.119:5000/cmd");
  ws.onopen = function(){console.log("Connected");callback();};
}

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
  stopper();
  var gp = gamepads[0];
  if (buttonPressed(gp.buttons[12])) {
      ws.send('/forward');
      stopped = false;
  } else if (buttonPressed(gp.buttons[13])) {
      ws.send('/backward');
      stopped = false;
  } else if (buttonPressed(gp.buttons[14])) {
      ws.send('/left');
      stopped = false;
  } else if (buttonPressed(gp.buttons[15])) {
      ws.send('/right');
      stopped = false;
  } else if (buttonPressed(gp.buttons[1])) {
      ws.send('/twerk');
      stopped = false;
  }

  start = requestAnimationFrame(gameLoop);
}
window.onkeydown = function keyboard(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 87) { //w key
        w = true;
        stopped = false;
    } else if (code === 83) { //s key
        s = true;
        stopped = false;
    } else if (code === 65) { //a key
        a = true;
        stopped = false;
    } else if (code === 68) { //d key
        d = true;
        stopped = false;
    }

};
window.onkeyup = function keyboard(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 87) { //w key
        w = false;
        stopped = false;
    } else if (code === 83) { //s key
        s = false;
        stopped = false;
    } else if (code === 65) { //a key
        a = false;
        stopped = false;
    } else if (code === 68) { //d key
        d = false;
        stopped = false;
    }
};
function keySender() {
    // Send command while key is true
    stopper();
    if (w) {
        ws.send('/forward');
    } else if (a) {
        ws.send('/left');
    } else if (s) {
        ws.send('/backward');
    } else if (d) {
        ws.send('/right');
    }
    setTimeout(stopper(), 500);
    start = requestAnimationFrame(keySender);
}
function stopper() {
    if (!stopped){
        ws.send('/stop');
        stopped = true;
    }
}
function CrashStop() {
    // Tries to stop crashing when active windows changes
    // not working as intended atm;
    w = false;
    a = false;
    s = false;
    d = false;
    stopped = false;
    stopper();

}

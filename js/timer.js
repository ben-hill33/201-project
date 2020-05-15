'use strict';

function timer(seconds) {
  var timeleft = seconds;
  var gameTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(gameTimer);
      document.getElementById('counter').textContent = ' Time\'s up!';
    } else {
      document.getElementById('counter').textContent = timeleft + ' seconds remaining';
    }
    timeleft--;
  }, 1000);
}
timer(30);//this invocation can be used for stretch goal for harder level with less time
// im thinking that we can use timer() in event handler for the enter button
document.addEventListener('DOMContentLoaded', function() {
  /* --------- DOM REFS ---------*/
  let body = document.querySelector('body');
  let wireBox = document.getElementById('wirebox');
  let resetBtn = document.getElementById('reset');
  let timer = document.getElementById('timer');

  /* --------- Game Logic Variables ------- */
  const STARTING_TIME = 30;
  let remainingTime = 0;
  let gameOver = false;
  let countdown = null; // will hold my countdown interval

  let wiresToCut = [];

  let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
  }

  /* ----- Event Listeners ------ */
  resetBtn.addEventListener('click', reset);
  wireBox.addEventListener('click', wireClick);

  function reset() {
    console.log("clicked reset");
    init()
  }

  function init() {
    remainingTime = STARTING_TIME;

    // set wires to cut
    for (const color in wireState) {
      let randoNum = Math.random();
      if (randoNum > 0.5) {
        wiresToCut.push(color)
      }
    }
    // FOR DEBUGGING
    console.log(wiresToCut)
    countdown = setInterval(updateClock, 1000)
    resetBtn.disabled = true;
  }

  function wireClick(e) {
    console.log("clicked wire box")
    console.log(e.target)
  }

  function updateClock() {
    console.log('clock updating')
  }
  
})
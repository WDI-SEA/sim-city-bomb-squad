var time, interval, siren;

document.addEventListener('DOMContentLoaded', function(){
  console.log('Dom got loaded');

  document.getElementById('reset').addEventListener('click', start);
});

function start(){
  addWireListeners();

  clearInterval(interval);

  time = 30;
  document.getElementById('timer').textContent = time;

  interval = setInterval(tick, 1000);

  this.textContent = 'Try Again!';

  document.getElementsByTagName('body')[0].classList.remove('exploded');
  document.getElementsByTagName('body')[0].classList.add('unexploded');

  document.getElementById('message').textContent = '';
  document.getElementById('timer').style.color = 'chartreuse';

  siren = document.getElementById('siren');
  siren.play();
}

function tick(){
  time -= 1;
  document.getElementById('timer').textContent = time;

  // Stress the user out by making red text when the time runs short!
  if(time === 3){
    document.getElementById('timer').style.color = 'red';
  }
  else if(time === 10){
    document.getElementById('timer').style.color = 'orange';
  }

  if(time <= 0){
    loseGame();
  }
}

function addWireListeners(){
  var wireImages = document.querySelectorAll('#box img');

  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].src = './img/uncut-' + wireImages[i].id + '-wire.png';
    // This decides whether wire should be cut or not
    wireImages[i].setAttribute('data-cut', (Math.random() > 0.5).toString());
    console.log(wireImages[i]);
    wireImages[i].addEventListener('click', clickWire);
  }

  // If all false, that's not a real game, reset!
  if(checkWin()){
    start();
  }
}

function removeWireListeners(){
  var wireImages = document.querySelectorAll('#box img');

  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].removeEventListener('click', clickWire);
  }
}

function clickWire(){
  this.src = './img/cut-' + this.id + '-wire.png';
  this.removeEventListener('click', clickWire);

  if(this.getAttribute('data-cut') === 'true'){
    this.setAttribute('data-cut', 'false');
    document.getElementById('buzz').play();

    if(checkWin()){
      winGame();
    }
  }
  else {
    loseGame();
  }
}

function checkWin(){
  var wireImages = document.querySelectorAll('#box img');

  for(var i = 0; i < wireImages.length; i++){
    if(wireImages[i].getAttribute('data-cut') === 'true'){
      return false;
    }
  }
  return true;
}

function stopGame(message){
  clearInterval(interval);

  removeWireListeners();

  siren.pause();

  document.getElementById('message').textContent = message;
}

function winGame(){
  stopGame('YAY, YOU SAVED US!!!');

  var cheer = document.getElementById('cheer');
  cheer.addEventListener('ended', function(){
    document.getElementById('success').play();
  });
  cheer.play();
}

function loseGame(){
  stopGame('You have failed this city.');

  document.getElementsByTagName('body')[0].classList.remove('unexploded');
  document.getElementsByTagName('body')[0].classList.add('exploded');

  document.getElementById('explode').play();
}

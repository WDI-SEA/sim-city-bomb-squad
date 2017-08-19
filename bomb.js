var time = 30; //My display in seconds
var interval;
var wireColors = ["blue", "green", "white", "red", "yellow"];
var wiresToCut = [];
var sirenSound;

document.addEventListener("DOMContentLoaded", function() {
  //Generate which wires should be cut
  generateWires();

  //Add a click event listener to each wire
  addAllEventListeners();

  //Add a click event listener for my reset button
  document.getElementById("reset").addEventListener("click", resetGame);

  //Start the timer!
  interval = setInterval(tick, 1000);

  //Start siren
  sirenSound = document.getElementById("siren");
  sirenSound.play();
});

function generateWires(){
  //Clear out the wiresToCut array
  wiresToCut = [];

  //Generate randomly which wires need cutting
  for(var i = 0; i < wireColors.length; i++){
    wiresToCut.push({ color: wireColors[i], cut: Math.random() > 0.5});
  }

  console.log("Wires created:", wiresToCut[0], wiresToCut[1], wiresToCut[2], wiresToCut[3], wiresToCut[4]);
}

function addAllEventListeners(){
  //Add a click event listener to each wire
  var wireImages = document.querySelectorAll("#box img");

  for(var i = 0; i < wireImages.length; i++){
    //add the click event listener
    wireImages[i].addEventListener("click", clickWire);
  }
}

function removeAllEventListeners(){
  //Add a click event listener to each wire
  var wireImages = document.querySelectorAll("#box img");

  for(var i = 0; i < wireImages.length; i++){
    //add the click event listener
    wireImages[i].removeEventListener("click", clickWire);
  }
}

function tick(){
  time -= 1;
  document.getElementById("timer").textContent = time;

  if(time <= 0){
    //stop the interval
    clearInterval(interval);

    //game over
    gameOver();
  }
}

function clickWire(){
  //Change the img src to the cut version of the wire
  this.src = "./img/cut-" + this.id + "-wire.png";

  //Check if wire should have been cut or not
  if(wireIsGood(this.id)){
    //play sound
    var electricSound = document.getElementById("electricity");
    electricSound.play();

    //Disallow further clicks
    this.removeEventListener("click", clickWire); //don't allow multiple clicks

    //Check for win condition
    if(doneCuttingWires()){
      clearInterval(interval);
      removeAllEventListeners();
      document.getElementById("title").style.display = "block";

      //Play win game sounds in order
      sirenSound = document.getElementById("siren");
      sirenSound.pause();

      var cheerSound = document.getElementById("cheer");
      var successSound = document.getElementById("success");

      cheerSound.addEventListener("ended", function(){
        successSound.play();
      });

      cheerSound.play();
    }
  }
  else {
    //uhoh - boom
    clearInterval(interval);
    gameOver();
  }
}

function wireIsGood(color){
  //Go through each wire
  for(var i = 0; i < wiresToCut.length; i++){
    //check if I'm looking at the right color
    if(color === wiresToCut[i].color){
      if(wiresToCut[i].cut){
        wiresToCut[i].cut = false;
        return true;
      }
      return false;
    }
  }
}

function doneCuttingWires(){
  //Check if no wires need to be cut (none have cut == true)
  for(var i = 0; i < wiresToCut.length; i++){
    if(wiresToCut[i].cut){
      return false;
    }
  }
  return true;
}

function gameOver(){
  //explode background
  //remove the unexploded class from the body and add the exploded class
  document.getElementsByTagName("body")[0].classList.remove("unexploded");
  document.getElementsByTagName("body")[0].classList.add("exploded");

  //Stop siren
  sirenSound = document.getElementById("siren");
  sirenSound.pause();

  var explodeSound = document.getElementById("explode");
  explodeSound.play();

  //Stop wires from being clicked on
  removeAllEventListeners();
}

function resetGame(){
  //Generate which wires should be cut
  generateWires();

  //Add a click event listener to each wire
  addAllEventListeners();

  //Reset wire images and background
  resetImages();

  //Reset the time and time display
  time = 30;
  document.getElementById("timer").textContent = time;
  document.getElementById("title").style.display = "none";

  //Clear and then restart the timer!
  clearInterval(interval);
  interval = setInterval(tick, 1000);

  //Reset Siren
  sirenSound = document.getElementById("siren");
  sirenSound.play();
}

function resetImages(){
  //Background
  document.getElementsByTagName("body")[0].classList.add("unexploded");
  document.getElementsByTagName("body")[0].classList.remove("exploded");

  //Wires
  var wireImages = document.querySelectorAll("#box img");

  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].src = "./img/uncut-" + wireImages[i].id + "-wire.png";
  }
}

var time, interval

document.addEventListener('DOMContentLoaded', function(){
  // Add event handler for start/reset button
  document.getElementById('reset').addEventListener('click', start)
})

function start(){
  // Start the siren; stop the success
  document.getElementById('siren').play()
  document.getElementById('success').pause()

  // Set the initial time AND display it to the user
  time = 30
  document.getElementById('timer').style.color = 'chartreuse'
  document.getElementById('timer').textContent = time

  // Change the button text to reset
  this.textContent = 'Restart Game'

  // Make sure unexploded background is showing
  document.getElementsByTagName('body')[0].classList.remove('exploded')
  document.getElementsByTagName('body')[0].classList.add('unexploded')

  // Display some text that shows while the game runs
  document.getElementById('message').textContent = 'Hurry up!'

  // Clear any previous intervals
  clearInterval(interval)

  // Start our timer
  interval = setInterval(tick, 500)

  // Remove old wire listeners, set up the new ones
  removeWireListeners()
  addWireListeners()
}

function tick(){
  // Subtract a second
  time -= 1

  // Display time left to the user
  document.getElementById('timer').textContent = time

  // Change color at certain time points
  if(time === 19){
    document.getElementById('timer').style.color = 'goldenrod'
  }
  else if(time === 9){
    document.getElementById('timer').style.color = 'crimson'
  }
  else if(time === 3){
    document.getElementById('timer').style.color = 'rebeccapurple'
  }
  else if(time <= 0){
    // Lose the game - ran out of time
    loseGame()
  }
}

function endGame(message){
  // Stop the timer
  clearInterval(interval)

  // Stop the siren sound
  document.getElementById('siren').pause()

  // Show message text
  document.getElementById('message').textContent = message

  // Remove ability to click on the wires
  removeWireListeners()

  // Change the reset button to say "Play Again" while the game is not running
  document.getElementById('reset').textContent = 'Play Again!'
}

function winGame(){
  // Disable restart button
  document.getElementById('reset').disabled = true

  // Call endGame to perform steps to stop game play
  endGame('❤ You\'re smart and talented and everyone loves you ❤')

  // Make the timer color happy again
  document.getElementById('timer').style.color = 'chartreuse'

  // Play the cheer sound, followed by the success music
  var yayCheer = document.getElementById('yay')
  yayCheer.addEventListener('ended', function(){
    // This code runs after the yay cheer has ended
    document.getElementById('success').play()
    document.getElementById('reset').disabled = false
  })
  yayCheer.play()
}

function loseGame(){
  // Call endGame to perform steps to stop game play
  endGame('You have failed the city! 🤦')

  // Play the explosion sound
  document.getElementById('explode').play()

  // Show explosion background
  document.getElementsByTagName('body')[0].classList.remove('unexploded')
  document.getElementsByTagName('body')[0].classList.add('exploded')
}

function addWireListeners(){
  // Grab all the img tags for the wires (into an array)
  var wireImages = document.querySelectorAll('#box img')

  // Loop through each wire
  for(var i = 0; i < wireImages.length; i++){
    // Make sure image is uncut
    wireImages[i].src = './img/uncut-' + wireImages[i].id + '-wire.png'

    // Assign (randomly) whether wire should be cut
    wireImages[i].setAttribute('data-cut', (Math.random() > 0.5).toString())

    // Add click event listener to wires to see if they are getting cut
    wireImages[i].addEventListener('click', cutWire)

    // Printing it out for cheater mode! :)
    console.log(wireImages[i])
  }

  // Handle situation with all good wires (auto-win)
  if(checkWinCondition()){
    // Oh look, we win
    winGame()

    // // Recursive call: function calls itself again to re-randomize the wires
    // // Hopefully, better luck next time!
    // addWireListeners()
  }
}

function removeWireListeners(){
  // Grab all the img tags for the wires (into an array)
  var wireImages = document.querySelectorAll('#box img')

  // Loop through each wire
  for(var i = 0; i < wireImages.length; i++){
    wireImages[i].removeEventListener('click', cutWire)
  }
}

function cutWire(){
  // Change image to cut
  this.src = './img/cut-' + this.id + '-wire.png'

  // Remove the event listener so we can't click over and over
  this.removeEventListener('click', cutWire)

  // Check if I was actually supposed to cut the wire
  if(this.getAttribute('data-cut') === 'true'){
    // Yes, I was supposed to cut it - play the buzz sound
    document.getElementById('buzz').play()

    // Make the data-cut attribute false so we don't think it still needs cut
    this.setAttribute('data-cut', 'false')

    // Check if I win the game
    if(checkWinCondition()){
      // Yay!
      winGame()
    }
  }
  else {
    // Uh-oh, I wasn't supposed to cut this one!
    loseGame()
  }
}

function checkWinCondition(){
  // Grab all the img tags for the wires (into an array)
  var wireImages = document.querySelectorAll('#box img')

  for(var i = 0; i < wireImages.length; i++){
    // If there are any wires left that need to be cut, win condition is NOT met
    if(wireImages[i].getAttribute('data-cut') === 'true'){
      return false
    }
  }

  return true
}











let time, interval

const cutWire = e => {
  // Change to the cut wire image
  e.target.src = `./img/cut-${e.target.id}-wire.png`

  // Remove event listener for wire click
  e.target.removeEventListener('click', cutWire)

  // Check whether the wire was good or bad to cut
  if (e.target.getAttribute('data-cut') === 'true') {
    // GOOD. Play buzz sound
    document.getElementById('buzz').play()

    // Change data-cut to false
    e.target.setAttribute('data-cut', 'false')

    // Check win condition
    if (checkWin()) {
      // I won!
      winGame()
    }
  }
  else {
    // BAD
    loseGame()
  }
}

const removeWireListeners = () => {
  // Grab all the wire images from the DOM
  let wireImages = document.querySelectorAll('#box img')

  // Loop through each image
  for (let i = 0; i < wireImages.length; i++) {
    wireImages[i].removeEventListener('click', cutWire)
  }
}

const addWireListeners = () => {
  // Grab all the wire images from the DOM
  let wireImages = document.querySelectorAll('#box img')

  // Loop through each image
  for (let i = 0; i < wireImages.length; i++) {
    // Image is the uncut version
    wireImages[i].src = `./img/uncut-${wireImages[i].id}-wire.png`

    // Decide whether wire should be cut
    let shouldBeCut = (Math.random() > 0.5).toString()
    wireImages[i].setAttribute('data-cut', shouldBeCut)

    // Add an event listener for clicks on each wire
    wireImages[i].addEventListener('click', cutWire)

    console.log(wireImages[i])
  }
}

const tick = () => {
  time -= 1
  document.getElementById('timer').textContent = time
  if (time === 19) {
    document.getElementById('timer').style.color = 'yellow'
  }
  else if (time === 9) {
    document.getElementById('timer').style.color = 'goldenrod'
  }
  else if (time === 3) {
    document.getElementById('timer').style.color = 'crimson'
  }
  else if (time <= 0) {
    // We ran out of time; LOSE THE GAME
    loseGame()
  }
}

const checkWin = () => {
  // Grab all the wire images from the DOM
  let wireImages = document.querySelectorAll('#box img')

  // Loop through each image
  for (let i = 0; i < wireImages.length; i++) {
    // If any wires are TRUE then I have not won the game (yet)
    if (wireImages[i].getAttribute('data-cut') === 'true') {
      return false
    }
  }

  // I went through the for loop and nothing made it exit; now, I know it must be true
  return true
}

const endGame = message => {
  // Stop the timer from ticking
  clearInterval(interval)

  // Make sure wires can't be clicked anymore
  removeWireListeners()

  // Stop the siren
  document.getElementById('siren').pause()

  // Set the message to tell the person they won/lost
  document.getElementById('message').textContent = message
}

const winGame = () => {
  // Do the stuff that win and loseGame functions have in common
  endGame('The city is saved... FOR NOW! Until next time!')

  let cheer = document.getElementById('cheer')
  cheer.addEventListener('ended', () => {
    document.getElementById('theme').play()
  })
  cheer.play()
}

const loseGame = () => {
  // Call end game function
  endGame('You have fail-')

  // Play the explosion sound
  document.getElementById('explode').play()

  // Change to explosion background
  document.getElementsByTagName('body')[0].classList.remove('unexploded')
  document.getElementsByTagName('body')[0].classList.add('exploded')
}

const start = () => {
  // Timer starts - set initial time + start the interval + update display
  time = 30
  clearInterval(interval)
  interval = setInterval(tick, 1000)
  document.getElementById('timer').style.color = 'chartreuse'
  document.getElementById('timer').textContent = time

  // Set the background to unexploded
  document.getElementsByTagName('body')[0].classList.remove('exploded')
  document.getElementsByTagName('body')[0].classList.add('unexploded')

  // Start the siren sound
  document.getElementById('theme').pause()
  document.getElementById('siren').play()

  // Change button to say "Restart Game"
  document.getElementById('start').textContent = 'Restart Game'

  // Set the hurry up message
  document.getElementById('message').textContent = '💣 HURRY! 😱😱😱'

  // Set up wires event listeners
  removeWireListeners()
  addWireListeners()
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start').addEventListener('click', start)
})

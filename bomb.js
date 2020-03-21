// Global Variables
let time, interval

// This function is called when the game is started
const startGame = () => {
    // Stop any previous timers
    clearInterval(interval)

    // Initialize time and ticker
    time = 30
    interval = setInterval(tick, 1000)

    // Add wire click event handlers
    // TODO: Remove old click events
    addWireClicks()

    // Display different text on the button
    document.getElementById('start').textContent = 'Restart!'

    // Display a message for actively playing the game
    document.getElementById('message').textContent = 'HURRY UP! AHH'

    // Make sure background is unexploded
    document.getElementsByTagName('body')[0].classList.remove('exploded')
    document.getElementsByTagName('body')[0].classList.add('unexploded')

    // Play the siren sound
    document.getElementById('siren').play()
}

const tick = () => {
    console.log('tick', time)
    time -= 1
    document.getElementById('timer').textContent = time
    if (time === 5) {
        document.getElementById('timer').style.color = 'crimson'
    }
    else if (time <= 0) {
        loseGame()
    }
}

const addWireClicks = () => {
    // Grab all the images of wires
    let wireImages = document.querySelectorAll('#box img')

    // Loop through each wire
    for (let i = 0; i < wireImages.length; i++) {
        // Assign the listener --> cutWire
        wireImages[i].addEventListener('click', cutWire)

        // Decide whether wire should be cut
        let shouldBeCut = (Math.random() > 0.5).toString() // "true" or "false"
        wireImages[i].setAttribute('data-cut', shouldBeCut)
        console.log(wireImages[i])

        // Ensure the uncut images
        wireImages[i].src = `./img/uncut-${wireImages[i].id}-wire.png`
    }
    
    // BONUS: Add error checking to make sure at least one wire needs to be cut
}

const removeWireClicks = () => {
    // Grab all the images of wires
    let wireImages = document.querySelectorAll('#box img')

    // Loop through each wire
    for (let i = 0; i < wireImages.length; i++) {
        // Assign the listener --> cutWire
        wireImages[i].removeEventListener('click', cutWire)
    }
}

const cutWire = (e) => {
    // Change the wire image to cut version
    e.target.src = `./img/cut-${e.target.id}-wire.png`

    // Remove the event listener
    e.target.removeEventListener('click', cutWire)

    // Determine if that was a good wire
    if (e.target.getAttribute('data-cut') === 'true') {
        // It was a good wire!
        document.getElementById('buzz').play()

        // Set data-cut attribute to false
        e.target.setAttribute('data-cut', 'false')

        // Check win condition
        if (checkWin()) {
            winGame()
        }
    }
    else {
        // Oh no it was a bad wire!
        loseGame()
    }
}

// Check if any wires are still left that need to be cut
// Yes --> False (we haven't won yet)
// No --> True (we win, no more wires to cut)
const checkWin = () => {
    // Grab all the images of wires
    let wireImages = document.querySelectorAll('#box img')

    // Looping through all the wire images
    for (let i = 0; i < wireImages.length; i++) {
        // If ANY wires are true, then return false
        if (wireImages[i].getAttribute('data-cut') === 'true') {
            return false // BREAKS out of loop and function
        }
    }

    // I got through the whole loop, nothing was "true"
    return true
}

const endGame = (message) => {
    // Stop the timer
    clearInterval(interval)

    // Stop the siren
    document.getElementById('siren').pause()

    // Display play again on the button
    document.getElementById('start').textContent = 'Play Again!'

    // Display a message for game status
    document.getElementById('message').textContent = message

    // Remove old click events
    removeWireClicks()
}

const winGame = () => {
    // Do stuff to end the game; stop timers, etc
    endGame('YOU WIN!')

    // Play the cheer sound, followed by the theme song
    let cheer = document.getElementById('cheer')
    cheer.addEventListener('ended', () => {
        document.getElementById('theme').play()
    })
    cheer.play()
}

const loseGame = () => {
    // Do stuff to end the game; stop timers, etc
    endGame('BOOM! You have failed!')
    
    // Change the background to the explosion
    document.getElementsByTagName('body')[0].classList.remove('unexploded')
    document.getElementsByTagName('body')[0].classList.add('exploded')

    // Play the explosion sound
    document.getElementById('explode').play()
}

document.getElementById('start').addEventListener('click', startGame)
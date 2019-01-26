console.log('loaded!');
// State variables
var startingSeconds = 29;
var remainingSeconds = 0;
var startingMilliseconds = 999
var remainingMilliseconds = 0
var gameOver = false;
var wiresToCut = [];

// Timer variables
var delay = null;
var timer = null;

var wiresCut = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false,
}


var endGame = function(win) {
    clearTimeout(delay);
    clearInterval(timer);
    gameOver = true;
    if(win) {
        // we won
        console.log('You saved the city! woot woot')
        document.querySelector('.timer-box').classList.add('green')
        document.querySelector('.timer-box').classList.remove('red')
    } else {
        // we lost
        console.log('BOOM!!!')
        document.body.classList.add('exploded')
        document.body.classList.remove('unexploded')
    }
}



function updateClock() {
    remainingMilliseconds--;
    let strMill = remainingMilliseconds.toString()
    let strSec = remainingSeconds.toString();
    while (strMill.length < 3) {
        strMill = "0" + strMill
    }
    if (remainingMilliseconds <= 0) {
        remainingSeconds--;
        strSec = remainingSeconds.toString()
        if (strSec.length === 1) {
            strSec = "0" + strSec
        }
        remainingMilliseconds = 999;
        if (remainingSeconds <= 0 && remainingMilliseconds <= 0) {
        endGame(false);
        }

    }
    document.querySelector('.timer-box p').textContent = `00:${strSec}:${strMill}`;
}

var initGame = function() {
    wiresToCut.length = 0;
    remainingSeconds = startingSeconds;
    remainingMilliseconds = startingMilliseconds;
    document.querySelector('.timer-box p').textContent = `00:${remainingSeconds}:${remainingMilliseconds}`;
    document.body.addEventListener('keydown', reset)
    for (let wireColor in wiresCut) {
        var rand = Math.random()
        if (rand > 0.5) {
            wiresToCut.push(wireColor)
        }
    }
    console.log(wiresToCut)



    timer = setInterval(updateClock, 1);

    

}

var cutWire = function() {
    if (!wiresCut[this.id] && !gameOver) {
        this.src = "img/cut-" + this.id + "-wire.png"
        wiresCut[this.id] = true;
        // Check for correct wire
        var wireIndex = wiresToCut.indexOf(this.id)
        if (wireIndex > -1) {
            console.log(this.id, "was correct")
            wiresToCut.splice(wireIndex, 1)
            if (wiresToCut.length === 0) {
                endGame(true)
            }
        } else {
            console.log(this.id, 'YOU LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOSE')
            delay = setTimeout(function() {
                endGame(false)}, 750)
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded");
    for (var wire in wiresCut) {
        console.log(wire)
        document.getElementById(wire).addEventListener('click', cutWire)
    }
    initGame()
})


document.getElementsByTagName('button')[0].addEventListener('click', reset)

function reset(event) {
    if (event.key === 'Enter' || event.type === 'click') {
        clearInterval(timer);
        clearTimeout(delay);
        gameOver = false;
        wiresToCut.length = 0;
        document.querySelector('.timer-box').classList.add('red')
        document.querySelector('.timer-box').classList.remove('green')
        document.body.classList.add('unexploded')
        document.body.classList.remove('exploded')

        for (wire in wiresCut) {
            let elem = document.querySelector(`#${wire}`)
            elem.src = "img/uncut-" + wire + "-wire.png"
            wiresCut[wire] = false;
        }
    
    
        initGame()
    }

}
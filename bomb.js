document.addEventListener("DOMContentLoaded", function(){
    
    //Dom refs
    let body = document.querySelector("body");
    let wirebox = document.getElementById("wirebox");
    let resetBtn = document.getElementById("reset");
    let timer = document.getElementById("timer");

    //game logic var

    const STARTING_TIME = 30;
    let remainingTime = 0;
    let gameOver = false;
    let countdown = null;

    let wiresToCut = [];
    
    let wireState = {
        blue: false,
        green: false,
        red: false,
        white: false,
        yellow: false
    }
    //event listenrs
    resetBtn.addEventListener("click", reset);
    wirebox.addEventListener("click", wireClick);

    function reset(){
        console.log("clicked reset")
        init()
    }
        

    function init() {
        remainingTime = STARTING_TIME;
        for (const color in wireState){
            let randoNum = Math.random();
            if (randoNum > 0.5){
            wiresToCut.push(color)
            }
        }
        console.log(wiresToCut)
        countdown = setInterval(updateClock, 1000)
        resetBtn.disabled = true;
    }
    

    function wireClick(e) {
        console.log("clicked wire box")
        console.log(e.target.id)
    }

    function updateClock(){
        remainingTime--;
        timer.textContent = "00:00:00" + remainingTime;
        if (remainingTime <= 0){
            endGame(false)
        }
    
    }
    function endGame(win){
        console.log("Win is " + win);
        
        clearInterval(countdown)
        gameOver = true;
        resetBtn.disabled = false;
        if (win){
            timer.classList.add("green");
        } else {
            body.classList.add("flat");
        }
    }



})

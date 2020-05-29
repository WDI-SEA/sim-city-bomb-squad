document.addEventListener("DOMContentLoaded", function(){
    
    //Dom refs
    let body = document.querySelector("body");
    let wirebox = document.getElementById("wirebox");
    let resetBtn = document.getElementById("reset");
    let timer = document.getElementById("timer");

    //game logic var

    const STARTING_TIME = 30;
    let remainingTime = 0;
    let gameOver = true;
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
        timer.classList.remove("green");
        body.classList.remove("flat");
        for(let wire in wireState){
            wireState[wire] = false;
        }
        wiresToCut = [];

        for (let i = 0; i < wirebox.children.length; i++){
            let color = wirebox.children[i].id;
            wirebox.children[i].src = "img/uncut-" + color + "-wire.png";
        }

        init()
    }
        

    function init() {
        remainingTime = STARTING_TIME;
        gameOver = false;
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
        
        console.log("you clicked " + e.target.id)
        let color = e.target.id;
        if (gameOver === false && wireState[color] === false){
            e.target.src = "img/cut-" + color + "-wire.png";
            wireState[color] = true;
            let wireIndex = wiresToCut.indexOf(color);
            if (wireIndex > -1){
            console.log("correct")
            wiresToCut.splice(wireIndex, 1);
                if (wiresToCut.length < 1){
                    endGame(true);
                }
            } else{
                console.log("bad news")
                endGame(false);
            }
        }
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

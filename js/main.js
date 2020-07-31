/*------Constants------*/
const kazoo = new Audio('audio/kazoo.wav');

/*------Variables------*/
let secretNum, guessList, isWinner, currentGuess;

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
const titleEl = document.querySelector('h1')

/*------Event Listeners------*/
resetBtn.addEventListener('click', function() {
    init();
});

guessBtn.addEventListener('click', function(){
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
})

/*------Functions------*/
//Init function sets all state variables for a new game.

init();

function init() {
    //easy way to remove all appended children from an element.
    // Reset the title class name when resetting game
    titleEl.className = '';
    messageEl.className = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
    render();
    console.log(secretNum);
}

function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
        
    } else if (guess === secretNum) {
        // Win scenario
        titleEl.className = 'animated bounce'
        messageEl.className = 'winner';
        isWinner = true;
        // Adding this single line of code will cause confetti to fall for 1.5 seconds on a correct guess!
        confetti.start(1500);
        setTimeout(function(){kazoo.play();},1000);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
        messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses! `
        } 
    } else if (guess < secretNum) {
            messageEl.className = 'low';
            messageEl.innerText = `${guess} is too low, please try again!`
            guessList.push(guess);
        // Guess too low
        
    } else {
        messageEl.className = 'high';
        messageEl.innerText = `${guess} is too high, please try again!`
        guessList.push(guess);
        // Guess too high
        
    }
    render(guess);
    }

    function render(guess) {
        //append child div to guessEl div based on whether our guess is higher or lower than secretNum
        if(guess === secretNum) {
            let div = document.createElement("div");
            div.innerText = guess;
            div.className = 'winner';
            guessesEl.appendChild(div);
        }
        else if (guess > secretNum) {
            //create new div then append to parent div
            let div = document.createElement("div");
            div.innerText = guess;
            div.className = 'high';
            guessesEl.appendChild(div);
        } else if (guess < secretNum) {
            //do things
            let div = document.createElement("div");
            div.innerText = guess;
            div.className = 'low';
            guessesEl.appendChild(div);
        }
    }


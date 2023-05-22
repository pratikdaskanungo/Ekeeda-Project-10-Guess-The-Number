let randomNumber = parseInt((Math.random()*100)+1);

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessbox');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.result');
const lower = document.querySelector('.lower');

const p = document.createElement('p');

let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

//Here I have added Eventlistner to submit button//
if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}
// here guess is a function where if the value is wrongly entered or higher or lower, alert box shows//
function validateGuess(guess){

    if(isNaN(guess)){
        alert('Please enter a valid number');
    }else if(guess < 1){
        alert('Please enter a number greater than 1!');
    }else if(guess > 100){
        alert('Please enter a number less than 100!');
    }else{
        previousGuesses.push(guess);
        //here is the number of tries exceeds 10, game over message displays//
        if(numGuesses === 11){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        }else{
            displayGuesses(guess);
            checkGuess(guess);
        }
    }
}

//here function checkGuess where if the value is correct or higher or lower message is displayed//
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber){
        displayMessage(`Too low! Try again`);
    }else if (guess > randomNumber){
        displayMessage(`Too high! Try again`);
    }
}

//function for number of guesses //
function displayGuesses(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses} `; 
}
//displays message if the number is higher or lower than the correct ans//
function displayMessage(message){
    lower.innerHTML = `<h1>${message}</h1>`
}

//function for end game//
function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', 'disabled');
    p.classList.add('button');
    p.innerHTML = `<h1 id="newGame">Start New Game</h1>`

    startOver.appendChild(p);
    playGame = false; 
    newGame();
}


//function for new game//
function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click',function(){
        randomNumber = parseInt((Math.random()*100)+ 1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lower.innerHTML = '';
        remaining.innerHTML = `${11-numGuesses} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}
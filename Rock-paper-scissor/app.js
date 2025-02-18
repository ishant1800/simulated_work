const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const scoreDisplay = document.getElementById('score'); // displaying score
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

let userScore = 0; 
let computerScore = 0;


possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id; 
  userChoiceDisplay.innerHTML = userChoice;
  generateComputerChoice(); 
  getResult(); 
  updateScore();
}));


function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) {
    computerChoice = 'rock';
  } else if (randomNumber === 2) {
    computerChoice = 'scissors';
  } else {
    computerChoice = 'paper';
  }
  computerChoiceDisplay.innerHTML = computerChoice; // Display computer's choice
}

// Function to determine the result and update the scores
function getResult() {
  if (computerChoice === userChoice) {
    result = 'It\'s a draw!';
  } else if (computerChoice === 'rock' && userChoice === 'paper') {
    result = 'You win!';
    userScore++; 
  } else if (computerChoice === 'rock' && userChoice === 'scissors') {
    result = 'You lost!';
    computerScore++; 
  } else if (computerChoice === 'paper' && userChoice === 'scissors') {
    result = 'You win!';
    userScore++; 
  } else if (computerChoice === 'paper' && userChoice === 'rock') {
    result = 'You lose!';
    computerScore++; 
  } else if (computerChoice === 'scissors' && userChoice === 'rock') {
    result = 'You win!';
    userScore++; // Increment user score
  } else if (computerChoice === 'scissors' && userChoice === 'paper') {
    result = 'You lose!';
    computerScore++; // Increment computer score
  }
  resultDisplay.innerHTML = result; // Display the result of the round
}

// Function to update the score
function updateScore() {
  scoreDisplay.innerHTML = `User: ${userScore} | Computer: ${computerScore}`; 
}

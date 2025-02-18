document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const result = document.querySelector('#result');
  const displayCurrentPlayer = document.querySelector('#current-player');
  const playerOneScoreElement = document.querySelector('#player-one-score');
  const playerTwoScoreElement = document.querySelector('#player-two-score');
  const timerElement = document.querySelector('#timer');
  
  let currentPlayer = 1;
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let countdown;
  const turnTime = 10; // Seconds
  let timeLeft = turnTime;

  const winningArrays = [
      // (Winning combinations are unchanged)
  ];

  function updateScores() {
      playerOneScoreElement.innerHTML = playerOneScore;
      playerTwoScoreElement.innerHTML = playerTwoScore;
  }

  function startTimer() {
      clearInterval(countdown);
      timeLeft = turnTime;
      timerElement.innerHTML = timeLeft;
      countdown = setInterval(() => {
          timeLeft -= 1;
          timerElement.innerHTML = timeLeft;
          if (timeLeft <= 0) {
              clearInterval(countdown);
              switchTurn();
          }
      }, 1000);
  }

  function switchTurn() {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      displayCurrentPlayer.innerHTML = currentPlayer;
      startTimer();
  }

  function checkBoard() {
      for (let y = 0; y < winningArrays.length; y++) {
          const square1 = squares[winningArrays[y][0]];
          const square2 = squares[winningArrays[y][1]];
          const square3 = squares[winningArrays[y][2]];
          const square4 = squares[winningArrays[y][3]];

          // Check for Player One Win
          if (
              square1.classList.contains('player-one') &&
              square2.classList.contains('player-one') &&
              square3.classList.contains('player-one') &&
              square4.classList.contains('player-one')
          ) {
              result.innerHTML = 'Player One Wins!';
              playerOneScore += 1;
              updateScores();
              clearInterval(countdown);
              return;
          }
          // Check for Player Two Win
          if (
              square1.classList.contains('player-two') &&
              square2.classList.contains('player-two') &&
              square3.classList.contains('player-two') &&
              square4.classList.contains('player-two')
          ) {
              result.innerHTML = 'Player Two Wins!';
              playerTwoScore += 1;
              updateScores();
              clearInterval(countdown);
              return;
          }
      }
  }

  for (let i = 0; i < squares.length; i++) {
      squares[i].onclick = () => {
          if (squares[i + 7]?.classList.contains('taken') && !squares[i].classList.contains('taken')) {
              if (currentPlayer === 1) {
                  squares[i].classList.add('taken');
                  squares[i].classList.add('player-one');
                  checkBoard();
                  currentPlayer = 2;
              } else if (currentPlayer === 2) {
                  squares[i].classList.add('taken');
                  squares[i].classList.add('player-two');
                  checkBoard();
                  currentPlayer = 1;
              }
              displayCurrentPlayer.innerHTML = currentPlayer;
              clearInterval(countdown); // Restart the timer for the next player
              startTimer();
          } else {
              alert('You can\'t go here!');
          }
      };
  }

  // Initialize scores and start the first player's timer
  updateScores();
  startTimer();
});

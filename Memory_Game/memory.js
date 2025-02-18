document.addEventListener('DOMContentLoaded', () => {
  // List all card options
  const cardArray = [
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let attemptsLeft = 2; // User gets 2 chances before resetting
  let flippedCards = []; // Store flipped but unmatched cards

  // Create the game board
  function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
          const card = document.createElement('img');
          card.setAttribute('src', 'images/blank.png');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      }
  }

  // Check for matches
  function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const optionOneId = cardsChosenId[0];
      const optionTwoId = cardsChosenId[1];

      if (optionOneId == optionTwoId) {
          alert('You clicked the same image!');
      } else if (cardsChosen[0] === cardsChosen[1]) {
          alert('You found a match!');
          cards[optionOneId].setAttribute('src', 'images/white.png');
          cards[optionTwoId].setAttribute('src', 'images/white.png');
          cards[optionOneId].removeEventListener('click', flipCard);
          cards[optionTwoId].removeEventListener('click', flipCard);
          cardsWon.push(cardsChosen);
          attemptsLeft = 2; // Reset attempts on a correct match
          flippedCards = []; // Clear flipped cards
      } else {
          attemptsLeft--;
          if (attemptsLeft === 0) {
              alert('No match! Resetting all flipped cards.');
              // Reset all unmatched flipped cards
              flippedCards.forEach(card => {
                  card.setAttribute('src', 'images/blank.png');
              });
              flippedCards = []; // Clear flipped cards list
              attemptsLeft = 2; // Reset attempts
          } else {
              alert(`Try again! You have ${attemptsLeft} chance(s) left.`);
          }
      }

      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = cardsWon.length;

      if (cardsWon.length === cardArray.length / 2) {
          resultDisplay.textContent = 'Congratulations! You found them all!';
      }
  }

  // Flip the card
  function flipCard() {
      let cardId = this.getAttribute('data-id');
      if (!cardsChosenId.includes(cardId) && !flippedCards.includes(this)) {
          cardsChosen.push(cardArray[cardId].name);
          cardsChosenId.push(cardId);
          this.setAttribute('src', cardArray[cardId].img);
          flippedCards.push(this); // Track flipped cards
          if (cardsChosen.length === 2) {
              setTimeout(checkForMatch, 500);
          }
      }
  }

  createBoard();
});

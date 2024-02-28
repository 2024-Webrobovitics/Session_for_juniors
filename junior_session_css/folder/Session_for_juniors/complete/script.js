'use strict';
//Selecting elements
const score_1_EL = document.getElementById('score--0');
const score_2_EL = document.getElementById('score--1');
console.log(score_1_EL)
const diceEL = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
score_1_EL.textContent = 0;
score_2_EL.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  //Generating random number
  if (playing) {
    let random_number = Math.trunc(1 + Math.random() * 6);
    diceEL.classList.remove('hidden');
    const dice = random_number;
    //Displaying dice
    diceEL.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      scores[activePlayer] -= 3;
      if (scores[activePlayer] < 0) scores[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player score and set it to zero
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player score > 100 if yes player wins else switch player
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  // location.reload();
  playing = true;
  diceEL.classList.add('hidden');
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 1;
  activePlayer = 0;
  score_1_EL.textContent = 0;
  score_2_EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
  }
  if (player1El.classList.contains('player--winner')) {
    player1El.classList.remove('player--winner');
  }
  if (player1El.classList.contains('player--active')) {
    player1El.classList.remove('player--active');
  }
  if (!player0El.classList.contains('player--active')) {
    player0El.classList.add('player--active');
  }
});

'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scoreEl1 = document.querySelector('#score--0');
const scoreEl2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const scores = [];
let currentScore = 0;
let activePlayer = 0;

// Starting condition
scoreEl1.textContent = 0;
scoreEl2.textContent = 0;
diceEl.classList.add('hidden');

//Rolling functionality
btnRoll.addEventListener('click', function () {
  //generate a random number
  const dice = Math.trunc(Math.random() * 6) + 1;

  //display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  console.log(dice);

  //check for rolled 1 : if true , player
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
  //switch to next
  else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});

btnHold.addEventListener('click', function () {
  if (activePlayer === 0) {
    scoreEl1.textContent = Number(scoreEl1.textContent) + currentScore;
    if (Number(scoreEl1.textContent) >= 100) {
      document.querySelector(`.player--0`).classList.add('player--winner');
      document.querySelector('.player--0').remove('player--active');
      btnRoll.disabled = true;
      btnHold.disabled = true;
      diceEl.classList.add('hidden');
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  } else {
    scoreEl2.textContent = Number(scoreEl2.textContent) + currentScore;
    if (Number(scoreEl2.textContent) >= 100) {
      document.querySelector('.player--1').classList.add('player--winner');
      document.querySelector('.player--1').classList.remove('player--active');
      btnRoll.disabled = true;
      btnHold.disabled = true;
      diceEl.classList.add('hidden');
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

document.querySelector('.btn--new').addEventListener('click',function(){
    location.reload();
})

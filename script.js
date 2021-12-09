'use strict';

// game elements
const diceImg = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// game state
let won = false;
let turn = 0;
const players = [
  {
    currentScore: 0,
    totalScore: 0,
    playerEl: document.querySelector('.player--0'),
    curEl: document.getElementById('current--0'),
    totalEl: document.getElementById('score--0'),
  },
  {
    currentScore: 0,
    totalScore: 0,
    playerEl: document.querySelector('.player--1'),
    curEl: document.getElementById('current--1'),
    totalEl: document.getElementById('score--1'),
  },
];

function newGame() {
  diceImg.classList.add('hidden');
  if (turn % 2 === 1) {
    nextTurn();
  }
  players.forEach(player => {
    player.currentScore = 0;
    player.totalScore = 0;
    player.curEl.textContent = 0;
    player.totalEl.textContent = 0;
    player.playerEl.classList.remove('player--winner');
  });
  won = false;
}

function rollDice() {
  if (won) return;
  const roll = Math.trunc(Math.random() * 6) + 1;
  diceImg.setAttribute('src', `dice-${roll}.png`);
  diceImg.classList.remove('hidden');

  const player = players[turn % 2];
  if (roll === 1) {
    player.currentScore = 0;
    nextTurn();
  } else {
    player.currentScore += roll;
  }
  player.curEl.textContent = player.currentScore;
}

function hold() {
  if (won) return;
  const player = players[turn % 2];
  player.totalScore += player.currentScore;
  player.totalEl.textContent = player.totalScore;
  player.currentScore = 0;
  player.curEl.textContent = player.currentScore;
  if (player.totalScore >= 100) {
    player.playerEl.classList.add('player--winner');
    won = true;
  } else {
    nextTurn();
  }
}

function nextTurn() {
  players[turn++ % 2].playerEl.classList.remove('player--active');
  players[turn % 2].playerEl.classList.add('player--active');
}

newGame();
newGameBtn.addEventListener('click', newGame);
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);

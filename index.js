'use strict';

// ================= VARIABLES =================

let scores = [0, 0, 0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

let timeLeft = 10;
let timer;

// ================= ELEMENTS =================

const diceEl = document.querySelector('.dice');

const currentScoreEl = document.querySelector('.currentScore');

const timerEl = document.querySelector('.timer');

const btnRoll = document.querySelector('.roll');

const btnHold = document.querySelector('.hold');

const btnNew = document.querySelector('.newGame');

const players = document.querySelectorAll('.player');

const scoreEls = document.querySelectorAll('.score');

const winModal = document.querySelector('.winModal');

const winPlayer = document.querySelector('.winPlayer');

// ================= TIMER =================

function startTimer() {
  clearInterval(timer);

  timeLeft = 10;

  timerEl.textContent = timeLeft;

  timerEl.style.color = '#00ff9d';

  timer = setInterval(function () {
    timeLeft--;

    timerEl.textContent = timeLeft;

    if (timeLeft <= 3) {
      timerEl.style.color = '#ff2e63';
    }

    if (timeLeft === 0) {
      switchPlayer();
    }
  }, 1000);
}

// ================= SWITCH PLAYER =================

function switchPlayer() {
  clearInterval(timer);

  currentScore = 0;

  currentScoreEl.textContent = 0;

  players[activePlayer].classList.remove('activePlayer');

  activePlayer = (activePlayer + 1) % 4;

  players[activePlayer].classList.add('activePlayer');

  startTimer();
}

// ================= ROLL DICE =================

btnRoll.addEventListener('click', function () {
  if (!playing) return;

  startTimer();

  const dice = Math.trunc(Math.random() * 6) + 1;

  // change image
  diceEl.src = `dice-${dice}.png`;

  // rotate animation
  diceEl.animate(
    [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
    {
      duration: 300,
    },
  );

  if (dice !== 1) {
    currentScore += dice;

    currentScoreEl.textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// ================= HOLD =================

btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;

  scoreEls[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;

    clearInterval(timer);

    players[activePlayer].style.background =
      'linear-gradient(135deg,#FFD700,#FFA500)';

    winPlayer.textContent = activePlayer + 1;

    winModal.classList.remove('hidden');
  } else {
    switchPlayer();
  }
});

// ================= NEW GAME =================

btnNew.addEventListener('click', init);

// ================= INIT =================

function init() {
  clearInterval(timer);

  scores = [0, 0, 0, 0];

  currentScore = 0;

  activePlayer = 0;

  playing = true;

  currentScoreEl.textContent = 0;

  diceEl.src = 'dice-1.png';

  players.forEach(function (player) {
    player.classList.remove('activePlayer');

    player.style.background = 'rgba(255,255,255,.15)';
  });

  scoreEls.forEach(function (score) {
    score.textContent = 0;
  });

  players[0].classList.add('activePlayer');

  winModal.classList.add('hidden');

  startTimer();
}

// ================= START GAME =================

init();

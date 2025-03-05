'use strict';

import Game from '../modules/Game.class.js'; // Враховуємо шлях

const game = new Game();

const startBtn = document.querySelector('.start');

startBtn.addEventListener('click', game.start);

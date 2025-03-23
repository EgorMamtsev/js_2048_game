'use strict';

export default class Game {
  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {
    this.board = initialState; // зберігаємо початковий стан гри
    this.status = 'Game not started';
  }

  moveLeft() {
    let scoreIncreases = 0;

    for (let row = 0; row < this.board.length; row++) {
      let newRow = this.board[row].filter((num) => num !== 0);

      for (let i = 0; i < newRow.length; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] += newRow[i + 1];
          newRow[i + 1] = 0;
          scoreIncreases += newRow[i];
        }
      }

      newRow = newRow.filter((num) => num !== 0);

      while (newRow.length < 4) {
        newRow.push(0);
      }

      this.board[row] = newRow;
    }

    if (scoreIncreases > 0) {
      this.getScore(scoreIncreases);
    }

    this.checkWin();
    this.addNewCell();
    this.render();
    this.checkLoss();
  }
  moveRight() {
    let scoreIncreases = 0;

    for (let row = 0; row < this.board.length; row++) {
      let newRow = this.board[row].filter((num) => num !== 0);

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1]) {
          newRow[i] += newRow[i - 1];
          newRow[i - 1] = 0;
          scoreIncreases += newRow[i];
        }
      }

      newRow = newRow.filter((num) => num !== 0);

      while (newRow.length < 4) {
        newRow.unshift(0);
      }
      this.board[row] = newRow;
    }

    if (scoreIncreases > 0) {
      this.getScore(scoreIncreases);
    }

    this.checkWin();
    this.addNewCell();
    this.render();
    this.checkLoss();
  }
  moveUp() {
    let scoreIncreases = 0;

    for (let col = 0; col < 4; col++) {
      const newCol = [];

      for (let row = 0; row < 4; row++) {
        if (this.board[row][col] !== 0) {
          newCol.push(this.board[row][col]);
        }
      }

      for (let i = 0; i < newCol.length; i++) {
        if (newCol[i] === newCol[i + 1]) {
          newCol[i] += newCol[i + 1];
          newCol[i + 1] = 0;
          scoreIncreases += newCol[i];
        }
      }

      while (newCol.length < 4) {
        newCol.push(0);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = newCol[row];
      }
    }

    if (scoreIncreases > 0) {
      this.getScore(scoreIncreases);
    }
    this.checkWin();
    this.addNewCell();
    this.render();
    this.checkLoss();
  }
  moveDown() {
    let scoreIncreases = 0;

    for (let col = 0; col < 4; col++) {
      let newCol = [];

      for (let row = 3; row >= 0; row--) {
        // cпробуй збирати масив з зверху вниз а не знизу вверх
        //  а перевірку на складання зроби з іншої сторони
        if (this.board[row][col] !== 0) {
          newCol.push(this.board[row][col]);
        }
      }

      for (let i = newCol.length - 1; i > 0; i--) {
        if (newCol[i] === newCol[i - 1]) {
          newCol[i] += newCol[i - 1];
          newCol[i - 1] = 0;
          scoreIncreases += newCol[i];
        }
      }

      newCol = newCol.filter((num) => num !== 0);

      while (newCol.length < 4) {
        newCol.unshift(0);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = newCol[row];
      }
    }

    if (scoreIncreases > 0) {
      this.getScore(scoreIncreases);
    }
    this.checkWin();
    this.addNewCell();
    this.render();
    this.checkLoss();
  }

  getScore(points) {
    const scoreField = document.querySelector('.game-score');

    this.score = (this.score || 0) + points; // Уникнення NaN
    scoreField.textContent = this.score;
  }
  getState() {
    return this.board;
  }
  getStatus() {
    return this.status;
  }
  start() {
    this.changeStartBtn();
  }
  restart() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.getScore(0);

    this.render();
  }

  getAllCoordinates() {
    const coordinates = [];

    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === 0) {
          coordinates.push([row, col]);
        }
      }
    }

    return coordinates;
  }

  addTwoRandomCells() {
    const emtyCells = this.getAllCoordinates();

    emtyCells.sort(() => Math.random() - 0.5);

    const [first, second] = emtyCells.slice(0, 2);

    if (Math.random() < 0.1) {
      this.board[first[0]][first[1]] = 4;
    } else {
      this.board[first[0]][first[1]] = 2;
    }

    if (Math.random() < 0.1) {
      this.board[second[0]][second[1]] = 4;
    } else {
      this.board[second[0]][second[1]] = 2;
    }
  }

  render() {
    const cells = document.querySelectorAll('.game-field tbody td');
    const flat = this.board.flat();

    cells.forEach((cell, index) => {
      if (flat[index] !== 0) {
        cell.textContent = flat[index];
      } else {
        cell.textContent = '';
      }
    });

    this.setSellsColor();
  }

  addNewCell() {
    const emptyCells = this.getAllCoordinates();

    if (emptyCells.length > 0) {
      const randomCoordd =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const randomValue = Math.random();
      const [row, col] = randomCoordd;

      if (randomValue < 0.1) {
        this.board[row][col] = 4;
      } else {
        this.board[row][col] = 2;
      }
    } else {
    }
  }

  checkWin() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 2048) {
          alert('You Win');

          return true;
        }
      }
    }

    return false;
  }

  checkLoss() {
    if (!this.hasLevalMoves) {
      alert('you lost');
    }
  }

  hasLevalMoves() {
    return (
      this.canMoveLeft() ||
      this.canMoveRight() ||
      this.canMoveDown() ||
      this.canMoveUp()
    );
  }

  canMoveLeft() {
    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) {
        if (this.board[row][col] !== 0) {
          if (
            this.board[row][col - 1] === 0 ||
            this.board[row][col] === this.board[row][col - 1]
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  canMoveRight() {
    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) {
        if (this.board[row][col] !== 0) {
          if (
            this.board[row][col + 1] === 0 ||
            this.board[row][col] === this.board[row][col + 1]
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  canMoveUp() {
    for (let col = 0; col < 4; col++) {
      for (let row = 1; row < 4; row++) {
        if (this.board[row][col] !== 0) {
          if (
            this.board[row - 1][col] === 0 ||
            this.board[row][col] === this.board[row - 1][col]
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  canMoveDown() {
    for (let col = 0; col < 4; col++) {
      for (let row = 2; row >= 0; row--) {
        if (this.board[row][col] !== 0) {
          if (
            this.board[row + 1][col] === 0 ||
            this.board[row][col] === this.board[row + 1][col]
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  changeStartBtn() {
    const startBt = document.querySelector('.start');

    if (this.getStatus() === 'Game not started') {
      this.status = 'On game';
      startBt.textContent = 'Restart';
      startBt.style.backgroundColor = '#f87474';
      startBt.style.fontSize = '18px';

      this.addTwoRandomCells();
      this.render();

      return;
    }

    if (this.getStatus() === 'On game') {
      this.status = 'Game not started';
      startBt.textContent = 'Start';
      startBt.style.backgroundColor = 'green';

      this.restart();
    }
  }

  setSellsColor() {
    const cells = document.querySelectorAll('td');

    cells.forEach((cell) => {
      const value = Number(cell.textContent);

      switch (value) {
        case 2:
          cell.style.backgroundColor = '#fbf8ef';
          break;
        case 4:
          cell.style.backgroundColor = '#ede0c8';
          break;
        case 8:
          cell.style.backgroundColor = '#f2b179';
          break;
        case 16:
          cell.style.backgroundColor = '#f59563';
          break;
        case 32:
          cell.style.backgroundColor = '#f67c5f';
          break;
        case 64:
          cell.style.backgroundColor = '#f65e3b';
          break;
        case 128:
          cell.style.backgroundColor = '#edcf72';
          break;
        case 256:
          cell.style.backgroundColor = '#edcc61';
          break;
        case 512:
          cell.style.backgroundColor = '#edc850';
          break;
        case 1024:
          cell.style.backgroundColor = '#edc53f';
          break;
        case 2048:
          cell.style.backgroundColor = '#edc22e';
          break;
        default:
          cell.style.backgroundColor = '#d6cdc4'; // Колір порожніх клітинок
          cell.textContent = ''; // Щоб порожні клітинки були чистими
          break;
      }
    });
  }
}

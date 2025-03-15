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
  }

  moveLeft() {
    for (let row = 0; row < this.board.length; row++) {
      let newRow = this.board[row].filter((num) => num !== 0);

      for (let i = 0; i < newRow.length; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] += newRow[i + 1];
          newRow[i + 1] = 0;
        }
      }

      newRow = newRow.filter((num) => num !== 0);

      while (newRow.length < 4) {
        newRow.push(0);
      }

      this.board[row] = newRow;
    }
    this.addNewCell();
    this.render();
  }
  moveRight() {
    for (let row = 0; row < this.board.length; row++) {
      let newRow = this.board[row].filter((num) => num !== 0);

      for (let i = newRow.length - 1; i > 0; i--) {
        if (newRow[i] === newRow[i - 1]) {
          newRow[i] += newRow[i - 1];
          newRow[i - 1] = 0;
        }
      }

      newRow = newRow.filter((num) => num !== 0);

      while (newRow.length < 4) {
        newRow.unshift(0);
      }
      this.board[row] = newRow;
    }
    this.addNewCell();
    this.render();
  }
  moveUp() {
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
        }
      }

      while (newCol.length < 4) {
        newCol.push(0);
      }

      for (let row = 0; row < 4; row++) {
        this.board[row][col] = newCol[row];
      }
    }
    this.addNewCell();
    this.render();
  }
  moveDown() {
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
    this.addNewCell();
    this.render();
  }

  getScore() {}
  getState() {
    return this.board;
  }
  getStatus() {}
  start() {
    this.addTwoRandomCells();
    this.render();
  }
  restart() {}

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

    this.board[first[0]][first[1]] = 2;
    this.board[second[0]][second[1]] = 2;
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
  }

  addNewCell() {
    const emptyCells = this.getAllCoordinates();

    if (emptyCells.length > 0) {
      const randomCoordd =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const [row, col] = randomCoordd;

      this.board[row][col] = 2;
    } else {
    }
  }
}

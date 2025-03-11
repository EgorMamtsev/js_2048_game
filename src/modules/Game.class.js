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

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  getScore() {}
  getState() {}
  getStatus() {}
  start() {}
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

  addTwoAtStart() {
    this.getAllCoordinates();
  }
}

'use strict';
/* eslint-disable no-useless-constructor */
// прибери коментар і додай логіку конструктора далі
export default class Game {
  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {}
  /* eslint-disable no-useless-constructor */

  moveLeft() {}
  moveRight() {}
  moveUp() {}
  moveDown() {}

  getScore() {}
  getState() {}
  getStatus() {}
  start() {
    const fieldsCollection = document.querySelectorAll('td.field-cell');

    fieldsCollection.forEach((cell) => {
      cell.textContent = '';
    });

    const randomIndexes = new Set();

    while (randomIndexes.size < 2) {
      randomIndexes.add(Math.floor(Math.random() * fieldsCollection.length));
    }

    const randomCells = [...randomIndexes].map(
      (index) => fieldsCollection[index],
    );

    randomCells.forEach((cell) => {
      cell.textContent = '2';
    });
  }
  restart() {}
}

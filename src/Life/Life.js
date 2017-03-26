import React from 'react';
import {randomBool} from '../Util'
import Style from './Life.less';


export default class Life extends React.Component {

  constructor() {
    super();

    this.boardInfo = {
      rows: 100,
      columns: 100,
    };

    this.state = {
      board: this.getSeedBoard('sparse'),
      loopInterval: null,
    };
  }

  getSeedBoard(population) {
    let probability = null;
    if (population === 'sparse') {
      probability = 'low';
    } else if (population === 'crowded') {
      probability = 'high';
    }

    let newBoard = [];
    for (let i = 0; i < this.boardInfo.rows; i++) {
      let newColumn = [];
      for (let j = 0; j < this.boardInfo.columns; j++) {
        newColumn.push(randomBool(probability));
      }
      newBoard.push(newColumn);
    }
    return newBoard;
  }

  renderBoard() {
    const rows = [];
    for (let i = 0; i < this.boardInfo.rows; i++) {

      const column = [];
      for (let j = 0; j < this.boardInfo.columns; j++) {

        column.push(
          <div
            key={i + '-' + j}
            className={
              [
                Style.column,
                this.state.board[i][j] ? Style.alive : Style.dead
              ].join(' ')
            }
          >
          </div>
        )
      }
      rows.push(
        <div
          key={i}
          className={Style.row}
        >
          {column}
        </div>
      );
    }

    return rows;
  }

  calculateNextState() {
    const nextBoard = [];
    for (let i = 0; i < this.boardInfo.rows; i++) {
      let nextColumn = [];
      for (let j = 0; j < this.boardInfo.columns; j++) {
        nextColumn.push(this.shouldTileLiveOrDie(i, j));
      }
      nextBoard.push(nextColumn);
    }
    return nextBoard;
  }

 /**
   * Determines whether or not the cell at index row, column is should be alive
   * or dead at the next iteration.
   *
   * @method shouldTileLiveOrDie
   * @param {Number} row - row index of the cell to be determined.
   * @param {Number} column - column index of the cell to be determined.
   * @return {Boolean} - true if the cell should be alive, false otherwise.
   */
  shouldTileLiveOrDie(row, column) {
    // Count up living cells in the set of eight surrounding cells.
    let count = 0;
    if (this.cellIsAlive(row-1, column-1)) {
      count++;
    }
    if (this.cellIsAlive(row-1, column)) {
      count++;
    }
    if (this.cellIsAlive(row-1, column+1)) {
      count++;
    }
    if (this.cellIsAlive(row, column-1)) {
      count++;
    }
    if (this.cellIsAlive(row, column+1)) {
      count++;
    }
    if (this.cellIsAlive(row+1, column-1)) {
      count++;
    }
    if (this.cellIsAlive(row+1, column)) {
      count++;
    }
    if (this.cellIsAlive(row+1, column+1)) {
      count++;
    }

    let shouldLive;
    if (this.cellIsAlive(row, column)) {
      if (count < 2 || count > 3) {
        shouldLive = false;
      } else {
        shouldLive = true;
      }
    } else {
      if (count === 3) {
        shouldLive = true;
      } else {
        shouldLive = false;
      }
    }
    return shouldLive;
  }

  /**
   * Checks if a cell is alive. If cell is out of bounds, it is considered dead.
   * @method checkTile
   * @param {Number} row - row index of the cell to be checked.
   * @param {Number} column - column index of the cell to be checked.
   * @return {Boolean} - true if the cell is alive, false if dead or out of bounds.
   */
  cellIsAlive(row, column) {
    let alive;
    try {
      alive = this.state.board[row][column];
    } catch(error) {
      alive = false;
    }
    return alive;
  }

  renderPlayButton() {
    const togglePause = (event) => {
      if (!this.state.loopInterval) {
        const interval = setInterval(() => {
          this.setState({board: this.calculateNextState()});
        });
        this.setState({loopInterval: interval});
      } else {
        clearInterval(this.state.loopInterval);
        this.setState({loopInterval: null});
      }
    };

    let buttonText = this.state.loopInterval ? 'Pause' : 'Play';

    return (
      <div
        className={Style.playButton}
        onClick={togglePause}
      >
        <p>{buttonText}</p>
      </div>
    )
  }

  render() {
    const board = this.renderBoard()
    const playButton = this.renderPlayButton()
    return (
      <div className={Style.Life}>
        {board}
        {playButton}
      </div>
    )
  }
}

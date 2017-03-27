// @flow

import React from 'react';
import {randomBool} from '../Util'
import './Life.styl';
import Cell from './Cell';


type LifePropsType = {
  numRows: number,
  numColumns: number,
  seedDensity: string,
};

type LifeStateType = {
  board: Array<Array<boolean>>,
  loopIntervalId: ?number;
};

export default class Life extends React.Component {

  static instance: Life;

  props: LifePropsType;
  state: LifeStateType;

  constructor(props: LifePropsType) {
    super(props);

    this.state = {
      board: this.getSeedBoard('sparse'),
      loopIntervalId: null,
    };
  }

  getSeedBoard() {
    const {
      numRows,
      numColumns,
      seedDensity,
    } = this.props;

    let probability = null;
    if (seedDensity === 'sparse') {
      probability = 'low';
    } else if (seedDensity === 'crowded') {
      probability = 'high';
    }

    let newBoard = [];
    for (let i = 0; i < numRows; i++) {
      let newColumn = [];
      for (let j = 0; j < numColumns; j++) {
        newColumn.push(randomBool(probability));
      }
      newBoard.push(newColumn);
    }
    return newBoard;
  }

  renderBoard() {
    const {
      numRows,
      numColumns,
    } = this.props;

    const rows = [];
    for (let i = 0; i < numRows; i++) {

      const column = [];
      for (let j = 0; j < numColumns; j++) {
        column.push(
          <Cell
            key={i+'-'+j}
            alive={this.state.board[i][j]}
          />
        )
      }

      rows.push(
        <div
          key={i}
          className='row'
        >
          {column}
        </div>
      );
    }

    return rows;
  }

  calculateNextState() {
    const {
      numRows,
      numColumns,
    } = this.props;

    const nextBoard = [];
    for (let i = 0; i < numRows; i++) {
      let nextColumn = [];
      for (let j = 0; j < numColumns; j++) {
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
   * @param {number} row - row index of the cell to be determined.
   * @param {number} column - column index of the cell to be determined.
   * @return {boolean} - true if the cell should be alive, false otherwise.
   */
  shouldTileLiveOrDie(row: number, column: number) {
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
   *
   * @method checkTile
   * @param {number} row - row index of the cell to be checked.
   * @param {number} column - column index of the cell to be checked.
   * @return {boolean} - true if the cell is alive, false if dead or out of
   *     bounds.
   */
  cellIsAlive(row: number, column: number) {
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
      if (!this.state.loopIntervalId) {
        const loopIntervalId = setInterval(() => {
          this.setState({board: this.calculateNextState()});
        });
        this.setState({loopIntervalId: loopIntervalId});
      } else {
        clearInterval(this.state.loopIntervalId);
        this.setState({loopIntervalId: null});
      }
    };

    let buttonText = this.state.loopIntervalId ? 'Pause' : 'Play';

    return (
      <div
        className='playButton'
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
      <div className='life'>
        {board}
        {playButton}
      </div>
    )
  }
}

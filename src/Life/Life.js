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
      board: this.getSeedBoard(),
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
      let currentColumn = [];
      for (let j = 0; j < this.boardInfo.columns; j++) {
        currentColumn.push(randomBool(probability));
      }
      newBoard.push(currentColumn);
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
            key={j}
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

  render() {
    const board = this.renderBoard()

    return (
      <div className={Style.Life}>
        {board}
      </div>
    )
  }
}

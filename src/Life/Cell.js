// @flow

import React from 'react';
import './Cell.styl';

type CellPropsType = {
  alive: boolean,
};

export default function Cell(props: CellPropsType): React.Element<*> {

  const {alive} = props;

  return (
    <div
      className={
        [
          'cell',
          alive ? 'alive' : 'dead',
        ].join(' ')
      }
    />
  );
}

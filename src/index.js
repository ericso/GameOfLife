import React from "react";
import ReactDOM from "react-dom";
import Life from "Life";


const lifeProps = {
  numRows: 100,
  numColumns: 100,
  seedDensity: 'sparse',
}

ReactDOM.render(
  <Life
    {...lifeProps}
  />,
  document.getElementById("react-app"),
);

if(module.hot) {
  module.hot.accept();
}

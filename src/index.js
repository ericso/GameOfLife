import React from "react";
import ReactDOM from "react-dom";
import Life from "Life";


ReactDOM.render(<Life />, document.getElementById("react-app"));

if(module.hot) {
  module.hot.accept();
}

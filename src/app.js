"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import SnakeContainer from './board';

// Modify the size and speed of the game.
const boardParams = {
  width: 50,
  height: 50,
  delay: 100,
};

ReactDOM.render(
  <SnakeContainer {...boardParams} />,
  document.getElementById('app')
);
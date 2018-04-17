"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import SnakeContainer from './game';

// Modify the size and speed of the game.
const boardParams = {
  width: 20,
  height: 20,
  delay: 100,
};

ReactDOM.render(
  <SnakeContainer {...boardParams} />,
  document.getElementById('app')
);
"use strict";

import React from 'react';
import Board from "./components/board";
import { Snake } from './snake';
import { moveHandler } from './moves';

export default class SnakeContainer extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      delay: props.delay,
      board: [],
      moveInterval: null,
      currentDirection: null
    };
    this.moveSet = {
      left: () => this.handleMove(Snake.head.position.row, Snake.head.position.column - 1),
      up: () => this.handleMove(Snake.head.position.row - 1, Snake.head.position.column),
      right: () => this.handleMove(Snake.head.position.row, Snake.head.position.column + 1),
      down: () => this.handleMove(Snake.head.position.row + 1, Snake.head.position.column)
    }
  }

  componentDidMount() {
    this.buildBoard();

    const keyHash = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    const validMoves = {
      left: ['down', 'up'],
      up: ['left', 'right'],
      right: ['down', 'up'],
      down: ['left', 'right']
    };

    // todo: ignore moving backwards    
    document.onkeydown = (e) => {
      if(validMoves[this.state.currentDirection].includes(keyHash[e.keyCode])) {
        this.state.currentDirection = keyHash[e.keyCode];
      }
    };
  }

  handleMove(row, column) {
    if(row < 0 || column < 0 || row >= this.state.height || column >= this.state.width) {
      alert('crashed!');
      this.resetGame();      
    } else {
      this.setSnakeHead(this.state.board, row, column);
      this.setState({ board: this.state.board });
    }    
  }

  buildBoard() {
    const board = [...Array(this.state.height)].map((_, i) => this.buildRow());
    this.setSnakeHead(board);
    this.setState({ board });
  }

  buildRow() {    
    return [...Array(this.state.width)].map((_, i) => {
      return { occupant: false };
    });
  }

  setSnakeHead(board, row = 0, column = 0) {
    // previous position becomes tail
    const previousRow = Snake.head.position.row || 0;
    const previousColumn = Snake.head.position.column || 0;    
    board[previousRow][previousColumn].occupant = Snake.next;
    
    board[row][column].occupant = Snake.head;
    Snake.head.position = { row, column };
  }

  resetGame() {
    this.buildBoard();
    // todo: randomize food, reset score etc
    clearInterval(this.state.moveInterval);
  }

  startGame() {
    this.state.currentDirection = 'right';
    this.state.moveInterval = setInterval(() => {
      this.moveSet[this.state.currentDirection]()
    }, this.state.delay);
  }

  render() {    
    return (      
      <div>
        <button onClick={this.startGame.bind(this)}>Start</button>
        <Board board={this.state.board} />
      </div>
    );
  }
}
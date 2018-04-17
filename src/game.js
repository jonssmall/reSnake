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
      currentDirection: 'right',
      food: {
        food: true,
        position: {
          row: 5,
          column: 5
        }
      }
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

    // todo: backwards bug caused by moving 2 directions before time interval. 
    document.onkeydown = e => {
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
      this.setSnake(this.state.board, Snake.head, { row, column });
      this.setState({ board: this.state.board });
    }    
  }

  buildBoard() {
    const board = [...Array(this.state.height)].map((_, i) => this.buildRow());        
    this.placeFood(board);
    this.setSnake(board, Snake.head, { row: 2, column: 3 });
    this.setState({ board });
  }

  buildRow() {    
    return [...Array(this.state.width)].map((_, i) => ({ occupant: false }) );
  }
  
  setSnake(board, snakeSegment, newPosition) {        
    const previousPosition = snakeSegment.position;    
    board[newPosition.row][newPosition.column].occupant = snakeSegment;
    snakeSegment.position = newPosition;
    if (snakeSegment.next) {
      this.setSnake(board, snakeSegment.next, previousPosition);
    } else {
      board[previousPosition.row][previousPosition.column].occupant = null;
    }
  }

  resetGame() {
    Snake.resetSnake();
    this.buildBoard();
    // todo: randomize food, reset score etc
    clearInterval(this.state.moveInterval);
  }

  // todo: disable start button to prevent double interval
  startGame() {
    this.state.currentDirection = 'right';
    this.state.moveInterval = setInterval(() => {
      this.moveSet[this.state.currentDirection]()
    }, this.state.delay);
  }

  // randomly drop food on a cell where the snake is not.
  placeFood(board) {    
    const cells = board.reduce((acc, row) => [...acc, ...row], []);
    const unoccupied = cells.filter(c => !c.occupant);
    unoccupied[Math.floor(Math.random()*unoccupied.length)].occupant = {food: true};
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
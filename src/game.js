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
      board: []
    };
  }

  componentDidMount() {
    this.buildBoard();

    const moveSet = {
      37: () => this.handleMove(Snake.head.position.row, Snake.head.position.column - 1),
      38: () => this.handleMove(Snake.head.position.row - 1, Snake.head.position.column),
      39: () => this.handleMove(Snake.head.position.row, Snake.head.position.column + 1),
      40: () => this.handleMove(Snake.head.position.row + 1, Snake.head.position.column)
    };

    document.onkeydown = (e) => {
      if([37,38,39,40].includes(e.keyCode)) {        
        moveSet[e.keyCode]();
      }
    };
  }

  handleMove(row, column) {
    this.setSnakeHead(this.state.board, row, column);
    this.setState({ board: this.state.board });
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
  
  render() {    
    return (
      <div>
        <Board board={this.state.board} />
      </div>
    );
  }
}
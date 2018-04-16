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
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          this.setSnakeHead(this.state.board, Snake.head.position.row, --Snake.head.position.column);
          this.setState({ board: this.state.board });
          break;
        case 38:
          this.setSnakeHead(this.state.board, --Snake.head.position.row, Snake.head.position.column);
          this.setState({ board: this.state.board });
          break;
        case 39:
          this.setSnakeHead(this.state.board, Snake.head.position.row, ++Snake.head.position.column);
          this.setState({ board: this.state.board });
          break;
        case 40:
          this.setSnakeHead(this.state.board, ++Snake.head.position.row, Snake.head.position.column);
          this.setState({ board: this.state.board });
          break;
      }
    };
  }

  buildBoard() {
    const board = [...Array(this.state.height)].map((_, i) => this.buildRow());
    this.setSnakeHead(board);
    this.setState({ board });
  }

  buildRow() {    
    return [...Array(this.state.width)].map((_, i) => {
      return { occupant: false }
    });
  }

  setSnakeHead(board, row = 0, column = 0) {       
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
"use strict";
import React from 'react';
import Board from "./components/board";
import { Snake } from './snake';

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
    debugger; 
    board[row][column].occupant = Snake.head;    
  }  
  
  render() {
    console.log(this.state.board);
    return (
      <div>
        <Board board={this.state.board} />
      </div>
    );
  }
}
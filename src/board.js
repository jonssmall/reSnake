"use strict";
import React from 'react';

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

  buildBoard() {    
    const board = [...Array(this.state.height)].map((_, i) => this.buildRow());
    this.setState({ board });
  };

  buildRow() {    
    return [...Array(this.state.width)].map((_, i) => {
      return 'O';
    });
  };
  
  render() {
    this.buildBoard();
    return (
      <div>
        {JSON.stringify(this.state.board)}
      </div>
    )
  }
}
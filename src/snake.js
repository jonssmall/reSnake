'use strict';

const tail = {
  next: null,
  position: {
    row: 0,
    column: 2
  }
};

const body = {
  next: tail,
  position: {
    row: 1,
    column: 2
  }
};

const head = {
  next: body,
  position: {
    row: 2,
    column: 2
  }
};

export const Snake = { 
  head,
  resetSnake: function() {
    this.head = {      
      next: null,
      position: {
        row: 2,
        column: 2
      }
    }
  }
};
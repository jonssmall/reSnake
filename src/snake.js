'use strict';

function makeHead() {
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

  return head;
}

export const Snake = { 
  head: makeHead(),
  resetSnake: function() {
    this.head = makeHead();
  }
};
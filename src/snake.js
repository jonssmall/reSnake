'use strict';

// some sort of linked list

const head = {
  previous: null,
  // next: tail
  next: null,
  position: {
    row: null,
    column: null
  }
};

const tail = {
  previous: head,
  next: null
};

export const Snake = { head };
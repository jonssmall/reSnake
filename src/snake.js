'use strict';

// some sort of linked list

const head = {
  previous: null,
  next: tail
};

const tail = {
  previous: head,
  next: null
};

export const Snake = { head };
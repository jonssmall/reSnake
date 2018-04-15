const grid = {
  rows: 10,
  columns: 10
};

const snake = {
  headPosition: {
    row: 0,
    column: 9
  },
  moveRight() {
    if (++this.headPosition.column >= grid.columns) {
      console.log('CRASHED!');
    } else {
      drawBoard();
    }
  }
};

const board = makeBoard(grid);

function makeBoard(grid) {
  return [...Array(grid.rows).keys()].map(r => {
    return [...Array(grid.columns).keys()].fill('O');
  });
}

function drawBoard() {
  board.forEach(r => {
    r.fill('O');
  });
  board[snake.headPosition.row][snake.headPosition.column] = 'X';
}

snake.moveRight();
// snake.moveRight();
// snake.moveRight();
// snake.moveRight();

drawBoard();
console.log(board);
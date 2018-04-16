// todo: sensible import exports 

export function moveHandler(keyCode) {
  switch (keyCode) {
    case 37:
      alert('left');
      break;
    case 38:
      alert('up');
      break;
    case 39:
      alert('right');
      moveRight();
      break;
    case 40:
      alert('down');
      break;
  }
}

function moveRight() {
  
}
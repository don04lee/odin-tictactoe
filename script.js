const gameBoard = (() => {
  let container = document.getElementById('container');
  const board = document.createElement('div');
  board.classList.add('board');
  
  const createBoard = () => {
    for(let i = 0; i < 3; i++) {
      let row = document.createElement('div');
      row.classList.add('row');
      for(let j = 0; j < 3; j++) {
        let cell = document.createElement('div');
        cell.textContent = '';
        cell.style.height = `200px`;
        cell.style.width = `200px`;
        cell.classList.add('cell');
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
    container.appendChild(board);
  }

  return {
    createBoard,
  }
})();

gameBoard.createBoard();

const displayController = (() => {
  
})();

const playerFactory = () => {

};
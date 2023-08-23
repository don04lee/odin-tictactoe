const gameBoard = (() => {

  let board = ["", "", "", "", "", "", "", "", ""];
  const endLogic = [[0, 1, 2], 
                    [3, 4, 5], 
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]]

  const getBoard = () => {
    return board;
  }

  const getBoardIdx = (idx) => {
    return board[idx];
  }

  const setBoard = (cell, player) => {
    board[cell.id] = player;
  }

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  function checkStatus() {
    for(let i = 0; i < endLogic.length; i++) {
      if(getBoardIdx(endLogic[i][0]).length !== 0 && getBoardIdx(endLogic[i][1]).length !== 0 && getBoardIdx(endLogic[i][2]).length !== 0) {
        if(getBoardIdx(endLogic[i][0]) === getBoardIdx(endLogic[i][1]) & getBoardIdx(endLogic[i][1]) === getBoardIdx(endLogic[i][2])) {  
          return true;
        }
      }
    }
    return false;
  }

  function checkEnd() {
    for(let i = 0; i < board.length; i++) {
      if(board[i].length == 0) {
        return false;
      }
    }
    return true;
  }

  return {
    getBoard,
    getBoardIdx,
    setBoard,
    resetBoard,
    checkStatus,
    checkEnd,
  }
})();

const gameController = (() => {

  let player = true;
  const cells = document.querySelectorAll('.cell');
  const popup = document.getElementById('popup');
  const endMessage = document.getElementById('endMessage');
  const resetButton = document.getElementById('resetButton');

  cells.forEach(cell => {
    cell.addEventListener('click', function() {
      if(player && gameBoard.getBoardIdx(cell.id) == '') {
        cell.textContent = '0';
        player = !player;
        gameBoard.setBoard(cell, '0');
      }
      else if((!player) && gameBoard.getBoardIdx(cell.id).length == 0) {
        cell.textContent = 'X';
        player = !player;
        gameBoard.setBoard(cell, 'X');
      }
      if(gameBoard.checkStatus()) {
        endGame();
        playerWin();
      }
      else if(gameBoard.checkEnd()) {
        endGame();
        drawGame();
      }
    });
  })

  resetButton.addEventListener('click', function() {
    resetGame();
  });

  function playerWin() {

    if(!player) {
      endMessage.textContent = 'Player 0 Wins!';
    }
    else {
      endMessage.textContent = 'Player X Wins!';
    }

    popup.classList.add('open-popup');
  }

  function drawGame() {
    endMessage.textContent = 'It\'s a draw!';
    popup.classList.add('open-popup');
  }

  function endGame() {
    cells.forEach(cell => {
      cell.classList.add('disabled');
    })

    popup.appendChild(resetButton);
  }

  function resetGame() {
    gameBoard.resetBoard();
    cells.forEach(cell => {
      cell.classList.remove('disabled');
      cell.textContent = "";
    })
    popup.classList.remove('open-popup');
  }

  return {
    playerWin,
    drawGame,
    endGame,
    resetGame,
  }

})();

const game = gameController;
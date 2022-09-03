function createPlayer(name, symbol, turn) {
  return { name, symbol, turn };
}

const gameController = (() => {
  const gameboard = new Array(9).fill('');
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const clearGameboard = () => {
    gameboard.fill('', 0);
  };

  const updateGameboard = (index, symbol) => {
    gameboard.splice(index, 1, symbol);
  };

  const checkResult = () => {};

  return { gameboard, winConditions, clearGameboard, updateGameboard };
})();

const interface = (() => {
  const startGameModal = document.querySelector('#start-game-modal');
  const startGameForm = document.querySelector('#start-game-form');
  const gameboardWrapper = document.querySelector('#gameboard-wrapper');
  const gameboardTurn = document.querySelector('#gameboard-turn');
  const gameboard = document.querySelector('#gameboard');
  const gameboardTile = document.querySelectorAll('#gameboard-tile');
  const playerOneInput = document.querySelector('#player-one');
  const playerTwoInput = document.querySelector('#player-two');

  const playerOne = createPlayer('p1', 'x', true);
  const playerTwo = createPlayer('p2', 'o', false);

  const updateName = (first, second) => {
    playerOne.name = first;
    playerTwo.name = second;
  };

  const changeTurn = () => {
    playerOne.turn === true
      ? (playerOne.turn = false)
      : (playerOne.turn = true);
    playerTwo.turn === true ? (playerTwo.turn = false) : playerTwo.turn = true;
  };

  const displaySymbol = (tile, tileIndex) => {
    if (playerOne.turn === true) {
      if (gameController.gameboard[tileIndex] !== '') return;
      gameController.gameboard[tileIndex] = 'x';
      tile.innerHTML = '<img src="img/x-svgrepo-com.svg" alt="letter x">';
      changeTurn();
    } else if (playerTwo.turn === true) {
      if (gameController.gameboard[tileIndex] !== '') return;
      gameController.gameboard[tileIndex] = 'o';
      tile.innerHTML = '<img src="img/letter-o-svgrepo-com.svg" alt="letter o">';
      changeTurn();
    }
  };

  const displayTurn = (p1, p2) => {
    if (p1.turn === true) {
      gameboardTurn.textContent = `${p1.name}'s turn`;
    } else {
      gameboardTurn.textContent = `${p2.name}'s turn`;
    }
  };

  const clearTile = () => {
    gameboardTile.forEach(tile => {
      tile.innerHTML = ''
    })
  };

  startGameForm.addEventListener('submit', () => {
    updateName(playerOneInput.value, playerTwoInput.value);
    displayTurn(playerOne, playerTwo);
    startGameForm.reset();
    startGameModal.style.display = 'none';
    gameboardWrapper.style.display = 'flex';
  });

  gameboardTile.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      const tile = e.target;
      const tileIndex = e.target.dataset.index;
      displaySymbol(tile, tileIndex);
      displayTurn(playerOne, playerTwo);
      console.log(tileIndex);
    });
  });
})();

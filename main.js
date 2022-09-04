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

  const checkResult = () => {
    let result = null
    const xArray = gameboard
      .map((element, index) => {
        if (element === 'x') {
          return index;
        }
      })
      .filter((element) => element !== undefined);
    const oArray = gameboard
      .map((element, index) => {
        if (element === 'o') {
          return index;
        }
      })
      .filter((element) => element !== undefined);
    if (
      gameboard.filter((element) => element.length > 0).length ===
      gameboard.length
    ) {
      result = 'draw';
    } else {
      winConditions.forEach((condition) => {
        if (condition.every((element) => xArray.includes(element))) {
          result = 'x';
        } else if (condition.every((element) => oArray.includes(element))) {
          result =  'o';
        }
      });
    }
    return result
  };

  return {
    gameboard,
    clearGameboard,
    updateGameboard,
    checkResult,
  };
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
  const endGameModal = document.querySelector('#end-game-modal');
  const endGameResult = document.querySelector('#end-game-result');
  const newRoundButton = document.querySelector('#new-round-button');
  const resetGameButton = document.querySelector('#reset-game-button');

  const playerOne = createPlayer('p1', 'x', true);
  const playerTwo = createPlayer('p2', 'o', false);

  const updateName = (first, second) => {
    playerOne.name = first;
    playerTwo.name = second;
    startGameForm.reset();
  };

  const changeTurn = () => {
    playerOne.turn === true
      ? (playerOne.turn = false)
      : (playerOne.turn = true);
    playerTwo.turn === true
      ? (playerTwo.turn = false)
      : (playerTwo.turn = true);
  };

  const displaySymbol = (tile, tileIndex) => {
    if (playerOne.turn === true) {
      if (gameController.gameboard[tileIndex] !== '') return;
      gameController.updateGameboard(tileIndex, playerOne.symbol);
      tile.innerHTML = '<img src="img/x-svgrepo-com.svg" alt="letter x">';
      changeTurn();
    } else if (playerTwo.turn === true) {
      if (gameController.gameboard[tileIndex] !== '') return;
      gameController.updateGameboard(tileIndex, playerTwo.symbol);
      tile.innerHTML =
        '<img src="img/letter-o-svgrepo-com.svg" alt="letter o">';
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

  const displayResult = () => {
    switch(gameController.checkResult()) {
      case 'x':
        gameboardWrapper.style.display = 'none'
        endGameModal.style.display = 'flex'
        endGameResult.textContent = `${playerOne.name} wins!`
        break;
      case 'o':
        gameboardWrapper.style.display = 'none'
        endGameModal.style.display = 'flex'
        endGameResult.textContent = `${playerTwo.name} wins!`
        break;
      case 'draw':
        gameboardWrapper.style.display = 'none'
        endGameModal.style.display = 'flex'
        endGameResult.textContent = `It's a draw!`
        break;
    }
  }

  const clearBoardDisplay = () => {
    gameboardTile.forEach((tile) => {
      tile.innerHTML = '';
    });
  };

  startGameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    startGameModal.style.display = 'none';
    gameboardWrapper.style.display = 'flex';
    updateName(playerOneInput.value, playerTwoInput.value);
    displayTurn(playerOne, playerTwo);
  });

  gameboardTile.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      const tile = e.target;
      const tileIndex = e.target.dataset.index;
      displaySymbol(tile, tileIndex);
      displayTurn(playerOne, playerTwo);
      displayResult()
      console.log(tileIndex);
    });
  });

  newRoundButton.addEventListener('click', () => {
    clearBoardDisplay();
    gameController.clearGameboard();
    gameboardWrapper.style.display = 'flex';
    endGameModal.style.display = 'none';
  })

  resetGameButton.addEventListener('click', () => {
    clearBoardDisplay()
    gameController.clearGameboard();
    startGameModal.style.display = 'flex';
    endGameModal.style.display = 'none';
    playerOne.turn = true;
    playerTwo.turn = false;
    displayTurn(playerOne, playerTwo);
  })
})();

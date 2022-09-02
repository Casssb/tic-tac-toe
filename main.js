function createPlayer(name, symbol) {
  return { name, symbol };
}

const gameController = (() => {
  const gameboard = new Array(9).fill("");
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

  const clearArray = () => {
    gameboard.fill("", 0)
  }

  return { gameboard, winConditions, clearArray};
})();

const interface = (() => {
  const startGameModal = document.querySelector('#start-game-modal');
  const startGameForm = document.querySelector('#start-game-form');
  const gameboard = document.querySelector('#gameboard');
  const playerOneInput = document.querySelector('#player-one').value;
  const playerTwoInput = document.querySelector('#player-two').value;

  startGameForm.addEventListener('submit', () => {
    startGameModal.style.display = 'none';
    gameboard.style.display = 'grid';
  })
})();

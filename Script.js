const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const endScreen = document.getElementById('endScreen');
const endMessage = document.getElementById('endMessage');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleMove(index));
    boardElement.appendChild(cell);
  });
}

function handleMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  createBoard();

  if (checkWinner()) {
    showEndScreen(`🎉 Player ${currentPlayer} Wins! 🎉`);
    party.confetti(document.body, { count: party.variation.range(100, 150) });
    gameActive = false;
  } else if (!board.includes("")) {
    showEndScreen("😮 It's a Draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function showEndScreen(message) {
  endMessage.textContent = message;
  endScreen.style.display = "block";
}

function startNewGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  endScreen.style.display = "none";
  createBoard();
}

function resetGame() {
  startNewGame();
}

// Initialize
createBoard();

const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const result = document.getElementById('result');
const turnIndicator= document.getElementById('turnIndicator');

let currentPlayer = "X";
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard(){
    for(let i = 0; i < 9; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    }
}

function handleClick(event){
    const index = event.target.dataset.index;
    if(boardState[index] !== null || checkWinner()){
        return;
    }
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if(checkWinner()){
        //If player won the game when he clicked on the cell
        result.textContent = `${currentPlayer} win!`;
        result.style.color = "gold";
    }
    else if(boardState.every((cell) => cell !== null)){
        //If all cells are filled and there is no winner therefore draw
        result.textContent = `DRAW!!`;
        result.style.color = "white";
        turnIndicator.textContent = "";
    }
    else{
        //game can continue
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }
}

function checkWinner(){
    return winningCombinations.some((combination) =>{
        return combination.every((index) => boardState[index] === currentPlayer);
    })
}

function resetGame(){
    boardState.fill(null);
    currentPlayer = "X";
    Array.from(board.children).forEach((cell) => (cell.textContent = ""));
    result.textContent = "";
    turnIndicator.textContent = "X's turn";
}

resetButton.addEventListener('click', resetGame);

// Initialise the game
createBoard();
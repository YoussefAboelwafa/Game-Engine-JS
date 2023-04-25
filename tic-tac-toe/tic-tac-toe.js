
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status-text");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");
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
let winCombo = [0, 0, 0];
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
startBtn.addEventListener("click", initializeGame);


function initializeGame() {
    running = true;
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    let parentElement = startBtn.parentNode;
    parentElement.removeChild(startBtn);
}
function cellClick() {
    const cellIndex = this.getAttribute("cellIndex");
    if (gameState[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWin();
}
function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}
function checkWin() {
    let roundWon = false;
    
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = gameState[condition[0]];
        const cellB = gameState[condition[1]];
        const cellC = gameState[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            winCombo[0] = condition[0];
            winCombo[1] = condition[1];
            winCombo[2] = condition[2];
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins !`;
        console.log(winCombo);
        document.getElementById(winCombo[0]).style.color = "#f00";
        document.getElementById(winCombo[1]).style.color = "#f00";
        document.getElementById(winCombo[2]).style.color = "#f00";
        running = false;
    }
    else if (!gameState.includes("")) {
        running = false;
        statusText.textContent = `Draw !`
    }
    else {
        changePlayer();
    }

}
function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    document.getElementById(winCombo[0]).style.color = "#000";
    document.getElementById(winCombo[1]).style.color = "#000";
    document.getElementById(winCombo[2]).style.color = "#000";
}

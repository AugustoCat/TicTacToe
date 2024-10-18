const player1 = document.getElementById('player1Name');
const player2 = document.getElementById('player2Name');
const textTurn = document.getElementById('turno');
const restartBtn = document.getElementById('restartButton');
const winningMessage = document.getElementById('winningMessage')
const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'o';
const cellsElements = document.querySelectorAll('.cell');
let currentPlayer = PLAYER_X_CLASS; 

let player1Name = 'Player 1';
let player2Name = 'Player 2';

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

player1.addEventListener('input', updatePlayerNames);
player2.addEventListener('input', updatePlayerNames);
updatePlayerNames();

cellsElements.forEach(cell => {
    cell.addEventListener('click', placeMarker);
});

function placeMarker(ev){
    const cell = ev.currentTarget;
    cell.classList.add('marked');
    if (cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)) {
        return; // cell already marked, do nothing and leave the function
    }
    
    cell.classList.add(currentPlayer); //add player class (X or O)

    if (checkWinner()) {
        console.log(currentPlayer + " wins!");
        cellsElements.forEach(cell => {
            cell.classList.add('marked')
            cell.removeEventListener('click', placeMarker);
        });
    } else if (checkDraw()) {
        winningMessage.innerText = "It's a draw!";
        return;
    } else {
        currentPlayer = currentPlayer === PLAYER_X_CLASS ? PLAYER_O_CLASS : PLAYER_X_CLASS;
        updatePlayerNames();
    }
}

function checkWinner() {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const cellA = cellsElements[a];
        const cellB = cellsElements[b];
        const cellC = cellsElements[c];

        if (cellA.classList.contains(currentPlayer) &&
            cellB.classList.contains(currentPlayer) &&
            cellC.classList.contains(currentPlayer)) {
                cellA.classList.add('win')
                cellB.classList.add('win')
                cellC.classList.add('win')
                winningMessage.innerText = `${currentPlayer === PLAYER_X_CLASS ? player1Name : player2Name} Wins!`;
                return true;
        }
    }
    return false;
}

function checkDraw(){ 
    let markedCells=0;
    cellsElements.forEach(cell => {
        if(cell.classList.contains('marked')){
            markedCells++
        }
    })
    if (markedCells === 9){
        winningMessage.classList.add('show')
        return true;
    }
    return false;
}

restartBtn.addEventListener('click',restart)

function restart() {
    cellsElements.forEach(cell => {
        cell.classList.remove('marked', 'x', 'o', 'win');
        cell.addEventListener('click', placeMarker);
    });
    currentPlayer = PLAYER_X_CLASS;
    winningMessage.innerText = '';
    winningMessage.classList.remove('show');
    updatePlayerNames()
}

function updatePlayerNames() {
    player1Name = player1.value.trim() || 'Player 1'; 
    player2Name = player2.value.trim() || 'Player 2';  

    if (currentPlayer === PLAYER_X_CLASS) {
        textTurn.innerText = `${player1Name}'s Turn (${currentPlayer.toUpperCase()})`;  
    } else {
        textTurn.innerText = `${player2Name}'s Turn (${currentPlayer.toUpperCase()})`;  
    }
}



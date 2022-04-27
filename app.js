const board = document.querySelectorAll('.field');
const playerX = 'X';
const playerO = 'O';
let turn = playerX;

const boardState = Array(board.length);
boardState.fill(null);

const strike = document.getElementById('strike');
const victor = document.getElementById('victor');
const nextPlayer = document.getElementById('next');
const resetBoard = document.getElementById('reset');

//Sounds
//https://freesound.org/people/EminYILDIRIM/sounds/536108/
//https://freesound.org/people/Audeption/sounds/564920/
//https://freesound.org/people/Benboncan/sounds/73581/

const clickSound = new Audio('audio/click.wav');
const victorySound = new Audio('audio/flawlessvictory.wav');
const drawSound = new Audio('audio/sadtrombone.wav');

board.forEach(field => field.addEventListener('click', fieldClick));

function setHoverText() {
    board.forEach(field => {
        field.classList.remove('x-hover');
        field.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    board.forEach(field => {
        if (field.innerText === '') {
            field.classList.add(hoverClass);
        }
    })
}

setHoverText();

function fieldClick(event) {
    if (victor.classList.contains('visible')) {
        return;
    }

    const field = event.target;
    const fieldNumber = field.dataset.index;
    if (field.innerText != '') {
        return;
    }

    if (turn === playerX) {
        field.innerText = playerX;
        boardState[fieldNumber - 1] = playerX;
        turn = playerO;

    }

    else {
        field.innerText = playerO;
        boardState[fieldNumber - 1] = playerO;
        turn = playerX;

    }
    nextPlayer.innerText = turn;
    clickSound.play();
    setHoverText();
    checkVictory();

};

const winningCombinations = [
    //rows
    { combo: [1, 2, 3], strikeClass: 'strike-row-1' },
    { combo: [4, 5, 6], strikeClass: 'strike-row-2' },
    { combo: [7, 8, 9], strikeClass: 'strike-row-3' },

    //columns
    { combo: [1, 4, 7], strikeClass: 'strike-column-1' },
    { combo: [2, 5, 8], strikeClass: 'strike-column-2' },
    { combo: [3, 6, 9], strikeClass: 'strike-column-3' },

    //diagonals
    { combo: [1, 5, 9], strikeClass: 'strike-diagonal-1' },
    { combo: [3, 5, 7], strikeClass: 'strike-diagonal-2' },
];


function checkVictory() {
    for (const winningCombination of winningCombinations) {
        // const combo = winningCombination.combo;
        // const strikeClass = winningCombination.strikeClass;
        const { combo, strikeClass } = winningCombination;
        const fieldValue1 = boardState[combo[0] - 1];
        const fieldValue2 = boardState[combo[1] - 1];
        const fieldValue3 = boardState[combo[2] - 1];

        if (fieldValue1 != null && fieldValue1 === fieldValue2 && fieldValue1 === fieldValue3) {
            strike.classList.add(strikeClass);
            showVictor(fieldValue1);
        }
    }

    const boardIsFull = boardState.every((field) => field !== null);
    if (boardIsFull) {
        showVictor(null);
    }
};

function showVictor(winnerText) {
    let text = 'Draw!';
    if (winnerText != null) {
        text = `Winner is ${winnerText}!`;
        victorySound.play();
    }

    victor.className = 'visible';
    victor.innerText = text;



};

function clearUi() {
    Array.from(board).forEach(function (element) {
        element.innerText = "";
    })
    boardState.fill(null);
    victor.className = 'hidden';
    strike.className = 'strike';

    setHoverText();
};

resetBoard.addEventListener('click', clearUi);

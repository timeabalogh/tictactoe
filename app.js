const board = document.querySelectorAll('.field');
const playerX = 'X';
const playerO = 'O';
let turn = playerX;

const boardState = Array(board.length);
boardState.fill(null);

const gameOverText = document.getElementById('victor');
const resetBoard = document.getElementById('reset');

//Sounds

const clickSound = new Audio('audio/click.wav')

// document.getElementById('next').innerText = turn;

board.forEach(field => field.addEventListener('click', fieldClick));

function fieldClick(event) {
    if (gameOverText.classList.contains('visible')) {
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

    clickSound.play();
};



function clearUi() {
    Array.from(board).forEach(function (element) {
        element.innerText = "";
    })
};

resetBoard.addEventListener('click', clearUi);

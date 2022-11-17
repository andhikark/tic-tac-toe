const play3 = document.querySelector('#play3');
const play5 = document.querySelector('#play5');
const play7 = document.querySelector('#play7');
const playerForm = document.querySelector('.form-wrapper');

let playMode;

play3.addEventListener('click', () => {
    playerForm.style.display = 'block';
    playMode = '3x3';
    DisplayControl.adjustBoard()
})

play5.addEventListener('click', () => {
    playerForm.style.display = 'block';
    playMode = '5x5';
    DisplayControl.adjustBoard()
})

play7.addEventListener('click', () => {
    playerForm.style.display = 'block'
    playMode = '7x7'
    DisplayControl.adjustBoard()
})

const Player = (playerName, playerMark) => {

    const getPlayerName = () => playerName;
    const getPlayerMark = () => playerMark;

    return {
        getPlayerName,
        getPlayerMark
    }
}

const GameBoard = (() => {
    let board3x3Arr = Array(9).fill('');
    let board5x5Arr = Array(25).fill('');
    let board7x7Arr = Array(49).fill('');

    const getboard3x3Arr = () => board3x3Arr;
    const getboard5x5Arr = () => board5x5Arr;
    const getboard7x7Arr = () => board7x7Arr;

    const putMark = (idx, mark) => {
        if (playMode == '3x3') {
            board3x3Arr[idx] = mark;
            DisplayControl.displayMark(idx, mark);
        } else if (playMode == '5x5') {
            board5x5Arr[idx] = mark;
            DisplayControl.displayMark(idx, mark);
        } else if (playMode == '7x7') {
            board7x7Arr[idx] = mark;
            DisplayControl.displayMark(idx, mark);
        }
    }

    const resetArr = () => {
        if (playMode == '3x3') {
            board3x3Arr = Array(9).fill('');
        } else if (playMode == '5x5') {
            board5x5Arr = Array(25).fill('');
        } else if (playMode == '7x7') {
            board7x7Arr = Array(49).fill('');
        }
    }

    const resetMark = (idx) => {
        if (playMode == '3x3') {
            board3x3Arr[idx] = ''
            DisplayControl.displayMark(idx, '');
        } else if (playMode == '5x5') {
            board5x5Arr[idx] = ''
            DisplayControl.displayMark(idx, '');
        } else if (playMode == '7x7') {
            board7x7Arr[idx] = ''
            DisplayControl.displayMark(idx, '')
        }
    }

    return {
        getboard3x3Arr,
        getboard5x5Arr,
        getboard7x7Arr,
        putMark,
        resetArr,
        resetMark
    }
})();

const GameControl = (() => {
    const playerXname = document.querySelector('#playerx');
    const playerOname = document.querySelector('#playero');
    const turnInfo = document.querySelector('.turnInfo');
    const playBtn = document.querySelector('#playBtn');
    const winnerMsg = document.querySelector('#winnerMsg');
    const resetBtn = document.querySelector('#reset-board');

    const playerX = Player(playerXname.value, 'X');
    const playerO = Player(playerOname.value, 'O');

    let turn = playerX;

    const checkNameForm = () => {
        if (playerXname.value !== '' && playerOname.value !== '') {
            turnInfo.textContent = playerXname.value + '\'s turn';
            DisplayControl.startGame();
            turnInfo.style.display = 'block';
        } else {
            return;
        }
    }

    playBtn.addEventListener('click', () => {
        checkNameForm();
    })

    const gameFlow = (idx) => {
        if (turn == playerX) {
            GameBoard.putMark(idx, playerX.getPlayerMark());
            turn = playerO;
            turnInfo.textContent = playerOname.value + '\'s turn';
        } else if (turn == playerO) {
            GameBoard.putMark(idx, playerO.getPlayerMark());
            turn = playerX;
            turnInfo.textContent = playerXname.value + '\'s turn';
        }
    }

    const checkWinner3x3 = (boardArr) => {
        if (boardArr[0] == 'X' && boardArr[4] == 'X' && boardArr[8] == 'X' || 
        boardArr[0] == 'X' && boardArr[1] == 'X' && boardArr[2] == 'X' || 
        boardArr[3] == 'X' && boardArr[4] == 'X' && boardArr[5] == 'X' || 
        boardArr[6] == 'X' && boardArr[7] == 'X' && boardArr[8] == 'X' || 
        boardArr[0] == 'X' && boardArr[3] == 'X' && boardArr[6] == 'X' || 
        boardArr[1] == 'X' && boardArr[4] == 'X' && boardArr[7] == 'X' ||
        boardArr[2] == 'X' && boardArr[5] == 'X' && boardArr[8] == 'X' ||
        boardArr[2] == 'X' && boardArr[4] == 'X' && boardArr[6] == 'X') {
            winnerMsg.textContent = playerXname.value + ' wins!';
        } else if (boardArr[0] == 'O' && boardArr[4] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[1] == 'O' && boardArr[2] == 'O' || 
        boardArr[3] == 'O' && boardArr[4] == 'O' && boardArr[5] == 'O' || 
        boardArr[6] == 'O' && boardArr[7] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[3] == 'O' && boardArr[6] == 'O' || 
        boardArr[1] == 'O' && boardArr[4] == 'O' && boardArr[7] == 'O' ||
        boardArr[2] == 'O' && boardArr[5] == 'O' && boardArr[8] == 'O' ||
        boardArr[2] == 'O' && boardArr[4] == 'O' && boardArr[6] == 'O') {
            winnerMsg.textContent = playerOname.value + ' wins!';
        } else if (!boardArr.includes('')){
            winnerMsg.textContent = 'it\'s a tie!';
        }
    }

    const checkWinner5x5 = (boardArr) => {
        if (boardArr[0] == 'X' && boardArr[1] == 'X' && boardArr[2] == 'X' && boardArr[3] == 'X' && boardArr[4] == 'X' ||
        boardArr[5] == 'X' && boardArr[6] == 'X' && boardArr[7] == 'X' && boardArr[8] == 'X' && boardArr[9] == 'X' ||
        boardArr[10] == 'X' && boardArr[11] == 'X' && boardArr[12] == 'X' && boardArr[13] == 'X' && boardArr[14] == 'X' ||
        boardArr[15] == 'X' && boardArr[16] == 'X' && boardArr[17] == 'X' && boardArr[18] == 'X' && boardArr[19] == 'X' ||
        boardArr[20] == 'X' && boardArr[21] == 'X' && boardArr[22] == 'X' && boardArr[23] == 'X' && boardArr[24] == 'X' ||
        boardArr[0] == 'X' && boardArr[5] == 'X' && boardArr[10] == 'X' && boardArr[15] == 'X' && boardArr[20] == 'X' ||
        boardArr[1] == 'X' && boardArr[6] == 'X' && boardArr[11] == 'X' && boardArr[16] == 'X' && boardArr[21] == 'X' || 
        boardArr[2] == 'X' && boardArr[7] == 'X' && boardArr[12] == 'X' && boardArr[17] == 'X' && boardArr[22] == 'X' ||
        boardArr[3] == 'X' && boardArr[8] == 'X' && boardArr[13] == 'X' && boardArr[18] == 'X' && boardArr[23] == 'X' ||
        boardArr[4] == 'X' && boardArr[9] == 'X' && boardArr[14] == 'X' && boardArr[19] == 'X' && boardArr[24] == 'X' ||
        boardArr[0] == 'X' && boardArr[6] == 'X' && boardArr[12] == 'X' && boardArr[18] == 'X' && boardArr[24] == 'X' ||
        boardArr[4] == 'X' && boardArr[8] == 'X' && boardArr[12] == 'X' && boardArr[16] == 'X' && boardArr[20] == 'X' ) {
            winnerMsg.textContent = playerXname.value + ' wins!';
        } else if (boardArr[0] == 'X' && boardArr[1] == 'X' && boardArr[2] == 'X' && boardArr[3] == 'X' && boardArr[4] == 'X' ||
        boardArr[5] == 'O' && boardArr[6] == 'O' && boardArr[7] == 'O' && boardArr[8] == 'O' && boardArr[9] == 'O' ||
        boardArr[10] == 'O' && boardArr[11] == 'O' && boardArr[12] == 'O' && boardArr[13] == 'O' && boardArr[14] == 'O' ||
        boardArr[15] == 'O' && boardArr[16] == 'O' && boardArr[17] == 'O' && boardArr[18] == 'O' && boardArr[19] == 'O' ||
        boardArr[20] == 'O' && boardArr[21] == 'O' && boardArr[22] == 'O' && boardArr[23] == 'O' && boardArr[24] == 'O' ||
        boardArr[0] == 'O' && boardArr[5] == 'O' && boardArr[10] == 'O' && boardArr[15] == 'O' && boardArr[20] == 'O' ||
        boardArr[1] == 'O' && boardArr[6] == 'O' && boardArr[11] == 'O' && boardArr[16] == 'O' && boardArr[21] == 'O' || 
        boardArr[2] == 'O' && boardArr[7] == 'O' && boardArr[12] == 'O' && boardArr[17] == 'O' && boardArr[22] == 'O' ||
        boardArr[3] == 'O' && boardArr[8] == 'O' && boardArr[13] == 'O' && boardArr[18] == 'O' && boardArr[23] == 'O' ||
        boardArr[4] == 'O' && boardArr[9] == 'O' && boardArr[14] == 'O' && boardArr[19] == 'O' && boardArr[24] == 'O' ||
        boardArr[0] == 'O' && boardArr[6] == 'O' && boardArr[12] == 'O' && boardArr[18] == 'O' && boardArr[24] == 'O' ||
        boardArr[4] == 'O' && boardArr[8] == 'O' && boardArr[12] == 'O' && boardArr[16] == 'O' && boardArr[20] == 'O') {
            winnerMsg.textContent = playerOname.value + ' wins!'
        } else if (!boardArr.includes('')) {
            winnerMsg.textContent = 'it\'s a tie!';
        }
    }

    resetBtn.addEventListener('click', () => {
        GameBoard.resetArr(GameBoard.getboard3x3Arr())
        for (let i = 0; i < (GameBoard.getboard3x3Arr()).length; i++) {
            GameBoard.resetMark(i)
        }
        turn = playerX
        turnInfo.textContent = playerXname.value + '\'s turn';
    })

    return {
        gameFlow,
        checkWinner3x3,
        checkWinner5x5
    }
})()

const DisplayControl = (() => {
    const boardContainer = document.querySelector('.board-container')
    const gamepage = document.querySelector('.gamepage-wrapper');
    const homepage = document.querySelector('.homepage-wrapper')

    const displayMark = (idx, mark) => {
        boardArr[idx].innerHTML = mark;
    }

    const createBoard = () => {
        const board = document.createElement('div');
        board.classList.add('board')
        boardContainer.appendChild(board)
    }

    const adjustBoard = () => {
        if (playMode == '3x3') {
            for (let i = 0; i < 9; i++) {
                createBoard()
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(3, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(3, 1fr)');
        } else if (playMode == '5x5') {
            for (let i = 0; i < 25; i++) {
                createBoard()
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(5, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(5, 1fr)');
        } else if (playMode == '7x7') {
            for (let i = 0; i < 49; i++) {
                createBoard()
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(7, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(7, 1fr)');
        }
    }

    const boardArr = document.getElementsByClassName('board')

    const startGame = () => {
        homepage.style.display = 'none';
        playerForm.style.display = 'none';
        gamepage.style.display = 'block';
        createBoard();
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i].addEventListener('click', () => {
                if (winnerMsg.textContent == '') {
                    if (boardArr[i].innerHTML == '' && playMode == '3x3') {
                        GameControl.gameFlow(i);
                        GameControl.checkWinner3x3(GameBoard.getboard3x3Arr());
                        console.log(GameBoard.getboard3x3Arr());
                    } else if (boardArr[i].innerHTML == '' && playMode == '5x5') {
                        GameControl.gameFlow(i);
                        GameControl.checkWinner5x5(GameBoard.getboard5x5Arr());
                        console.log(GameBoard.getboard5x5Arr());
                    } else if (boardArr[i].innerHTML == '' && playMode == '7x7') {
                        GameControl.gameFlow(i);
                        GameControl.checkWinner7x7(GameBoard.getboard7x7Arr());
                        console.log(GameBoard.getboard7x7Arr());
                    }
                } else {
                    return;
                }
            })
        }
    }

    return {
        displayMark,
        startGame,
        adjustBoard
    }
})();

//todo for tomorrow
/* 1. logic for checking the winner on 5x5 and 7x7 gameplay */
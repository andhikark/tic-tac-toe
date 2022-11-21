const play3 = document.querySelector('#play3');
const play5 = document.querySelector('#play5');
const play7 = document.querySelector('#play7');
const playerForm = document.querySelector('.form-wrapper');
const soundIcon = document.querySelector('#sound_icon');
const winnerPopup = document.querySelector('.winner-wrapper');

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
    const winnerMsg = document.querySelector('#winnerMsg');

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
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        } else if (boardArr[0] == 'O' && boardArr[4] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[1] == 'O' && boardArr[2] == 'O' || 
        boardArr[3] == 'O' && boardArr[4] == 'O' && boardArr[5] == 'O' || 
        boardArr[6] == 'O' && boardArr[7] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[3] == 'O' && boardArr[6] == 'O' || 
        boardArr[1] == 'O' && boardArr[4] == 'O' && boardArr[7] == 'O' ||
        boardArr[2] == 'O' && boardArr[5] == 'O' && boardArr[8] == 'O' ||
        boardArr[2] == 'O' && boardArr[4] == 'O' && boardArr[6] == 'O') {
            winnerMsg.textContent = playerOname.value + ' wins!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        } else if (!boardArr.includes('')){
            winnerMsg.textContent = 'it\'s a tie!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
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
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
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
            winnerMsg.textContent = playerOname.value + ' wins!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        } else if (!boardArr.includes('')) {
            winnerMsg.textContent = 'it\'s a tie!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        }
    }

    const checkWinner7x7 = (boardArr) => {
        if (boardArr[0] == 'X' && boardArr[1] == 'X' && boardArr[2] == 'X' && boardArr[3] == 'X' && boardArr[4] == 'X' && boardArr[5] == 'X' && boardArr[6] == 'X' ||
        boardArr[7] == 'X' && boardArr[8] == 'X' && boardArr[9] == 'X' && boardArr[10] == 'X' && boardArr[11] == 'X' && boardArr[12] == 'X' && boardArr[13] == 'X' ||
        boardArr[14] == 'X' && boardArr[15] == 'X' && boardArr[16] == 'X' && boardArr[17] == 'X' && boardArr[18] == 'X' && boardArr[19] == 'X' && boardArr[20] == 'X' ||
        boardArr[21] == 'X' && boardArr[22] == 'X' && boardArr[23] == 'X' && boardArr[24] == 'X' && boardArr[25] == 'X' && boardArr[26] == 'X' && boardArr[27] == 'X' ||
        boardArr[28] == 'X' && boardArr[29] == 'X' && boardArr[30] == 'X' && boardArr[31] == 'X' && boardArr[32] == 'X' && boardArr[33] == 'X' && boardArr[34] == 'X' ||
        boardArr[35] == 'X' && boardArr[36] == 'X' && boardArr[37] == 'X' && boardArr[38] == 'X' && boardArr[39] == 'X' && boardArr[40] == 'X' && boardArr[41] == 'X' ||
        boardArr[42] == 'X' && boardArr[43] == 'X' && boardArr[44] == 'X' && boardArr[45] == 'X' && boardArr[46] == 'X' && boardArr[47] == 'X' && boardArr[48] == 'X' ||
        boardArr[0] == 'X' && boardArr[7] == 'X' && boardArr[14] == 'X' && boardArr[21] == 'X' && boardArr[28] == 'X' && boardArr[35] == 'X' && boardArr[42] == 'X' ||
        boardArr[1] == 'X' && boardArr[8] == 'X' && boardArr[15] == 'X' && boardArr[22] == 'X' && boardArr[29] == 'X' && boardArr[36] == 'X' && boardArr[43] == 'X' ||
        boardArr[2] == 'X' && boardArr[9] == 'X' && boardArr[16] == 'X' && boardArr[23] == 'X' && boardArr[30] == 'X' && boardArr[37] == 'X' && boardArr[44] == 'X' ||
        boardArr[3] == 'X' && boardArr[10] == 'X' && boardArr[17] == 'X' && boardArr[24] == 'X' && boardArr[31] == 'X' && boardArr[38] == 'X' && boardArr[45] == 'X' ||
        boardArr[4] == 'X' && boardArr[11] == 'X' && boardArr[18] == 'X' && boardArr[25] == 'X' && boardArr[32] == 'X' && boardArr[39] == 'X' && boardArr[46] == 'X' ||
        boardArr[5] == 'X' && boardArr[12] == 'X' && boardArr[19] == 'X' && boardArr[26] == 'X' && boardArr[33] == 'X' && boardArr[40] == 'X' && boardArr[47] == 'X' ||
        boardArr[6] == 'X' && boardArr[13] == 'X' && boardArr[20] == 'X' && boardArr[27] == 'X' && boardArr[34] == 'X' && boardArr[41] == 'X' && boardArr[48] == 'X' ||
        boardArr[0] == 'X' && boardArr[8] == 'X' && boardArr[16] == 'X' && boardArr[24] == 'X' && boardArr[32] == 'X' && boardArr[40] == 'X' && boardArr[48] == 'X' ||
        boardArr[6] == 'X' && boardArr[12] == 'X' && boardArr[18] == 'X' && boardArr[24] == 'X' && boardArr[30] == 'X' && boardArr[36] == 'X' && boardArr[42] == 'X') {
            winnerMsg.textContent = playerXname.value + ' wins!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        } else if (boardArr[0] == 'O' && boardArr[1] == 'O' && boardArr[2] == 'X' && boardArr[3] == 'O' && boardArr[4] == 'O' && boardArr[5] == 'O' && boardArr[6] == 'O' ||
        boardArr[7] == 'O' && boardArr[8] == 'O' && boardArr[9] == 'O' && boardArr[10] == 'O' && boardArr[11] == 'O' && boardArr[12] == 'O' && boardArr[13] == 'O' ||
        boardArr[14] == 'O' && boardArr[15] == 'O' && boardArr[16] == 'O' && boardArr[17] == 'O' && boardArr[18] == 'O' && boardArr[19] == 'O' && boardArr[20] == 'O' ||
        boardArr[21] == 'O' && boardArr[22] == 'O' && boardArr[23] == 'O' && boardArr[24] == 'O' && boardArr[25] == 'O' && boardArr[26] == 'O' && boardArr[27] == 'O' ||
        boardArr[28] == 'O' && boardArr[29] == 'O' && boardArr[30] == 'O' && boardArr[31] == 'O' && boardArr[32] == 'O' && boardArr[33] == 'O' && boardArr[34] == 'O' ||
        boardArr[35] == 'O' && boardArr[36] == 'O' && boardArr[37] == 'O' && boardArr[38] == 'O' && boardArr[39] == 'O' && boardArr[40] == 'O' && boardArr[41] == 'O' ||
        boardArr[42] == 'O' && boardArr[43] == 'O' && boardArr[44] == 'O' && boardArr[45] == 'O' && boardArr[46] == 'O' && boardArr[47] == 'O' && boardArr[48] == 'O' ||
        boardArr[0] == 'O' && boardArr[7] == 'O' && boardArr[14] == 'O' && boardArr[21] == 'O' && boardArr[28] == 'O' && boardArr[35] == 'O' && boardArr[42] == 'O' ||
        boardArr[1] == 'O' && boardArr[8] == 'O' && boardArr[15] == 'O' && boardArr[22] == 'O' && boardArr[29] == 'O' && boardArr[36] == 'O' && boardArr[43] == 'O' ||
        boardArr[2] == 'O' && boardArr[9] == 'O' && boardArr[16] == 'O' && boardArr[23] == 'O' && boardArr[30] == 'O' && boardArr[37] == 'O' && boardArr[44] == 'O' ||
        boardArr[3] == 'O' && boardArr[10] == 'O' && boardArr[17] == 'O' && boardArr[24] == 'O' && boardArr[31] == 'O' && boardArr[38] == 'O' && boardArr[45] == 'O' ||
        boardArr[4] == 'O' && boardArr[11] == 'O' && boardArr[18] == 'O' && boardArr[25] == 'O' && boardArr[32] == 'O' && boardArr[39] == 'O' && boardArr[46] == 'O' ||
        boardArr[5] == 'O' && boardArr[12] == 'O' && boardArr[19] == 'O' && boardArr[26] == 'O' && boardArr[33] == 'O' && boardArr[40] == 'O' && boardArr[47] == 'O' ||
        boardArr[6] == 'O' && boardArr[13] == 'O' && boardArr[20] == 'O' && boardArr[27] == 'O' && boardArr[34] == 'O' && boardArr[41] == 'O' && boardArr[48] == 'O' ||
        boardArr[0] == 'O' && boardArr[8] == 'O' && boardArr[16] == 'O' && boardArr[24] == 'O' && boardArr[32] == 'O' && boardArr[40] == 'O' && boardArr[48] == 'O' ||
        boardArr[6] == 'O' && boardArr[12] == 'O' && boardArr[18] == 'O' && boardArr[24] == 'O' && boardArr[30] == 'O' && boardArr[36] == 'O' && boardArr[42] == 'O') {
            winnerMsg.textContent = playerOname.value + ' wins!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        } else if (!boardArr.includes('')) {
            winnerMsg.textContent = 'it\'s a tie!';
            winnerPopup.style.display = 'block';
            turnInfo.style.display = 'none';
        }
    }

    const restartGame = () => {
        if (playMode == '3x3') {
            GameBoard.resetArr(GameBoard.getboard3x3Arr())
            for (let i = 0; i < (GameBoard.getboard3x3Arr()).length; i++) {
                GameBoard.resetMark(i);
            }
        } else if (playMode == '5x5') {
            GameBoard.resetArr(GameBoard.getboard5x5Arr())
            for (let i = 0; i < (GameBoard.getboard5x5Arr()).length; i++) {
                GameBoard.resetMark(i);
            }
        } else if (playMode == '7x7') {
            GameBoard.resetArr(GameBoard.getboard7x7Arr())
            for (let i = 0; i < (GameBoard.getboard7x7Arr()).length; i++) {
                GameBoard.resetMark(i);
            }
        }
        turn = playerX;
        turnInfo.textContent = playerXname.value + '\'s turn';
        turnInfo.style.display = 'block'
    }

    return {
        gameFlow,
        checkNameForm,
        restartGame,
        checkWinner3x3,
        checkWinner5x5,
        checkWinner7x7
    }
})()

const DisplayControl = (() => {
    const boardContainer = document.querySelector('.board-container')
    const gamepage = document.querySelector('.gamepage-wrapper');
    const homepage = document.querySelector('.homepage-wrapper');
    
    boardContainer.innerHTML = '';

    const displayMark = (idx, mark) => {
        boardArr[idx].innerHTML = mark;
    }

    const createBoard = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        boardContainer.appendChild(board);
        if (playMode == '7x7') {
            board.style.setProperty("font-size", "1.5em")
        }
    }

    const adjustBoard = () => {
        boardContainer.innerHTML = '';
        if (playMode == '3x3') {
            for (let i = 0; i < 9; i++) {
                createBoard();
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(3, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(3, 1fr)');
        } else if (playMode == '5x5') {
            for (let i = 0; i < 25; i++) {
                createBoard();
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(5, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(5, 1fr)');
        } else if (playMode == '7x7') {
            for (let i = 0; i < 49; i++) {
                createBoard();
            }
            boardContainer.style.setProperty("grid-template-rows", 'repeat(7, 1fr)');
            boardContainer.style.setProperty("grid-template-columns", 'repeat(7, 1fr)');
        }
    }

    let boardArr = document.getElementsByClassName('board');

    const clickBoard = () => {
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i].addEventListener('click', () => {
                if (boardArr[i].innerHTML == '' && playMode == '3x3') {
                    GameControl.gameFlow(i);
                    GameControl.checkWinner3x3(GameBoard.getboard3x3Arr());
                } else if (boardArr[i].innerHTML == '' && playMode == '5x5') {
                    GameControl.gameFlow(i);
                    GameControl.checkWinner5x5(GameBoard.getboard5x5Arr());
                } else if (boardArr[i].innerHTML == '' && playMode == '7x7') {
                    GameControl.gameFlow(i);
                    GameControl.checkWinner7x7(GameBoard.getboard7x7Arr());
                }

            })
        }
    }

    const startGame = () => {
        homepage.style.display = 'none';
        playerForm.style.display = 'none';
        gamepage.style.display = 'block';
        createBoard();
        clickBoard();
    }

    const backHome = () => {
        GameControl.restartGame();
        playMode = undefined;
        boardContainer.innerHTML = '';
        homepage.style.display = 'block';
        gamepage.style.display = 'none';
        winnerPopup.style.display = 'none';
        winnerMsg = '';
        adjustBoard();
        clickBoard();
    }

    return {
        displayMark,
        startGame,
        backHome,
        adjustBoard
    }
})();

const playBtn = document.querySelector('#playBtn');
const restartWin = document.querySelector('#restart-win');
const homeWin = document.querySelector('#home-winner');
const xBtn = document.querySelector('#x')

const homeBtn = document.querySelector('#home-button');
const homeYes = document.querySelector('#homeYes');
const homeNo = document.querySelector('#homeNo');
const homeWarnWrapper = document.querySelector('.backhome-wrapper');

const resetPopup = document.querySelector('.resetwarn-wrapper');
const resetBtn = document.querySelector('#reset-board');
const resetYes = document.querySelector('#restartYes');
const resetNo = document.querySelector('#restartNo');

const audioIconGame = document.querySelector('#sound_icon');
const audioIconHome = document.querySelector('#sound_home');
const backsoundAudio = document.querySelector('#backsound');

playBtn.addEventListener('click', () => {
    GameControl.checkNameForm();
})

playerForm.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        GameControl.checkNameForm();
    }
})

restartWin.addEventListener('click', () => {
    winnerPopup.style.display = 'none'
    winnerMsg.textContent = '';
    GameControl.restartGame();
    DisplayControl.startGame();
})

homeWin.addEventListener('click', () => {
    DisplayControl.backHome();
})

resetBtn.addEventListener('click', () => {
    resetPopup.style.display = 'block';
})

resetYes.addEventListener('click', () => {
    GameControl.restartGame();
    resetPopup.style.display = 'none';
})

resetNo.addEventListener('click', () => {
    resetPopup.style.display = 'none';
})

homeBtn.addEventListener('click', () => {
    homeWarnWrapper.style.display = 'block';
})

homeYes.addEventListener('click', () => {
    DisplayControl.backHome();
    homeWarnWrapper.style.display = 'none'
})

homeNo.addEventListener('click', () => {
    homeWarnWrapper.style.display = 'none'
})

xBtn.addEventListener('click', () => {
    playerForm.style.display = 'none';
})

window.onclick = function(e) {
    if (e.target == playerForm) {
        playerForm.style.display = 'none'
    } else if (e.target == resetPopup) {
        resetPopup.style.display = 'none'
    } else if (e.target == homeWarnWrapper) {
        homeWarnWrapper.style.display = 'none'
    }
}

audioIconGame.addEventListener('click', () => {
    if (backsoundAudio.paused) {
        audioIconGame.src = 'media/speaker.png'
        audioIconHome.src = 'media/speaker-home.png'
        backsoundAudio.play();
    } else {
        backsoundAudio.pause();
        audioIconGame.src = 'media/mute.png'
        audioIconHome.src = 'media/mute-home.png'
    }
})

audioIconHome.addEventListener('click', () => {
    if (backsoundAudio.paused) {
        audioIconHome.src = 'media/speaker-home.png'
        audioIconGame.src = 'media/speaker.png'
        backsoundAudio.play();
    } else {
        backsoundAudio.pause();
        audioIconHome.src = 'media/mute-home.png'
        audioIconGame.src = 'media/mute.png'
    }
})
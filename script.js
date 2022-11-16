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
        if (board3x3Arr[idx] == '') {
            board3x3Arr[idx] = mark;
            DisplayControl.displayMark(idx, mark);
        } else {
            return;
        }
    }

    const resetArr = () => {
        let board3x3Arr = Array(9).fill('');
        let board5x5Arr = Array(25).fill('');
        let board7x7Arr = Array(49).fill('');
    }

    const resetMark = (idx) => {
        board3x3Arr[idx] = ''
        DisplayControl.displayMark(idx, '');
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

    const checkWinner = (boardArr) => {
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

    resetBtn.addEventListener('click', () => {
        GameBoard.resetArr()
        for (let i = 0; i < boardArr.length; i++) {
            GameBoard.resetMark(i)
        }
        turn = playerX
        turnInfo.textContent = playerXname.value + '\'s turn';
    })

    return {
        gameFlow,
        checkWinner
    }
})()

const DisplayControl = (() => {
    const boardArr = document.querySelectorAll('#board');
    const gamepage = document.querySelector('.gamepage-wrapper');
    const homepage = document.querySelector('.homepage-wrapper')
    const playerForm = document.querySelector('.form-wrapper');
    const play3 = document.querySelector('#play3');
    const play5 = document.querySelector('#play5');
    const play7 = document.querySelector('#play7');

    play3.addEventListener('click', () => {
        playerForm.style.display = 'block'
    })

    play5.addEventListener('click', () => {
        playerForm.style.display = 'block'
    })

    play7.addEventListener('click', () => {
        playerForm.style.display = 'block'
    })

    const displayMark = (idx, mark) => {
        boardArr[idx].innerHTML = mark;
    }

    const startGame = () => {
        homepage.style.display = 'none'
        playerForm.style.display = 'none';
        gamepage.style.display = 'block'
        for (let i = 0; i < boardArr.length; i++) {
            boardArr[i].addEventListener('click', () => {
                if (winnerMsg.textContent == '') {
                    if (boardArr[i].innerHTML == '') {
                        GameControl.gameFlow(i);
                        GameControl.checkWinner(GameBoard.getboardArr());
                    } else {
                        return;
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
    }
})();


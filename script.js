const Player = (playerName, playerMark) => {

    const getPlayerName = () => playerName;
    const getPlayerMark = () => playerMark;

    return {
        getPlayerName,
        getPlayerMark
    }
}

const GameBoard = (() => {
    let boardArr = ['', '', '', '', '', '', '', '', '']

    const getboardArr = () => boardArr[i];

    const putMark = (idx, mark) => {
        boardArr[idx] = mark
        DisplayControl.displayMark(idx, mark)
    }

    return {
        getboardArr,
        putMark
    }
})();

const GameControl = (() => {
    const playerXname = document.querySelector('#playerx');
    const playerOname = document.querySelector('#playero');
    const turnInfo = document.querySelector('.turnInfo');
    const playBtn = document.querySelector('#playBtn')

    const playerX = Player(playerXname.value, 'X')
    const playerO = Player(playerOname.value, 'O')

    let turn = playerX;

    function checkNameForm() {
        if (playerXname.value !== '' && playerOname.value !== '') {
            turnInfo.textContent = playerXname.value + '\'s turn'
            DisplayControl.startGame()
        } else {
            return;
        }
    }

    playBtn.addEventListener('click', () => {
        turnInfo.style.display = 'block'
        checkNameForm()
    })

    const gameFlow = (idx) => {
        if (turn == playerX) {
            GameBoard.putMark(idx, playerX.getPlayerMark())
            turn = playerO
        } else if (turn == playerO) {
            GameBoard.putMark(idx, playerO.getPlayerMark())
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
            winnerMsgOne.style.display = 'block';
        } else if (boardArr[0] == 'O' && boardArr[4] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[1] == 'O' && boardArr[2] == 'O' || 
        boardArr[3] == 'O' && boardArr[4] == 'O' && boardArr[5] == 'O' || 
        boardArr[6] == 'O' && boardArr[7] == 'O' && boardArr[8] == 'O' || 
        boardArr[0] == 'O' && boardArr[3] == 'O' && boardArr[6] == 'O' || 
        boardArr[1] == 'O' && boardArr[4] == 'O' && boardArr[7] == 'O' ||
        boardArr[2] == 'O' && boardArr[5] == 'O' && boardArr[8] == 'O' ||
        boardArr[2] == 'O' && boardArr[4] == 'O' && boardArr[6] == 'O') {
            winnerMsgTwo.style.display = 'block';
        } else if (!boardArr.includes('')){
            tieMsg.style.display = 'block'
        }
    }

    return {
        gameFlow,
        checkWinner
    }
})()

const DisplayControl = (() => {
    const pageBoard = document.querySelectorAll('#board')

    const displayMark = (idx, mark) => {
        pageBoard[idx].innerHTML = mark
    }

    const startGame = () => {
        for (let i = 0; i < pageBoard.length; i++) {
            pageBoard[i].addEventListener('click', () => {
                GameControl.gameFlow(i)
            })
        }
    }

    return {
        displayMark,
        startGame
    }
})();
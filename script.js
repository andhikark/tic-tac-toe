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

    const getboardArr = () => boardArr;

    return {
        getboardArr
    }
})

const GameControl = (() => {
    const pageBoard = document.querySelectorAll('#board')
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
            gameFlow()
        } else {
            return;
        }
    }

    playBtn.addEventListener('click', () => {
        turnInfo.style.display = 'block'
        checkNameForm()
    })

    function gameFlow() {
        for (let i = 0; i < pageBoard.length; i++) {
            pageBoard[i].addEventListener('click', () => {
                if (turn == playerX) {
                    if (pageBoard[i].innerHTML == '') {
                        pageBoard[i].innerHTML = playerX.getPlayerMark();
                        turnInfo.textContent = playerOname.value + '\'s turn'
                        turn = playerO;
                    } else {
                        return;
                    }
                } else {
                    if (pageBoard[i].innerHTML == '') {
                        pageBoard[i].innerHTML = playerO.getPlayerMark();
                        turnInfo.textContent = playerXname.value + '\'s turn'
                        turn = playerX;
                    } else {
                        return;
                    }
                }
            })
        }
    }

    const checkWinner = (pageBoard) => {
        if (pageBoard[0] == 'X' && pageBoard[4] == 'X' && pageBoard[8] == 'X' || 
        pageBoard[0] == 'X' && pageBoard[1] == 'X' && pageBoard[2] == 'X' || 
        pageBoard[3] == 'X' && pageBoard[4] == 'X' && pageBoard[5] == 'X' || 
        pageBoard[6] == 'X' && pageBoard[7] == 'X' && pageBoard[8] == 'X' || 
        pageBoard[0] == 'X' && pageBoard[3] == 'X' && pageBoard[6] == 'X' || 
        pageBoard[1] == 'X' && pageBoard[4] == 'X' && pageBoard[7] == 'X' ||
        pageBoard[2] == 'X' && pageBoard[5] == 'X' && pageBoard[8] == 'X' ||
        pageBoard[2] == 'X' && pageBoard[4] == 'X' && pageBoard[6] == 'X') {
            winnerMsgOne.style.display = 'block';
        } else if (pageBoard[0] == 'O' && pageBoard[4] == 'O' && pageBoard[8] == 'O' || 
        pageBoard[0] == 'O' && pageBoard[1] == 'O' && pageBoard[2] == 'O' || 
        pageBoard[3] == 'O' && pageBoard[4] == 'O' && pageBoard[5] == 'O' || 
        pageBoard[6] == 'O' && pageBoard[7] == 'O' && pageBoard[8] == 'O' || 
        pageBoard[0] == 'O' && pageBoard[3] == 'O' && pageBoard[6] == 'O' || 
        pageBoard[1] == 'O' && pageBoard[4] == 'O' && pageBoard[7] == 'O' ||
        pageBoard[2] == 'O' && pageBoard[5] == 'O' && pageBoard[8] == 'O' ||
        pageBoard[2] == 'O' && pageBoard[4] == 'O' && pageBoard[6] == 'O') {
            winnerMsgTwo.style.display = 'block';
        } else if (!pageBoard.includes('')){
            tieMsg.style.display = 'block'
        }
    }

    return {
        checkWinner
    }
})()
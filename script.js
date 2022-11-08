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

    const markArr = () => {
        
    }

    const getboardArr = () => boardArr;

    return {
        getboardArr
    }
})

const GameControl = (() => {
    const playerXname = document.querySelector('.player-x');
    const playerOname = document.querySelector('.player-o');

    const playerX = Player(playerXname.value, 'X')
    const playerO = Player(playerOname.value, 'O')

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
})

const displayControl = () => {

}
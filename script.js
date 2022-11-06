const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark}
}

const playerOne = Player('player X', 'X');
const playerTwo = Player('player O', 'O');

const TurnControl = (() => {
    turn = playerOne;

    const getTurn = () => turn;

    return {
        getTurn
    }
})()

const GameAndDisplayControl = (() => {
    const pageBoard = document.querySelectorAll('#board');
    const winnerMsgOne = document.querySelector('#winnerMsgOne');
    const winnerMsgTwo = document.querySelector('#winnerMsgTwo');

    winnerMsgOne.textContent = playerOne.getName() + ' wins';
    winnerMsgTwo.textContent = playerTwo.getName() + ' wins';

    winnerMsgOne.style.display = 'none';
    winnerMsgTwo.style.display = 'none';

    for (let i = 0; i < pageBoard.length; i++) {
        pageBoard[i].addEventListener('click', () => {
            console.log(turn.getName())
            if (turn == playerOne) {
                turn = playerTwo;
                pageBoard[i].innerHTML = playerOne.getMark();
            } else {
                turn = playerOne;
                pageBoard[i].innerHTML = playerTwo.getMark();
            }

            if (pageBoard[0].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[8].innerHTML == 'X' || 
            pageBoard[0].innerHTML == 'X' && pageBoard[1].innerHTML == 'X' && pageBoard[2].innerHTML == 'X' || 
            pageBoard[3].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[5].innerHTML == 'X' || 
            pageBoard[6].innerHTML == 'X' && pageBoard[7].innerHTML == 'X' && pageBoard[8].innerHTML == 'X' || 
            pageBoard[0].innerHTML == 'X' && pageBoard[3].innerHTML == 'X' && pageBoard[6].innerHTML == 'X' || 
            pageBoard[1].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[7].innerHTML == 'X' ||
            pageBoard[2].innerHTML == 'X' && pageBoard[5].innerHTML == 'X' && pageBoard[8].innerHTML == 'X') {
                winnerMsgOne.style.display = 'block';
            } else if (pageBoard[0].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[8].innerHTML == 'O' || 
            pageBoard[0].innerHTML == 'O' && pageBoard[1].innerHTML == 'O' && pageBoard[2].innerHTML == 'O' || 
            pageBoard[3].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[5].innerHTML == 'O' || 
            pageBoard[6].innerHTML == 'O' && pageBoard[7].innerHTML == 'O' && pageBoard[8].innerHTML == 'O' || 
            pageBoard[0].innerHTML == 'O' && pageBoard[3].innerHTML == 'O' && pageBoard[6].innerHTML == 'O' || 
            pageBoard[1].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[7].innerHTML == 'O' ||
            pageBoard[2].innerHTML == 'O' && pageBoard[5].innerHTML == 'O' && pageBoard[8].innerHTML == 'O') {
                winnerMsgTwo.style.display = 'block';
            }
        })
    }

})();
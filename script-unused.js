const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark}
}

const playerX = Player('player X', 'X');
const playerO = Player('player O', 'O');
const pageBoard = document.querySelectorAll('#board');
const botBtn = document.querySelector('#bot')

const GameControl = (() => {
    const winnerMsgOne = document.querySelector('#winnerMsgOne');
    const winnerMsgTwo = document.querySelector('#winnerMsgTwo');
    const tieMsg = document.querySelector('#tieMsg');

    winnerMsgOne.textContent = playerX.getName() + ' wins';
    winnerMsgTwo.textContent = playerO.getName() + ' wins';
    tieMsg.textContent = 'it\'s a tie!'

    winnerMsgOne.style.display = 'none';
    winnerMsgTwo.style.display = 'none';
    tieMsg.style.display = 'none'

    let turn = playerX;

    for (let i = 0; i < pageBoard.length; i++) {
        pageBoard[i].addEventListener('click', () => {
            if (turn == playerX) {
                if (pageBoard[i].innerHTML == '') {
                    pageBoard[i].innerHTML = playerX.getMark();
                    turn = playerO;
                } else {
                    return;
                }
            } else {
                if (pageBoard[i].innerHTML == '') {
                    pageBoard[i].innerHTML = playerO.getMark();
                    turn = playerX;
                } else {
                    return;
                }
            }
            
            if (pageBoard[0].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[8].innerHTML == 'X' || 
            pageBoard[0].innerHTML == 'X' && pageBoard[1].innerHTML == 'X' && pageBoard[2].innerHTML == 'X' || 
            pageBoard[3].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[5].innerHTML == 'X' || 
            pageBoard[6].innerHTML == 'X' && pageBoard[7].innerHTML == 'X' && pageBoard[8].innerHTML == 'X' || 
            pageBoard[0].innerHTML == 'X' && pageBoard[3].innerHTML == 'X' && pageBoard[6].innerHTML == 'X' || 
            pageBoard[1].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[7].innerHTML == 'X' ||
            pageBoard[2].innerHTML == 'X' && pageBoard[5].innerHTML == 'X' && pageBoard[8].innerHTML == 'X' ||
            pageBoard[2].innerHTML == 'X' && pageBoard[4].innerHTML == 'X' && pageBoard[6].innerHTML == 'X') {
                winnerMsgOne.style.display = 'block';
            } else if (pageBoard[0].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[8].innerHTML == 'O' || 
            pageBoard[0].innerHTML == 'O' && pageBoard[1].innerHTML == 'O' && pageBoard[2].innerHTML == 'O' || 
            pageBoard[3].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[5].innerHTML == 'O' || 
            pageBoard[6].innerHTML == 'O' && pageBoard[7].innerHTML == 'O' && pageBoard[8].innerHTML == 'O' || 
            pageBoard[0].innerHTML == 'O' && pageBoard[3].innerHTML == 'O' && pageBoard[6].innerHTML == 'O' || 
            pageBoard[1].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[7].innerHTML == 'O' ||
            pageBoard[2].innerHTML == 'O' && pageBoard[5].innerHTML == 'O' && pageBoard[8].innerHTML == 'O' ||
            pageBoard[2].innerHTML == 'O' && pageBoard[4].innerHTML == 'O' && pageBoard[6].innerHTML == 'O') {
                winnerMsgTwo.style.display = 'block';
            } else if (pageBoard[0].innerHTML !== '' && pageBoard[1].innerHTML !== '' && pageBoard[2].innerHTML !== '' && 
            pageBoard[3].innerHTML !== ''&& pageBoard[4].innerHTML !== '' && pageBoard[5].innerHTML !== '' && 
            pageBoard[6].innerHTML !== '' && pageBoard[7].innerHTML !== '' && pageBoard[8].innerHTML !== '') {
                tieMsg.style.display = 'block'
            }
        })
    }
})();

const playerBotMarks = document.querySelectorAll('#botChoice')
const botCell = pageBoard[Math.floor(Math.random() * pageBoard.length)]

let markBotChoice;


playerBotMarks.forEach((playerMark) => {
    playerMark.addEventListener('click', () => {
        if (playerMark.classList.contains('o')) {
            markBotChoice = "X";
        } else if (playerMark.classList.contains('x')) {
            markBotChoice = "O";
        }

        const getBotMark = () => markBotChoice;

        return {
            getBotMark
        }
    })
})


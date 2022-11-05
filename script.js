/* WHAT TO DO
1. create player factory, give their some name and mark for each.
2. consider whose turn at each click on the board
3. display each player's mark by using getMark()
4. let each mark replace the blank in board array
*/

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;

    return {getName, getMark}
}

const playerOne = Player('player 1', 'X')
const playerTwo = Player('player 2', 'O')

const GameBoard = (() => {
    let boardArr = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
})();

const flowControl = (() => {
        if (playerOne) {
            turn = playerOne
        } else {
            turn = playerTwo;
        }

    const getTurn = () => turn;

    return {
        getTurn
    }
})()

const DisplayControl = (() => {
    const pageBoard = document.querySelectorAll('#board');

    pageBoard.forEach((board) => {
        board.addEventListener('click', () => {
            if (turn == playerOne) {
                turn = playerTwo
                board.innerHTML = playerOne.getMark()
            } else {
                turn = playerOne
                board.innerHTML = playerTwo.getMark()
            }
        })
    })
})();
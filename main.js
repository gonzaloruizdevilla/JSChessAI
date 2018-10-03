let board,
    game = new Chess();

let onDragStart = 
    (square, piece) =>
        !(game.in_checkmate() || game.in_draw() || /^b/.test(piece))

let highlightSquare = 
    square => document.querySelector(`.square-${square}`).classList.toggle('highlight')

let removeHighlight = 
    () => document.querySelectorAll('.highlight').forEach(el => el.classList.toggle('highlight'))

let onMouseoverSquare =
    (square, piece) => {
        var moves = game.moves({ square, verbose: true }).map(({to}) => to);
        [...moves, square].forEach(highlightSquare)
    }

let onMouseoutSquare = removeHighlight

let onDrop = (...args) => {  }
let onSnapEnd = (...args) => {  }



let config = {
    draggable: true,
    position: 'start',
    onDragStart,
    onDrop,
    onMouseoutSquare,
    onMouseoverSquare,
    onSnapEnd
}

board = ChessBoard('board', config);
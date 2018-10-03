let board,
    game = new Chess();

let onDragStart = 
    (square, piece) =>
        !(game.in_checkmate() || game.in_draw() || /^b/.test(piece))

let onMouseoverSquare = (...args) => { }
let onMouseoutSquare = (...args) => {  }
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
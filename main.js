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

let onMouseoutSquare = removeHighlight;

let renderHistory = () => document.getElementById("history").innerHTML = `
    ${game.history().map(move => `
        <span>${move}</span>
    `).join('')}
`;

let findBestMove = () => {
    if (game.game_over()) return alert('Game over!');
    let moves = game.moves();
    return moves[0|Math.random()*moves.length]
}

let makeBestMove = () => {
    let bestMove = findBestMove();
    if (bestMove) {
        game.move(bestMove);
        board.position(game.fen())
        renderHistory();
        if (game.game_over()) alert('Game over!');
    }

}

let onDrop = (from, to) => {
    removeHighlight();
    var move = game.move({from, to, promotion:'q'});
    if (!move) return 'snapback';
    renderHistory();
    window.setTimeout(makeBestMove, 500);

}
let onSnapEnd = () => {
    board.position(game.fen());
}


let config = {
    draggable: true,
    position: 'start',
    onMouseoutSquare,
    onMouseoverSquare,
    onDragStart,
    onDrop,
    onSnapEnd
}

board = ChessBoard('board', config);
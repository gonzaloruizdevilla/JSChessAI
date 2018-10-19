const pieceMap = {
    "k": 1,
    "q": 0.83,
    "r": 0.66,
    "n": 0.5,
    "b": 0.33,
    "p": 0.16,
    "1": 0,
    "P": -0.16,
    "B": -0.33,
    "N": -0.5,
    "R": -0.66,
    "Q": -0.83,
    "K": -1
}


function getBoardState(boardState) {
    boardState = boardState.replace(/\//g, "");
    let [boardPieces, currentPlayer, _2, _3, extra, moveNumber] = boardState.split(" ");
    let extendedBoard = new Float32Array(512);
    boardPieces = boardPieces.replace(/2/g, "11")
    boardPieces = boardPieces.replace(/3/g, "111")
    boardPieces = boardPieces.replace(/4/g, "1111")
    boardPieces = boardPieces.replace(/5/g, "11111")
    boardPieces = boardPieces.replace(/6/g, "111111")
    boardPieces = boardPieces.replace(/7/g, "1111111")
    boardPieces = boardPieces.replace(/8/g, "11111111")

    for (let i = 0; i < 64; i++) {
        let v = pieceMap[boardPieces[i]]
        extendedBoard[i] = v;
        if (v == 0) {
            //blank
            extendedBoard[i + 64] = 1
        } else if (v < 0) {
            //white
            extendedBoard[i + 128] = 1
        } else {
            //black
            extendedBoard[i + 192] = 1
        }
    }

    let current = (currentPlayer == 'w') ? 1 : -1;

    for (let i = 256; i < 320; i++) {
        extendedBoard[i] = current;
    }

    extra = +extra
    for (let i = 320; i < 384; i++) {
        extendedBoard[i] = extra / 50
    }

    moveNumber = (+moveNumber) / 100
    for (let i = 384; i < 448; i++) {
        extendedBoard[i] = moveNumber
    }

    return extendedBoard;

}
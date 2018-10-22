# Source code of my JSDayES talk about AI and Chess

You can find the slides of the talk here: https://slides.com/gruizdevilla/chess-ai-with-javascript/

What you've just checkout is the final version of the code. If you want to replay, checkout the tag `base_for_exercise`.

You can replay the talk, advancing commit by commit from `base_for_exercise`.

All the code has to be implemented in `main.js`.

The files included in the project are the following:

* `index.html`: where you can see everything happening
* `main.css`: few custom styles
* `main.js`: where you should code everything
* `js\chess.js`: Chess.js library. Game engine
* `js\chessboard.js`: Library to draw the chessboard on screen
* `js\jquery.js`: dependency of chessboard.js
* `js\tfjs.js`: TensorFlow.js 
* `js\labels.js`: Labels of all available movements in Chess for DNN model
* `js\boardstate.js`: function that converts FEN string to an array for the DNN model.
* `models\chess-model-1.json`: Tensorflow model that predicts next best move for a chessboard.
* `models\chess-model-1.weights.json`: Tensorflow  weights for the previous model.

## Some tips for the different steps

### Chessboard 
Constructor receives two parameters:

* fist one is the id of the HTML element where the chessboard is going to be drawn
* for the second one use the string "start" or the next config object, and then implement:

```
let config = {
    draggable: true,
    position: 'start',
    onMouseoutSquare,
    onMouseoverSquare,
    onDragStart,
    onDrop,
    onSnapEnd
}
```

It is very easy to get a certain square because all the squares had a class like `square-b4`, being `b4` the square coordinates.

### Chess.js
These methods can be useful:

* `moves([options])`: returns a list of legal moves from the current position. Options is optional and the attributes are: `square` to limit to movements of the piece in that square, and `verbose`, a boolean to indicate if you want FEN notation of movement or an object with `{from,to}`
* `move(move)`: to apply a move. returns null if movement is not valid. Accepts string or object (like the ones returned by `moves`)
* `undo()`: undoes the last move
* `history()`: returns a list containing the moves of the current game
* `fen()`: returns the FEN string for the current position
* `game_over()`: returns true if the game has ended via checkmate, stalemate, draw, threefold repetition, or insufficient material. 


### Boardstate

* `getBoardState(fenStr)`: given a FEN string, returns the array that should be used with the TFJS model.

### TensorFlow.js

* `tf.loadModel(modelUrl)`: loads the model and it's weights. Needs only the model url.
* `model.predict(tensor)`: make a prediction
* `tf.tensor4d(arr, [numBoards, 8,8,8])`: the model has 8*8*8 (board size * 8 features)
* `tf.argMax(arr)`: return a tensor with a scalar of the position with the hightest value of the array

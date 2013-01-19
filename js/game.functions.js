var game;
if (!game) game = {};
game.functions = function() {
    var settings = {
        "xlen": 7,
        "ylen": 6,
        "winWith": 4
    };

    var players = {
        "player1": 1,
        "player2": 2
    }

    /*
     * Generates a control board and initializes the player in 1
     * */
    function initGame() {
        board = [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
            ];
            player = "player1";
            return board;
    }
    /*
     * Updates the visual board
     * */
    function updateView(row, column, player) {
        changeID = "c" + column;
        console.log(row);
        console.log(column);
        console.log(changeID);
    }
    /*
     * Updates the abstract board and manages the 
     * html presentation of the cells
     * */
    function play(board, player, elemID, column) {
        matrixCol = board[column];

        counter = 0
        if (matrixCol[0] == 0) {
            matrixCol[0] = players[player];
        } else if (!matrixCol[matrixCol.length - 1]){
            while (counter < settings["ylen"]) {
                if (matrixCol[counter]) {
                    counter = counter + 1;
                } else {
                    break;
                }
            }
            matrixCol[counter] = players[player];
        }
        updateView(counter + 1, column + 1, player);
        return board;
    }
    /*
     *  Changes the current player
     * */
    function shiftPlayer(curPlayer) {
        if (curPlayer === "player1") {
            return "player2";
        }
        return "player1";
    }

    return {
        initGame: function() {
            initGame();
        },
        shiftPlayer: function(current) {
            return shiftPlayer(current);
        },
        play: function(board, player, elemID, column) {
            return play(board, player, elemID, column);
        }
    }
}()

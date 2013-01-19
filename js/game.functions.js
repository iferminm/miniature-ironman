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
            playCount = 0;
            return board;
    }
    /*
     * Updates the visual board
     * */
    function updateView(column, player) {
        changeCol = ".col" + column;
        console.log(changeCol);
        colElements = $(changeCol);
        initValue = colElements.length - 1;
        for (var i = initValue; i >= 0; i--) {
            console.log(colElements[i].id)
            currentElement = $("#"+colElements[i].id);
            if (!currentElement.hasClass(".player1") && !currentElement.hasClass(".player2")) {
                currentElement.addClass(player);
                break;
            }
        };
    }
    /*
     * Updates the abstract board and manages the 
     * html presentation of the cells
     * */
    function play(board, player, elemID, column) {
        matrixCol = board[column];

        counter = 0;
        if (matrixCol[0] == 0) {
            matrixCol[0] = players[player];
        } else if (!matrixCol[matrixCol.length - 1]){
            while (counter < settings["ylen"]) {
                if (matrixCol[counter]) {
                    counter++;
                } else {
                    break;
                }
            }
            matrixCol[counter] = players[player];
        }
        updateView(column + 1, player);
        playCount++;
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

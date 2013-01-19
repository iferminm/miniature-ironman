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
            gameOver = false;
            playCount = 0;
            return board;
    }
    /*
     * Updates the visual board
     * DOM manipulation is expensive, but
     * didn't find out another way to do this
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
    /*
     * This segment detects horizontal winning
     * *****************************************************/
    // Could be done with a cycle and this way 
    // it is configurable throught settings[withWith]
    function hCheckRow(board, X, Y, player) {
        next1 = board[X + 1][Y] == player;
        next2 = board[X + 2][Y] == player;
        next3 = board[X + 3][Y] == player;
        return next1 && next2 && next3;
    }
    function checkHorizontalWin(board, player) {
        xlimit = settings["xlen"] - settings["winWith"];
        ylimit = settings["ylen"];
        for (var y = 0; y < ylimit; y++) {
            for (var x = 0; x <= xlimit; x++) {
                if (board[x][y] == player && hCheckRow(board, x, y, player)) {
                    gameOver = true;
                    return true;
                }
            };
        };
        return false;
    }
    /*
     * This segment detects vertical winning
     * *****************************************************/
    // Could be done with a cycle and this way 
    // it is configurable throught settings[withWith], same as before
    function vCheckRow(board, X, Y, player) {
        next1 = board[X][Y + 1] == player;
        next2 = board[X][Y + 2] == player;
        next3 = board[X][Y + 3] == player;
        return next1 && next2 && next3;
    }
    function checkVerticalWin(board, player) {
        xlimit = settings["xlen"];
        ylimit = settings["ylen"] - settings["winWith"];
        for (var x = 0; x < xlimit; x++) {
            for (var y = 0; y <= ylimit; y++) {
                if (board[x][y] == player && vCheckRow(board, x, y, player)) {
                    gameOver = true;
                    return true;
                }
            };
        };
        return false;
    }
    /************************************************************************************/
    /* This segment checks for diagonal winning
     * I tried to restrict the search space to optimize it a little
     * bit, but everything still n^2.
     * *********************************************************************************/
    // Same as before, could be achieved with a loop
    // and parametrized with settings["winWith"]
    function checkDiagonalLeft(board, player, x, y) {
        console.log(board[x - 1][y + 1]);
        console.log(board[x - 2][y + 2]);
        console.log(board[x - 3][y + 3]);

        next1 = board[x - 1][y + 1] == player;
        next2 = board[x - 2][y + 2] == player;
        next3 = board[x - 3][y + 3] == player;
        return next1 && next2 && next3;
    }
    function checkDiagonalRight(board, player, x, y) {
        return false;
    }
    function checkDiagonalWin(board, player) {
        xlimit = settings["xlen"] - 1;
        ylimit = settings["ylen"] - settings["winWith"];
        for (var y = 0; y <= ylimit; y++) {
            for (var x = 0; x <= xlimit; x++) {
                if (board[x][y] == player) {
                    if (x >= settings["winWith"] - 1) {
                        console.log("revisare a la izquierda");
                        console.log("x=" + x + ", y=" + y + " value = " + player);
                        dl = checkDiagonalLeft(board, player, x, y);
                        if (dl) return true;
                    }
                    if (xlimit - x > settings["winWith"]) {
//                        dr = checkDiagonalRight(board, player, x, y);
//                        if (dr) return true;
                    }
                }
            };
        };
        return false;
    }
    /************************************************************************************/
    /*
     * Checks if the current player won
     * I know this algorithm is very expensive
     * I could have used another data structure to
     * store the player's moves and chain them
     * but I've already started and time is limited so
     * I have to stick with this naive algorithm.
     * I evaluate 4 x 4 sub-matrices checking for a 1 1 1 1
     * or a 2 2 2 2.
     * or at least lookup for the value and then check
     * on all directions
     * */
    function checkWin(board, player) {
        // The min number of turns to achieve
        // four in line is 7
        if (playCount >= 7) {
            playerValue = players[player];
            h = checkHorizontalWin(board, playerValue);
            v = checkVerticalWin(board, playerValue);
            d = checkDiagonalWin(board, playerValue);
            return h || v || d;
        }
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
        },
        checkWin: function(board, player) {
            return checkWin(board, player);
        }
    }
}()

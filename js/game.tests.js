var game;
if (!game) game = {};
game.tests = function() {

    function assertEquals(expected, given, message) {
        var prefix = (expected === given) ? "Pass: " : "Fail: ";
        console.log(prefix, message);
    }

    // Check game initialization
    game.functions.initGame();
    expectedBoard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];
    assertEquals(expectedBoard, board, "Checking the board initializarion"); // Fails and i don't know why
    assertEquals(false, gameOver, "Checking game over variable initialization");
    assertEquals(0, playCount, "Checking turn counter variable initialization");
    assertEquals("player1", player, "Checking first player initialization");
    // --------------------------------------------------------------------------------

    // Check play on column 1 with current player (1)
    board = game.functions.play(board, player, 0);
    assertEquals(board[0][0], 1, "Checking the play function, also updated view");

    //Check vertical win
    game.functions.initGame();
    board = game.functions.play(board, player, 0);
    player = game.functions.shiftPlayer(player);
    board = game.functions.play(board, player, 1);
    player = game.functions.shiftPlayer(player);
    board = game.functions.play(board, player, 0);
    player = game.functions.shiftPlayer(player);
    board = game.functions.play(board, player, 1);
    player = game.functions.shiftPlayer(player);
    board = game.functions.play(board, player, 0);

    assertEquals(true, game.functions.checkWin(board, player), "Check vertical win");
}
// Comment this to now run the tests
// Tests are shown on the console
//game.tests();

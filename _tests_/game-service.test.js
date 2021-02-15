const GameService = require('../service/game-service');


const gameService = new GameService();
const { test, expect } = require('@jest/globals');
const Board = require('../model/board');

test('Test board winner', () =>{ // Winner combinations
    let board = new Board()

    // Game has not begun, no winner
    let winner = gameService.determineWinner(board);
    expect(winner).toEqual(0);

    // Top line winner
    board = new Board();
    board.upper_left = 1;
    board.upper_mid = 1;
    board.upper_right = 1;
    winner = gameService.determineWinner(board);
    expect(winner).toEqual(1);

    // Top line loser
    board = new Board();
    board.upper_left = 1;
    board.upper_mid = 1;
    board.upper_right = 2;
    winner = gameService.determineWinner(board);
    expect(winner).toEqual(0);

    // Center line winner
    board = new Board();
    board.center_left = 1;
    board.center_mid = 1;
    board.center_right = 1;
    winner = gameService.determineWinner(board);
    expect(winner).toEqual(1);

    // Lower line winner
    board = new Board();
    board.lower_left = 1;
    board.lower_mid = 1;
    board.lower_right = 1;
    winner = gameService.determineWinner(board);
    expect(winner).toEqual(1);

      // Left line winner
      board = new Board();
      board.upper_left = 1;
      board.center_left = 1;
      board.lower_left = 1;
      winner = gameService.determineWinner(board);
      expect(winner).toEqual(1);

      // Left line diagonal winner
      board = new Board();
      board.upper_left = 1;
      board.center_mid = 1;
      board.lower_right = 1;
      winner = gameService.determineWinner(board);
      expect(winner).toEqual(1);

      // Right line diagonal winner
      board = new Board();
      board.upper_right = 1;
      board.center_mid = 1;
      board.lower_left = 1;
      winner = gameService.determineWinner(board);
      expect(winner).toEqual(1);

    console.log("game test passed");
});

test('Test game over', () =>{
    board = new Board();
    val = gameService.isGameOver(board);
    expect(val).toEqual(false);
});

test('Player makes a valid move', () => {
    board = new Board();
    const move = 'playersMove';

});

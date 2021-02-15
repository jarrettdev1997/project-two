const Board = require("../model/Board");

class GameService {
determineAWinner(board, player) {
  if (
    board.upper_left === player &&
    board.upper_mid === player &&
    board.upper_right === player
  ) {
    return true;
  }
  if (
    board.center_left === player &&
    board.center_mid === player &&
    board.center_right === player
  ) {
    return true;
  }
  if (
    board.lower_left === player &&
    board.lower_mid === player &&
    board.lower_right === player
  ) {
    return true;
  }
  if (
    board.upper_left === player &&
    board.center_left === player &&
    board.lower_left === player
  ) {
    return true;
  }
  if (
    board.upper_mid === player &&
    board.center_mid === player &&
    board.lower_mid === player
  ) {
    return true;
  }
  if (
    board.upper_right === player &&
    board.center_right === player &&
    board.lower_right === player
  ) {
    return true;
  }
  if (
    board.upper_left === player &&
    board.center_mid === player &&
    board.lower_right === player
  ) {
    return true;
  }
  if (
    board.upper_right === player &&
    board.center_mid === player &&
    board.lower_left === player
  ) {
    return true;
  }
  return false;
}

isGameOver(board) {
  const retValue = (
    board.upper_left !== 0 &&
    board.upper_mid !== 0 &&
    board.upper_right !== 0 &&
    board.center_left !== 0 &&
    board.center_mid !== 0 &&
    board.center_right !== 0 &&
    board.lower_left !== 0 &&
    board.lower_mid !== 0 &&
    board.lower_right !== 0
  ); 
  console.log("xxx " + retValue);
  return retValue;
}

determineWinner (board) {
    if (this.determineAWinner(board, 1)) {
      return 1;
    }
    if (this.determineAWinner(board, 2)) {
      return 2;
    }
    return 0;
  }

isMoveValid (move, board) {
  //return true;
  //console.log(`move is ${move} ${JSON.stringify(board)}`);
    if (move === 0 && board.upper_left === 0) {
    return true;
  } else if (move === 1 && board.upper_mid === 0) {
    return true;
  } else if (move === 2 && board.upper_right === 0) {
    return true;
  } else if (move === 3 && board.center_left === 0) {
    return true;
  } else if (move === 4 && board.center_mid === 0) {
    return true;
  } else if (move === 5 && board.center_right === 0) {
    return true;
  } else if (move === 6 && board.lower_left === 0) {
    return true;
  } else if (move === 7 && board.lower_mid === 0) {
    return true;
  } else if (move === 8 && board.lower_right === 0) {
    return true;
  } else {
    return false;
  }
}
}

  module.exports =  GameService;

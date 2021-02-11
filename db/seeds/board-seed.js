const Board = require('../../model/Board');

const boardData = {
    upper_left: false,
    upper_mid: false,
    upper_right: false,
    center_left: false,
    center_mid: false,
    center_right: false,
    lower_left: false,
    lower_mid: false,
    lower_right: false,
};

const seedBoard = () => Board.create(boardData);

module.exports = seedBoard;
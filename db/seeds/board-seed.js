const Board = require('../../model/Board');

const boardData = {
    left: false,
    mid: false,
    right: false
};

const seedBoard = () => Board.create(boardData);

module.exports = seedBoard;
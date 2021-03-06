const Board = require('../../model/Board');

const boardData = [
    {
        upper_left: 0,
        upper_mid: 0,
        upper_right: 0,
        center_left: 0,
        center_mid: 0,
        center_right: 0,
        lower_left: 0,
        lower_mid: 0,
        lower_right: 0,
    },
    {
        upper_left: 1,
        upper_mid: 1,
        upper_right: 1,
        center_left: 0,
        center_mid: 2,
        center_right: 0,
        lower_left: 2,
        lower_mid: 0,
        lower_right: 0,
    },
    {
        upper_left: 1,
        upper_mid: 0,
        upper_right: 0,
        center_left: 1,
        center_mid: 2,
        center_right: 0,
        lower_left: 2,
        lower_mid: 0,
        lower_right: 0,
    }
];

const seedBoard = () => Board.bulkCreate(boardData);

module.exports = seedBoard;
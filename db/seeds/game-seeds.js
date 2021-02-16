const Game = require('../../model/Game');

const gameData = [
    {
        status: 'not_started',
        owner_id: 2,
        friend_id: 1,
        board_id: 1,
    },
    {
        status: 'in_progress',
        owner_id: 1,
        friend_id: 2,
        board_id: 3,
    },
    {
        status: 'finished',
        owner_id: 3,
        friend_id: 2,
        board_id: 2,
        winner_id: 2,
        loser_id: 3
    }
];

const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;
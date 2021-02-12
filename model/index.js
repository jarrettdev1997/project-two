const User = require('./User');
const Board = require('./Board');
const Game = require('./Game');

User.hasMany(Game, {
    as: 'game_owner',
    foreignKey: 'owner_id'
})
User.hasMany(Game, {
    as: 'friend',
    foreignKey: 'friend_id'
})
User.hasMany(Game, {
    as: 'winner',
    foreignKey: 'winner_id'
})
User.hasMany(Game, {
    as: 'loser',
    foreignKey: 'loser_id'
})

Game.belongsTo(User, {
    as: 'game_owner',
    foreignKey: 'owner_id'
})
Game.belongsTo(User, {
    as: 'friend',
    foreignKey: 'friend_id'
})
Game.belongsTo(User, {
    as: 'winner',
    foreignKey: 'winner_id'
})
Game.belongsTo(User, {
    as: 'loser',
    foreignKey: 'loser_id'
})

Game.belongsTo(Board, {
    foreignKey: 'board_id'
})


module.exports = { User, Board, Game }
const User = require('./User');
const Board = require('./Board');
const Game = require('./Game');

User.hasMany(Game, {
    foreignKey: 'owner_id'
})
User.hasMany(Game, {
    foreignKey: 'friend_id'
})
User.hasMany(Game, {
    foreignKey: 'winner_id'
})
User.hasMany(Game, {
    foreignKey: 'loser_id'
})

Game.belongsTo(User, {
    foreignKey: 'owner_id'
})
Game.belongsTo(User, {
    foreignKey: 'friend_id'
})
Game.belongsTo(User, {
    foreignKey: 'winner_id'
})
Game.belongsTo(User, {
    foreignKey: 'loser_id'
})

Game.belongsTo(Board, {
    foreignKey: 'board_id'
})


module.exports = { User, Board, Game }
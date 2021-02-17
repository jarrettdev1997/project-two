const router = require('express').Router();
const { Game, Board, User } = require('../model');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) => {
    Game.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'status'],
        include: [
            {
                model: Board,
            },
            {
                model: User,
                as: 'game_owner',
                attributes: { exclude: ['password']}
            },
            {
                model: User,
                as: 'friend',
                attributes: { exclude: ['password']}
            },
            {
                model: User,
                as: 'winner',
                attributes: { exclude: ['password']}
            },
            {
                model: User,
                as: 'loser',
                attributes: { exclude: ['password']}
            }
        ]
    })
    .then(dbGameData => {
        const game = dbGameData.get({ plain: true })
        if (game.game_owner.id !== req.session.user_id && game.friend.id !== req.session.user_id) {
            res.render('400', { session: req.session, statusText: 'You do not have access to the game you requested!'})
            return
        }
        res.render('game', game)
    })  
})

module.exports = router
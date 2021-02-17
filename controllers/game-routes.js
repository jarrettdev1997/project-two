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
        if (dbGameData.owner_id !== req.session.user_id || dbGameData.friend_id !== req.session.user_id) {
            res.status(400).json({ statusText: 'You do not have access to this game!'})
            return
        }
        const game = dbGameData.get({ plain: true })
        res.render('game', game)
    })  
})

module.exports = router
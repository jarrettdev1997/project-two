const router = require('express').Router();
const { User, Game } = require('../model')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true }))
        Game.findAll()
        .then(dbData => {
            const games = dbData.map(game => game.get({ plain: true }))
            res.render('homepage', {
                users,
                games
            })
        })
    })
})

module.exports = router
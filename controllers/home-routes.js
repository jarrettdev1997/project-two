const router = require('express').Router();
const { User, Board } = require('../model')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true }))
        Board.findAll()
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
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

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard')
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {    
    if(req.session.loggedIn) {
        res.redirect('/dashboard')
        return
    }
    res.render('signup')
})

module.exports = router
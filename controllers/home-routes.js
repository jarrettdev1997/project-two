const router = require('express').Router();
const { User, Board } = require('../model')

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => {
        const users = dbUserData.map(user => user.get({ plain: true }))
        res.render('homepage', {
            users
        })
    })
    
})

router.get('/boards', (req, res) => {
    Board.findAll()
    .then(dbBoardData => {
        const boards = dbBoardData.map(board => board.get({ plain: true }))
        res.render('board', {
            boards
        })
    })
    
})

module.exports = router
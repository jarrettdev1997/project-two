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

router.get('/boards/:id', (req, res) => {
    Board.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbBoardData => {
        const board = dbBoardData.get({ plain: true })
        res.render('board', board)
    })  
})

module.exports = router
const router = require('express').Router();
const { Board } = require('../model')

router.get('/:id', (req, res) => {
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
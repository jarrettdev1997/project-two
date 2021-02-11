const router = require('express').Router();
const { Board } = require('../../model')
// const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    Board.findAll()
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.get('/:id', (req, res) => {
    Board.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.post('/', (req, res) => {
    Board.create({
        left: req.body.left,
        mid: req.body.mid,
        right: req.body.right
    })
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.put('/:id', (req, res) => {
    Board.update({
        left: req.body.left,
        mid: req.body.mid,
        right: req.body.right
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbBoardData => res.json(dbBoardData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

module.exports = router
const router = require('express').Router();
const { Game, User, Board } = require('../../model')
// const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    Game.findAll({
        include: [
            {
                model: Board,
            },
            {
                model: User
            }
        ]
    })
    .then(dbGameData => res.json(dbGameData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.get('/:id', (req, res) => {
    Game.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Board,
            },
            {
                model: User
            }
        ]
    })
    .then(dbGameData => res.json(dbGameData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.post('/', (req, res) => {
    Board.create({
        upper_left: 0,
        upper_mid: 0,
        upper_right: 0,
        center_left: 0,
        center_mid: 0,
        center_right: 0,
        lower_left: 0,
        lower_mid: 0,
        lower_right: 0,
    })
    .then(dbBoardData => {
        Game.create({
            status: 'not_started',
            owner_id: req.session.user_id,
            friend_id: req.body.friend_id,
            board_id: dbBoardData.id,
        })
        .then(dbGameData => res.json(dbGameData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.put('/:id', (req, res) => {
    Game.update({
        status: req.body.status,
        winner_id: req.body.winner_id,
        loser_id: req.body.loser_id
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbGameData => res.json(dbGameData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

module.exports = router
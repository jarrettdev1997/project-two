const router = require('express').Router();
const { Game, User, Board } = require('../../model')
// const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    Game.findAll({
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
                as: 'whosTurn',
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
                as: 'whosTurn',
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
    .then(dbGameData => res.json(dbGameData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

router.post('/', async (req, res) => {
    const newBoard = await Board.create({
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
    if (!newBoard) {
        res.status(500).json(err)
        return
    }
    const friendUser = await User.findOne({
        where: {
            username: req.body.friend_username
        }
    })
    if (!friendUser) {
        res.status(500).json(err)
        return
    }

    const newGame = await Game.create({
        status: 'not_started',
        owner_id: req.session.user_id,
        friend_id: friendUser.id,
        whosTurn_id: 1,
        board_id: newBoard.id,
    })
    if (!newGame) {
        res.status(500).json(err)
        return
    }

    res.json(newGame)
})

router.put('/:id', (req, res) => {
    Game.update({
        status: req.body.status,
        whosTurn_id: 2,
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

router.put('/final/:id', (req, res) => {
    Game.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(gameData => {
        const game = gameData.get({ plain: true })

        let winner_id = null;
        let loser_id = null;

        if (req.body.winner === 'owner') {
            winner_id = game.owner_id;
            loser_id = game.friend_id
        } else if (req.body.winner === 'friend') {
            loser_id = game.owner_id;
            winner_id = game.friend_id
        }

        return Game.update({
            status: req.body.status,
            winner_id,
            loser_id
        },
        {
            where: {
                id: req.params.id
            }
        })
    })
    .then(dbGameData => res.json(dbGameData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

module.exports = router
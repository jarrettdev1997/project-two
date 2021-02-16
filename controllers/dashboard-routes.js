const router = require('express').Router();
const { Op } = require("sequelize");
const { getStats, getGameHistory } = require('../utils/functions')
const { User, Game } = require('../model')

router.get('/', (req, res) => {    
    // if(!req.session.loggedIn) {
    //     res.redirect('/login')
    //     return
    // }
    // res.redirect(`/dashboard/${req.session.user_id}`)
    const games = [
        {
          id: 1,
          status: "not_started",
          owner_id: 2,
          friend_id: 1,
          board_id: 1,
          winner_id: null,
          loser_id: null,
          createdAt: "2021-02-16T15:09:27.000Z",
          updatedAt: "2021-02-16T15:09:27.000Z",
          game_owner: {
            id: 2,
            username: "jarrett"
          },
          friend: {
            id: 1,
            username: "melanie"
          }
        },
        {
          id: 2,
          status: "in_progress",
          owner_id: 1,
          friend_id: 2,
          board_id: 3,
          winner_id: null,
          loser_id: null,
          createdAt: "2021-02-16T15:09:27.000Z",
          updatedAt: "2021-02-16T15:09:27.000Z",
          game_owner: {
            id: 1,
            username: "melanie"
          },
          friend: {
            id: 2,
            username: "jarrett"
          }
        },
        {
          id: 3,
          status: "finished",
          owner_id: 3,
          friend_id: 2,
          board_id: 2,
          winner_id: 2,
          loser_id: 3,
          createdAt: "2021-02-16T15:09:27.000Z",
          updatedAt: "2021-02-16T15:09:27.000Z",
          game_owner: {
            id: 3,
            username: "david"
          },
          friend: {
            id: 2,
            username: "jarrett"
          },
          winner: {
            id: 2,
            username: "jarrett"
          },
          loser: {
            id: 3,
            username: "david"
          }
        }
    ]
    const WLT = getStats(games, 2)
    const history = getGameHistory(games, 2)
    res.render('dashboard', { WLT, history })
})


router.get('/:id', (req, res) => {    
    if(!req.session.loggedIn) {
        res.redirect('/login')
        return
    }

    Game.findAll({
        where: {
            [Op.or]: [
                { owner_id: req.params.id },
                { friend_id: req.params.id }
            ]           
        },
        include: [
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
        const WLT = getStats(dbGameData, req.session.user_id)
        const history = getGameHistory(dbGameData, req.session.user_id)
        res.render('dashboard', { WLT, history })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

module.exports = router
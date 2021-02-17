const router = require('express').Router();
const { Op } = require("sequelize");
const { getStats, getGameHistory } = require('../utils/functions')
const { User, Game } = require('../model')

router.get('/', (req, res) => {    
    if(!req.session.loggedIn) {
        res.redirect('/login')
        return
    }
    res.redirect(`/dashboard/${req.session.user_id}`)

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
        res.render('dashboard', { 
          session: req.session, 
          WLT, 
          history 
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
})

module.exports = router
const router = require('express').Router();
const { User } = require('../model')

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

module.exports = router
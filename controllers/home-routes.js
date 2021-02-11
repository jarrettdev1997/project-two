const router = require('express').Router();
const { User } = require('../model')

router.get('/', (req, res) => {
    res.render('homepage')
})

module.exports = router
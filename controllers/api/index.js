const router = require('express').Router();

const userRoutes = require('./user-routes');
const boardRoutes = require('./board-routes');
const gameRoutes = require('./game-routes');

router.use('/users', userRoutes);
router.use('/boards', boardRoutes);
router.use('/games', gameRoutes)

module.exports = router
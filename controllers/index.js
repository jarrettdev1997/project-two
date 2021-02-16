const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes')
const gameRoutes = require('./game-routes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/games', gameRoutes);

router.use((req, res) => {
    res.status(404).end()
})

module.exports = router;
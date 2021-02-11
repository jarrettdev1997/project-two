const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const boardRoutes = require('./board-routes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/boards', boardRoutes);

router.use((req, res) => {
    res.status(404).end()
})

module.exports = router;
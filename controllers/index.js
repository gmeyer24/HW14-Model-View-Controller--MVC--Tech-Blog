const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./page-routes.js');

router.use('/', pageRoutes);
router.use('/api', apiRoutes);

module.exports = router;

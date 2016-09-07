const express = require('express');
const router = express.Router();

router.use('/oauth', require('./authentication.js'));
router.use('/bill', require('./bill'));
router.use('/user', require('./user'));
router.use('/group', require('./group'))

module.exports = router;
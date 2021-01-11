const express = require('express');
const router = express.Router();

router.get('/', require('./getEvent'));
router.get('/get_all', require('./getAllEvents'));

module.exports = router;
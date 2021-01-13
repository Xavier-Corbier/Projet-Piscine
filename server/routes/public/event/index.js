const express = require('express');
const router = express.Router();

router.get('/', require('./getEventId'));
router.get('/get_all', require('./getAllEvents'));
router.get('/get_by_promo', require('./getEventByPromo'));

module.exports = router;
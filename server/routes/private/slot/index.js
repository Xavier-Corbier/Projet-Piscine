const express = require('express');
const router = express.Router();

router.get('/', require('./getAllSlots'));
router.get('/get_from_event', require('./getAllSlotsFromEvent'));

module.exports = router;
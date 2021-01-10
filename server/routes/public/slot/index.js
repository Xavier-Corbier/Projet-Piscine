const express = require('express');
const router = express.Router();

router.get('/', require('../../public/slot/getAllSlots'));
router.get('/get_from_event', require('../../public/slot/getAllSlotsFromEvent'));

module.exports = router;
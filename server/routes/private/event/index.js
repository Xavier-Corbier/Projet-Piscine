const express = require('express');
const router = express.Router();

router.post('/', require('./createEvent'));
router.put('/', require('./updateEvent'));
router.delete('/', require('./deleteEvent'));

module.exports = router;
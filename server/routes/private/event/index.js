const express = require('express');
const router = express.Router();
const eventController = require('../../../controllers/eventController');

router.post('/', require('./createEvent'));
router.get('/', require('./getEvent'));
router.get('/get_all', require('./getAllEvents'));
router.put('/', require('./updateEvent'));
router.delete('/', require('./deleteEvent'));

module.exports = router;
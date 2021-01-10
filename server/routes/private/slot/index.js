const express = require('express');
const router = express.Router();

router.put('/', require('./updateSlot'));

module.exports = router;
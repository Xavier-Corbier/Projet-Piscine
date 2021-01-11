const express = require('express');
const router = express.Router();

router.post('/', require('./createSlot'));
router.put('/', require('./updateSlot'));
router.delete('/', require('./deleteSlot'));

module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/', require('./createSlot'));
router.put('/update', require('./updateSlot'));
router.put('/addJury', require('./addJuryToSlot'));
router.put('/deleteJury',require('./deleteJuryToSlot'))
router.delete('/', require('./deleteSlot'));

module.exports = router;

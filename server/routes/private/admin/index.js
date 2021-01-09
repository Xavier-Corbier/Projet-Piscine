const express = require('express');
const router = express.Router();

router.put('/updatePassword', require('./updatePassword'));
router.put('/', require('./updateAdmin'));

module.exports = router;

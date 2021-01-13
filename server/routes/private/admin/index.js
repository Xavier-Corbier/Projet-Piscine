const express = require('express');
const router = express.Router();

router.put('/updatePassword', require('./updatePassword'));
router.put('/', require('./updateAdmin'));
router.get('/', require('./getAdmin'));

module.exports = router;

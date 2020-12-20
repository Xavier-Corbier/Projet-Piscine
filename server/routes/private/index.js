const express = require('express');
const router = express.Router();

router.use('/event', require('./event'));
router.use('/group', require('./group'));
router.use('/promo', require('./promo'));
router.use('/slot', require('./slot'));
router.use('/student', require('./student'));
router.use('/teacher', require('./teacher'));

module.exports = router;

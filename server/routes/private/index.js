const express = require('express');
const router = express.Router();

router.use('/student', require('./student'));
router.use('/promo', require('./promo'));
router.use('/teacher', require('./teacher'));
router.use('/group', require('./group'));

module.exports = router;

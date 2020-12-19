const express = require('express');
const router = express.Router();

router.use('/student', require('./student'));
router.use('/promo', require('./promo'));

module.exports = router;

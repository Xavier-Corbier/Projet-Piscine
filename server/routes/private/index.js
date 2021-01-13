const express = require('express');
const router = express.Router();

router.use('/event', require('../../middleware/adminAuth'), require('./event'));
router.use('/group', require('./group'));
router.use('/slot', require('../../middleware/adminAuth'), require('./slot'));
router.use('/student', require('./student'));
router.use('/teacher', require('./teacher'));

//reserved for admin
router.use('/admin', require('../../middleware/adminAuth'), require('./admin'));

module.exports = router;

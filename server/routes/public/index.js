const express = require('express');
const router = express.Router();

router.use('/auth', require("./auth"));
router.use('/slot', require('./slot'));
router.use('/event', require('./event'));
router.use('/teacher', require('./teacher'));
router.use('/group', require('./group'));

module.exports =  router;

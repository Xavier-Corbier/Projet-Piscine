const express = require('express');
const router = express.Router();

router.use('/auth', require("./auth"));
router.use('/slot', require('./slot'));
router.use('/event', require('./event'));

module.exports =  router;

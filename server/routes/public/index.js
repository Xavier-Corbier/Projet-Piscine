const express = require('express');
const router = express.Router();

//router.use('/publicCalendar', require("./calendar"));
router.use('/auth', require("./auth"));
router.use('/slot', require('./slot'));

module.exports =  router;

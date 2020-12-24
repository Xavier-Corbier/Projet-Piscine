const express = require('express');
const router = express.Router();

//router.use('/publicCalendar', require("./calendar"));
router.use('/auth', require("./auth"));

module.exports =  router;

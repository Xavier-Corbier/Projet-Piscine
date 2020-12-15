const express = require('express');
const router = express.Router();

router.post('/add', require('./addStudent').addStudent);

module.exports = router;

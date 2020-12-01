const express = require('express');
const router = express.Router();

router.post('/', require('./addStudent'));

module.exports = router;

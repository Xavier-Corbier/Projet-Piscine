const express = require('express');
const router = express.Router();

router.post('/create', require('./createStudent'));
router.delete('/delete', require('./deleteStudent'));
router.get('/byName', require('./getStudentByName'));

module.exports = router;

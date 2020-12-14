const express = require('express');
const router = express.Router();

router.post('/add', require('./addStudent'));
router.delete('/delete', require('./deleteStudent'));
router.get('/byName', require('./getStudentByName'));

module.exports = router;

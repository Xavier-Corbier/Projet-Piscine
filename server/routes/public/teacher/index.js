const express = require('express');
const router = express.Router();

router.get('/', require('./getTeacher'));
router.get('/idTeacher', require('./getTeacherId'));

module.exports =  router;

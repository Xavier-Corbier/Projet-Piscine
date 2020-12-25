const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.put('/', require('./updateStudent')); // update
router.put('/addGroup/:id', require('./addGroupToStudent'))
router.delete('/', require('./deleteStudent')); // delete
router.get('/', require('./getStudentById'));

//Reserved for admin
router.get('/', require('./getAllStudents')); // read

module.exports = router;

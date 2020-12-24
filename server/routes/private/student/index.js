const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.post('/', require('./createStudent')); // create
router.put('/:id', require('./updateStudent')); // update
router.put('/addGroup/:id', require('./addGroupToStudent'))
router.delete('/:id', require('./deleteStudent')); // delete

router.get('/', require('./getAllStudents')); // read
router.get('/:id', require('./getStudentById'));

module.exports = router;

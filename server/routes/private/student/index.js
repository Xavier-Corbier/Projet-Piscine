const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.post('/', require('./createStudent')); // create
router.get('/', studentController.getStudent); // read
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent) // update
router.delete('/:id', studentController.deleteStudent) // delete

module.exports = router;

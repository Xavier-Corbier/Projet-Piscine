const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.post('/', studentController.addStudent); // create
router.get('/:id', studentController.getStudent); // read
router.put('/:id', studentController.updateStudent) // update
router.delete('/:id', studentController.deleteStudent) // delete

module.exports = router;

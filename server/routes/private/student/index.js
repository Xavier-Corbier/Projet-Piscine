const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.post('/', studentController.addStudent); // create
router.get('/', studentController.getStudent); // read
router.put('/', studentController.updateStudent) // update
router.delete('/', studentController.deleteStudent) // delete

module.exports = router;

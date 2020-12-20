const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.post('/', studentController.addStudent);
router.get('/:id', studentController.getStudent);
router.put('/id:', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
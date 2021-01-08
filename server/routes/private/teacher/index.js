const express = require('express');
const router = express.Router();
const teacherController = require('../../../controllers/teacherController');

router.post('/', require("./addTeacher"));// Create   (ok)
router.get('/', require('./getTeacher')); // Read     (ok)
router.put('/:idTeacher', require('./updateTeacher')); // Update    (ok)
router.delete('/:idTeacher', require('./deleteTeacher')); // Delete (ok)
router.get('/lastName', require('./getTeacherByLastName')); //   (ok)
router.put('/addSlot/:idTeacher', require('./addSlotToTeacher')); //    (ok)
router.put('/removeSlot/:idTeacher', require('./deleteSlotToTeacher')); //    (ok)

module.exports = router;

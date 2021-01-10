const express = require('express');
const router = express.Router();

//routes Admin
router.post('/',require('../../../middleware/adminAuth'), require("./addTeacher"));// Create   (ok)
router.get('/',require('../../../middleware/adminAuth'), require('./getTeacher')); // Read     (ok)
router.put('/:idTeacher',require('../../../middleware/adminAuth'), require('./updateTeacher')); // Update    (ok)
router.delete('/:idTeacher',require('../../../middleware/adminAuth'), require('./deleteTeacher')); // Delete (ok)
router.get('/:idTeacher',require('../../../middleware/adminAuth'), require('./getTeacherId')); //   (ok)
router.put('/addSlot/:idTeacher',require('../../../middleware/adminAuth'), require('./addSlotToTeacher')); //    (ok)
router.put('/removeSlot/:idTeacher',require('../../../middleware/adminAuth'), require('./deleteSlotToTeacher')); //    (ok)

module.exports = router;

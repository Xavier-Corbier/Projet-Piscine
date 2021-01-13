const express = require('express');
const router = express.Router();

//routes Admin
router.post('/',require('../../../middleware/adminAuth'), require("./addTeacher"));// Create   (ok)
router.get('/',require('../../../middleware/adminAuth'), require('./getTeacher')); // Read     (ok)
router.put('/',require('../../../middleware/adminAuth'), require('./updateTeacher')); // Update    (ok)
router.delete('/',require('../../../middleware/adminAuth'), require('./deleteTeacher')); // Delete (ok)
router.get('/',require('../../../middleware/adminAuth'), require('./getTeacherId')); //   (ok)
router.put('/addSlot',require('../../../middleware/adminAuth'), require('./addSlotToTeacher')); //    (ok)
router.put('/removeSlot',require('../../../middleware/adminAuth'), require('./deleteSlotToTeacher')); //    (ok)

module.exports = router;

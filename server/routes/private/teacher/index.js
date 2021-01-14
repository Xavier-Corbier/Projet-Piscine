const express = require('express');
const router = express.Router();

//Routes uniquement disponibles pour les admins
router.post('/',require('../../../middleware/adminAuth'), require("./addTeacher"));// Create   (ok)
router.put('/',require('../../../middleware/adminAuth'), require('./updateTeacher')); // Update    (ok)
router.delete('/',require('../../../middleware/adminAuth'), require('./deleteTeacher')); // Delete (ok)

router.put('/addSlot',require('../../../middleware/adminAuth'), require('./addSlotToTeacher')); //    (ok)
router.put('/removeSlot',require('../../../middleware/adminAuth'), require('./deleteSlotToTeacher')); //    (ok)

module.exports = router;

const express = require('express');
const router = express.Router();

// Routes publiques
router.post('/', require('./addGroup')); // Create    ok
router.put('/:idGroup', require('./updateGroup')); // Update    ok
router.delete('/:idGroup', require('./deleteGroup')); // Delete    ok
router.put('/addSlot/:idGroup', require('./addSlotToGroup'));//   (ok)
router.put('/removeSlot/:idGroup', require('./deleteSlotToGroup'));//   (ok)
router.put('/addStudent/:idGroup', require('./addStudentToGroup'));//    ok
router.put('/removeStudent/:idGroup', require('./deleteStudentToGroup'));//   ok
// Routes Admin
router.get('/',require('../../../middleware/adminAuth'), require('./getGroup')); // Read       ok
router.get('/:idGroup',require('../../../middleware/adminAuth'), require('./getGroupById'));//    ok


module.exports = router;
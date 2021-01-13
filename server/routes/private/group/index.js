const express = require('express');
const router = express.Router();

// Routes publiques
router.post('/', require('./addGroup')); // Create    ok
router.put('/update', require('./updateGroup')); // Update    ok
router.delete('/', require('./deleteGroup')); // Delete    ok
router.put('/addSlot', require('./addSlotToGroup'));//   (ok)
router.put('/removeSlot', require('./deleteSlotToGroup'));//   (ok)

router.put('/addStudent', require('./addStudentToGroup'));//    ok

router.put('/removeStudent', require('./deleteStudentToGroup'));//   ok
router.get('/', require('./getGroupById'));

// Routes Admin
router.get('/allGroups',require('../../../middleware/adminAuth'), require('./getGroup')); // Read       ok


module.exports = router;

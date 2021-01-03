const express = require('express');
const router = express.Router();
const groupController = require('../../../controllers/groupController')

router.post('/', require('./addGroup')); // Create    (ok)
router.get('/', require('./getGroup')); // Read       (ok)
router.put('/:idGroup', require('./updateGroup')); // Update    (ok)
router.delete('/:idGroup', require('./deleteGroup')); // Delete    (ok)
router.get('/:idGroup', require('./getGroupById'));//    (ok)
router.put('/addSlot/:idGroup', require('./addSlotToGroup'));//   (ok)
router.put('/removeSlot/:idGroup', require('./deleteSlotToGroup'));//   (ok)
router.put('/addStudent/:idGroup', require('./addStudentToGroup'));//    (ok)
router.put('/removeStudent/:idGroup', require('./deleteStudentToGroup'));//   (ok)

module.exports = router;
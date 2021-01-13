const express = require('express');
const router = express.Router();
const groupAuth = require('../../../middleware/groupAuth');

// Routes pour tout les étudiants
router.get('/', require('./getGroupById'));
router.post('/', require('./addGroup')); // Create    ok

//Routes pour les étudiants faisant partie du groupe concerné

router.delete('/', groupAuth , require('./deleteGroup')); // Delete    ok
router.put('/addSlot', groupAuth , require('./addSlotToGroup'));//   (ok)
router.put('/removeSlot', groupAuth , require('./deleteSlotToGroup'));//   (ok)
router.put('/addStudent', groupAuth , require('./addStudentToGroup'));//    ok
router.put('/removeStudent', groupAuth , require('./deleteStudentToGroup'));//   ok

// Routes Admin
router.get('/allGroups', require('../../../middleware/adminAuth'), require('./getGroup')); // Read       ok


module.exports = router;

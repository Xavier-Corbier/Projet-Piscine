const express = require('express');
const router = express.Router();
const groupAutorization = require('../../../middleware/groupAutorization');
const deadlineMiddleware = require('../../../middleware/deadlineMiddleware');

// Routes pour tout les étudiants
router.get('/', require('./getGroupById'));
router.post('/', deadlineMiddleware, require('./addGroup')); // Create    ok

//Routes pour les étudiants faisant partie du groupe concerné

router.delete('/', deadlineMiddleware, groupAutorization , require('./deleteGroup')); // Delete    ok
router.put('/addSlot', deadlineMiddleware, groupAutorization , require('./addSlotToGroup'));//   (ok)
router.put('/removeSlot', deadlineMiddleware, groupAutorization , require('./deleteSlotToGroup'));//   (ok)
router.put('/addStudent', deadlineMiddleware, groupAutorization , require('./addStudentToGroup'));//    ok
router.put('/removeStudent', deadlineMiddleware, groupAutorization , require('./deleteStudentToGroup'));//   ok

// Routes Admin
router.get('/allGroups', require('../../../middleware/adminAuth'), require('./getGroup')); // Read       ok


module.exports = router;

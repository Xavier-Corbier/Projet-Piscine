const express = require('express');
const router = express.Router();

//Routes pour les étudiants (ils auront besoin de voir tout les profs disponibles)
router.get('/idTeacher', require('./getTeacherId')); //   (ok)

//Routes uniquement disponibles pour les admins
router.get('/',require('../../../middleware/adminAuth'), require('./getTeacher')); // Read     (ok)
router.post('/',require('../../../middleware/adminAuth'), require("./addTeacher"));// Create   (ok)
router.put('/',require('../../../middleware/adminAuth'), require('./updateTeacher')); // Update    (ok)
router.delete('/',require('../../../middleware/adminAuth'), require('./deleteTeacher')); // Delete (ok)

router.put('/addSlot',require('../../../middleware/adminAuth'), require('./addSlotToTeacher')); //    (ok)
router.put('/removeSlot',require('../../../middleware/adminAuth'), require('./deleteSlotToTeacher')); //    (ok)

module.exports = router;

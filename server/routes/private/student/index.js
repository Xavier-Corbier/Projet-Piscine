const express = require('express');
const router = express.Router();

router.put('/email', require('./updateEmailToStudent'));
router.put('/promo', require('./updatePromoToStudent'));

//fonction pour tester
router.put('/addGroup', require('./addGroupToStudent'));
router.put('/addGroup', require('./deleteGroupToStudent'));

router.put('/updatePassword', require('./updatePassword'));
router.delete('/', require('./deleteStudent'));
router.get('/', require('./getStudentById'));
router.get('/studentsByPromo', require('./getStudentByPromo'));

//Reserved for admin
router.get('/allStudents', require('../../../middleware/adminAuth') , require('./getAllStudents'));

module.exports = router;

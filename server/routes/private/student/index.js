const express = require('express');
const router = express.Router();

router.put('/email', require('./updateEmailToStudent'));
router.put('/promo', require('./updatePromoToStudent'));
router.put('/updatePassword', require('./updatePassword'));
router.delete('/', require('./deleteStudent'));
router.get('/', require('./getStudentById'));
router.get('/studentsByPromo', require('./getStudentByPromoWithoutStudentNumber'));

//Reserved for admin
router.get('/allStudents', require('../../../middleware/adminAuth') , require('./getAllStudents'));
router.get('/studentsByPromoAdmin', require('../../../middleware/adminAuth') , require('./getStudentByPromo'));

module.exports = router;

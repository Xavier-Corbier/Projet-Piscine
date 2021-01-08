const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

router.put('/', require('./updateStudent'));

//fonction pour tester
router.put('/addGroup/:id', require('./addGroupToStudent'));
router.put('/addGroup/:id', require('./deleteGroupToStudent'));

router.put('/updatePassword', require('./updatePassword'));
router.delete('/', require('./deleteStudent')); // delete
router.get('/', require('./getStudentById'));

//Reserved for admin
router.get('/allStudents', require('../../../middleware/adminAuth') , require('./getAllStudents')); // read
router.get('/studentsByPromo', require('../../../middleware/adminAuth') , require('./getStudentByPromo')); // read

module.exports = router;

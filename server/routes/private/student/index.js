const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController')

// update
router.put('/', require('./updateStudent'));
router.put('/addGroup/:id', require('./addGroupToStudent'));
router.put('/updatePassword', require('./updatePassword'));
router.delete('/', require('./deleteStudent')); // delete
router.get('/', require('./getStudentById'));


//Reserved for admin
router.get('/allStudents', require('../../../middleware/adminAuth') , require('./getAllStudents')); // read

module.exports = router;

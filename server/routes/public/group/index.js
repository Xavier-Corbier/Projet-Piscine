const express = require('express');
const router = express.Router();

router.get('/', require('./getGroupById'));
router.get('/allGroups', require('./getGroup'));

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../../../controllers/adminController');

router.post('/', adminController.addAdmin);

module.exports = router;

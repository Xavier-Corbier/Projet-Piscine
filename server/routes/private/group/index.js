const express = require('express');
const router = express.Router();
const groupController = require('../../../controllers/groupController')

router.post('/', groupController.addGroup);
router.get('/:id', groupController.getGroup);
router.put('/id:', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

module.exports = router;
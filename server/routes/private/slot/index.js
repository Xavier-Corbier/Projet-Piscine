const express = require('express');
const router = express.Router();
const slotController = require('../../../controllers/slotController')

router.post('/', slotController.addSlot);
router.get('/:id', slotController.getSlot);
router.put('/id:', slotController.updateSlot);
router.delete('/:id', slotController.deleteSlot);

module.exports = router;
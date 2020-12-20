const express = require('express');
const router = express.Router();
const promoController = require('../../../controllers/promoController')

router.post('/', promoController.addPromo);
router.get('/:id', promoController.getPromo);
router.put('/id:', promoController.updatePromo);
router.delete('/:id', promoController.deletePromo);

module.exports = router;

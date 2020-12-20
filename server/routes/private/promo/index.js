const express = require('express');
const router = express.Router();
const promoController = require('../../../controllers/promoController')

router.get('/',promoController.getPromo);
//router.get('/:id',promoController.getPromoById);
router.get('/name',promoController.getIdPromoByName());

module.exports = router;

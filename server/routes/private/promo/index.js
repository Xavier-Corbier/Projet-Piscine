const express = require('express');
const router = express.Router();
const promoController = require('../../../controllers/promoController')


router.get('/',require('./getPromos'));
router.get('/:id',require('./getPromoById'));
router.get('/byName/:id',require('./getPromoByName'));
router.get('/students/:id',require('./getStudentsToPromo'));
//router.get('/idbyname/:id',promoController.getIdPromoByName);

module.exports = router;

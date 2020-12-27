const express = require('express');
const router = express.Router();
const promoController = require('../../../controllers/promoController')

//Reserved for admin
router.get('/',require('./getPromos'));
router.get('/byId',require('./getPromoById'));
router.get('/byName',require('./getPromoByName'));
router.get('/students',require('./getStudentsToPromo'));

module.exports = router;

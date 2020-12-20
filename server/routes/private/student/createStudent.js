const express = require('express');
const router = express.Router();
const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');

module.exports = (req, res, next) => {
    const studentObject = req.body;
    const promo = req.body.promo;
    const idPromo = promoController.getIdPromoByName(promo);
    console.log(idPromo);
    const student = studentController.addStudent(req, res, next);
    promoController.addStudentToPromo(idPromo, student, res);

}

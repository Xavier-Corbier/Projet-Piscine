const Promo = require('../../../models/Promo');

const addPromo = (req, res, next) => {
    const promo = new Promo({
        ...req.body
    });
    promo.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

const addStudentToPromo = (req, res, next) => {
    try {
        const promo = req.body.promo;
        const student = req.body.student;
        return promoController.findOneAndUpdate({_id: req.body.id}, {$addToSet: {"studentList": student}}, {new: true});
    }catch (error){
        throw error
    }
}

const getPromo = (req, res, next) => {
    Promo.findOne({"name": req.body.name})
        .then((promo) => {res.status(201).json({promo})})
        .catch((error) => {res.status(400).json({error: error})});
}

module.exports = {addStudentToPromo, getPromo}

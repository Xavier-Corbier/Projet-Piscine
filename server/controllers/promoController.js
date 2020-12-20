const Promo = require('../models/Promo');

/*
const addPromo = (req, res, next) => {
    const promo = new Promo({
        ...req.body
    });
    promo.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

*/
const addStudentToPromo = (req, res, next) => {
    const promo = promoController.findOneAndUpdate({_id: _id}, {$push: {"studentList": student}}, {new: true});
}


const addPromo = (req, res, next) => {
    const promo = new Promo (
        {
            name: "Ancien"
        });
    promo.save()
        .then(() => res.status(201).json({message: 'Object save'}))
        .catch(error => {res.status(400).json({error: error})});
}


const getPromo = (req, res, next) => {
    const promos = Promo.find()
        .then((promos) => {res.status(200).json(promos)})
        .catch(error => {res.status(404).json({error: error})});
}

const getPromoById = (req, res, next) => {
    const promo = Promo.findOne({_id: req.params.id})
        .then((promo) => {res.status(200).json(promo)})
        .catch(error => {res.status(404).json({error: error})});
}

const getIdPromoByName = (name) => {
    const promo = Promo.findOne({name: name});
    console.log(promo);
    return promo.id
}

module.exports = {getPromo, getPromoById, getIdPromoByName}

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
const addStudentToPromo = (idPromo, student, res) => {
    Promo.findOneAndUpdate({_id: idPromo}, {$push: {"studentList": student}})
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
}


const addPromo = (req, res, next) => {
    const promo = new Promo (
        {
            ...req.body
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

const getIdPromoByName = (req, res, next) => {
    const promo = Promo.findOne({ name: req.params.name})
        .then((promo) => {res.status(200).json(promo)})
        .catch(error => {res.status(404).json({error: error})});
}

module.exports = {addStudentToPromo, getPromo, getPromoById, getIdPromoByName}

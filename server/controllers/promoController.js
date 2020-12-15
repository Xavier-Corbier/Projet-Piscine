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
        const promo = promoController.findOneAndUpdate({_id: _id}, {$push: {"studentList": student}}, {new: true});
    }catch (error){
        throw error
    }
}
module.exports = {addPromo}

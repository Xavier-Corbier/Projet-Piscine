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

const addStudentToPromo = async (idPromo, idStudent) => {
    try {
        return await Promo.findByIdAndUpdate({_id: idPromo}, {$push: {studentList: idStudent}})
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

const deleteStudentToPromo = async (idPromo, idStudent) => {
    try {
        console.log(idPromo, idStudent);
        return await Promo.findByIdAndUpdate({_id: idPromo}, {$pull: {studentList: idStudent}})
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getPromos = async () => {
    try {
        const promos = Promo.find();
        return await promos
    }catch (e) {
        console.log(e.message);
    }
}

const getPromoById = async (id) => {
    try {
        const promo = Promo.findOne({_id: id});
        return await promo
    }catch (e) {
        console.log(e.message);
    }
}

const getPromoByName = async (name) => {
    try {
        const promo = Promo.findOne({name : name});
        return await promo
    }catch (e) {
        console.log(e.message);
    }
}

const getIdPromoByName = async (name) => {
    try {
        const promo = Promo.findOne({name: name});
        return await promo.id
    }catch (e) {
        console.log(e.message);
    }
}


module.exports = {addStudentToPromo, getPromos, getPromoById, getPromoByName, getIdPromoByName, deleteStudentToPromo}

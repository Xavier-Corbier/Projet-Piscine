const Teacher = require('../models/Teacher');
const teacherController = require('./teacherController');
// CRUD

module.exports.addTeacher = (req, res, next) => {
    // TODO
    const teacher = new Teacher({
        ...req.body
    });
    teacher.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getTeacher = (req, res, next) => { // Renvoie la liste de tout les enseignants
    const teachers = Teacher.find()
        .then((teachers) => {res.status(200).json(teachers)})
        .catch(error => {res.status(404).json({error: error})});
};

module.exports.updateTeacher = (req, res, next) => {
    // TODO
    const teachers = Teacher.updateOne({ _id: req.params.id }, {$set : {...req.body, _id: req.params.id }})
         // Modifie un enseignant (tout ses attributs), on modifie cet enseignant de part son id (_id)
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.deleteTeacher = (req, res, next) => {
    // TODO
    const teachers = Teacher.deleteOne({ _id: req.params.id}) // Supprime un enseignant(tout ses attributs), on le supprime de part son id(_id)
        .then(() => res.status(200).json({message: "Prof supprimé !"}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getTeacherById = (req, res, next) => { //renvoie une étudiant selon son id
    const teachers = Teacher.findOne({ _id: req.params.id})
        .then((teachers) => {res.status(200).json(teachers)})
        .catch(error => {res.status(404).json({error: error})});
};

module.exports.getIdTeacherByLastname = (req, res, next) => {
    const teachers = Teacher.findOne({ lastName: req.params.lastName})
        .then((teachers) => {res.status(200).json(teachers)})
        .catch(error => {res.status(404).json({error: error})});
};

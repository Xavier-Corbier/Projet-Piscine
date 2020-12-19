const Student = require('../models/Student');

// CRUD

module.exports.addStudent = (req, res, next) => {
    // TODO
    const student = new Student({
        ...req.body // à utiliser avec attention, on doit se mettre d'accord sur ce qu'il y a dans le corps de la req
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getStudent = (req, res, next) => {
    // TODO
};

module.exports.updateStudent = (req, res, next) => {
    // TODO
};

module.exports.deleteStudent = (req, res, next) => {
    // TODO
};

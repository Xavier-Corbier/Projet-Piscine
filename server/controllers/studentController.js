const Student = require('../models/Student');
// CRUD

module.exports.addStudent = (req, res, next) => {
    // TODO
    const student = new Student({
        studentNumber: req.body.studentNumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        promo: req.body.promo,
        email: req.body.email,
        password: req.body.password
         // à utiliser avec attention, on doit se mettre d'accord sur ce qu'il y a dans le corps de la req
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.updateStudent = (req, res, next) => {
    Student.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.deleteStudent = (req, res, next) => {
    Student.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getStudent = (req, res, next) => { //renvoie la liste de tout les étudiants
    const students = Student.find()
        .then((students) => {res.status(200).json(students)})
        .catch(error => {res.status(404).json({error: error})});
}

module.exports.getStudentById = (req, res, next) => { //renvoie une étudiant selon son id
    const student = Student.findOne({ _id: req.params.id})
        .then((student) => {res.status(200).json(student)})
        .catch(error => {res.status(404).json({error: error})});
}

const Student = require('../../../models/Student');

const addStudent = (req, res, next) => {
    const student = new Student({
        ...req.body
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

module.exports = {addStudent}

const Student = require('../../../models/Student');

const addStudent = (req, res, next) => {
    const student = new Student({
        ...req.body
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}
const deleteStudent = (req, res, next) => {
    Student.deleteOne({_id: req.params.id})
        .then(() => {res.status(200).json({message: 'Deleted!'})})
        .catch((error) => {res.status(400).json({error: error})})
}

const updateStudent = (req, res, next) => {
    Student.updateOne({_id: req.params.id}, ...req.body)
        .then(() => {res.status(201).json({message: 'Update!'})})
        .catch((error) => {res.status(400).json({error: error})})
}

const getStudentsByName = (req, res, next) => {
    Student.find({ "name" : req.body.name});
}

module.exports = {addStudent, deleteStudent, updateStudent}

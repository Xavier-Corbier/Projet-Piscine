const bcrypt = require('bcrypt');

const Student = require('../models/Student');
// CRUD

module.exports.addStudent = async (studentNumber, firstname, lastname, promo, email, password) => {
    try {
        const hash = await bcrypt.hash(password, 10); //faire une fonction avec fonction compare "encryption"
        const student = new Student({
            studentNumber: studentNumber,
            firstname: firstname,
            lastname: lastname,
            promo: promo,
            email: email,
            password: hash
        });
        return await student.save();
    }catch (error){
        console.log(error);
        throw error;
    }
};

module.exports.addGroupToStudent = async (idStudent, idGroup) => {
    try{
        await Student.updateOne({_id: idStudent}, {group: idGroup, _id: idStudent});
        return await Student.findOne({_id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.updateStudent = async (idStudent, studentObject) => {
    try {
        await Student.updateOne({_id: idStudent}, {...studentObject, _id: idStudent});
        return await Student.findOne({_id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.deleteStudent = async (idStudent) => {
    try{
        return await Student.deleteOne({ _id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.getAllStudents = async () => { //renvoie la liste de tout les étudiants
    try{
        return await Student.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.getStudentById = async (idStudent) => { //renvoie une étudiant selon son id
    try{
        return await Student.findOne({ _id: idStudent}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.getStudentByName = async (name) => { //renvoie une étudiant selon son nom et prenom
    //prendre en compte que deux étudiants peuvent avoir les mêmes noms et prénoms
    try{
        return await Student.findOne({ name: name}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.getStudentByEmail = async (email) => {
    try{
        return await Student.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

module.exports.getStudentByNumber = async (number) => {
    try{
        return await Student.findOne({numberStudent: number}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/*
module.exports.removeCollection = (req, res, next) => {
    Student.remove()
        .then(() => {res.status(200).json({message: "ok"})})
        .catch(error => {res.status(404).json({error: error})})
}
*/

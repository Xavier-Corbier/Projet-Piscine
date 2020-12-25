const Student = require('../models/Student');
const passwordEncryption = require('../encryption/passwordEncryption');
// CRUD

const addStudent = async (studentNumber, firstname, lastname, promo, email, password) => {
    try {
        const hash = await passwordEncryption.passwordEncryption(password);
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

const addGroupToStudent = async (idStudent, idGroup) => {
    try{
        return await Student.updateOne({_id: idStudent}, {group: idGroup, _id: idStudent}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

const updateStudent = async (idStudent, studentObject) => {
    try {
        return await Student.findOneAndUpdate({_id: idStudent}, {...studentObject, _id: idStudent},{new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

const deleteStudent = async (idStudent) => {
    try{
        return await Student.deleteOne({ _id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

const getAllStudents = async () => { //renvoie la liste de tout les étudiants
    try{
        return await Student.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentById = async (idStudent) => { //renvoie une étudiant selon son id
    try{
        return await Student.findOne({ _id: idStudent}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByName = async (name) => { //renvoie une étudiant selon son nom et prenom
    //prendre en compte que deux étudiants peuvent avoir les mêmes noms et prénoms
    try{
        return await Student.findOne({ name: name}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByEmail = async (email) => {
    try{
        return await Student.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByNumber = async (number) => {
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
module.exports = {
    addStudent,
    addGroupToStudent,
    updateStudent,
    getStudentById,
    getAllStudents,
    getStudentByNumber,
    getStudentByEmail,
    deleteStudent
};

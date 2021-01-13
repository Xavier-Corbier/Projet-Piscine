const Student = require('../models/Student');
const passwordEncryption = require('../encryption/passwordEncryption');
const userFunctions = require('../utils/userFunctions');

// CRUD

/**
 * Ajoute un nouvel étudiant à la base de données
 * @param studentNumber : Int
 * @param promo : string
 * @param email : string
 * @param password : string
 * @returns {Promise<Document>} du type :
     {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const addStudent = async (studentNumber, promo, email, password) => {
    try {
        const name = userFunctions.createNameByEmail(email); //creation du prenom et du nom
        const firstname = name[0];
        const lastname = name[1];
        const hash = await passwordEncryption(password); //hachage du mot de passe
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

/**
 * Complète la propriété group de l'étudiant
 * @param idStudent : ObjectId de l'étudiant concerné
 * @param idGroup : ObjectId du groupe qu'il faut ajouter
 * @returns {Promise<any>} du type :
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "group": ObjectId,
	    "__v": Int
    }
 */
const addGroupToStudent = async (idStudent, idGroup) => {
    try{
        return await Student.updateOne({_id: idStudent}, {group: idGroup, _id: idStudent}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Supprime la propriété group de l'étudiant
 * @param idStudent : ObjectId de l'étudiant concerné
 * @param idGroup : ObjectId du groupe qu'il faut supprimer
 * @returns {Promise<any>} du type
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const deleteGroupToStudent = async (idStudent, idGroup) => {
    try{
        return await Student.updateOne({_id: idStudent}, {$unset: {group: idGroup}}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Supprime la propriété group de tout les étudiants ayant un même idGroup
 * @param idGroup : ObjectId du groupe qu'il faut supprimer
 * @returns {Promise<any>}
 */
const deleteGroupToManyStudent = async (idGroup) => {
    try{
        return await Student.updateMany({group: idGroup}, {$unset: {group: idGroup}}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Modification de la promo d'un étudiant  étudiant
 * @param idStudent: ObjectId de l'étudiant concerné
 * @param promo : nouvelle promo
 * @returns {Promise<any>} du type
 *  {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const updatePromoToStudent = async (idStudent, promo) => {
    try {
        return await Student.findOneAndUpdate({_id: idStudent}, {promo: promo, _id: idStudent},{new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Modification de l'email d'un étudiant (et donc du nom et prenom aussi)
 * @param idStudent: ObjectId de l'étudiant concerné
 * @param email: nouvel email
 * @returns {Promise<any>} du type
 * {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const updateEmailToStudent = async (idStudent, email) => {
    try {
        const name = userFunctions.createNameByEmail(email);
        return await Student.findOneAndUpdate({_id: idStudent}, {firstname: name[0], lastname: name[1], email: email, _id: idStudent},{new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Supprime un étudiant par son id
 * @param idStudent : ObjectId de l'étudiant concerné
 * @returns {Promise<*>}
 */
const deleteStudent = async (idStudent) => {
    try{
        return await Student.deleteOne({ _id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne tout les étudiants de la base de données
 * @returns {Promise<any>} du type :
 * [
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
    ...
    ]
 */
const getAllStudents = async () => {
    try{
        return await Student.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne les informations d'un étudiant par son id
 * @param idStudent : ObjectId de l'étudiant concerné
 * @returns {Promise<any>} du type
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const getStudentById = async (idStudent) => {
    try{
        return await Student.findOne({ _id: idStudent}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne les informations d'un étudiant par son email
 * @param email : String
 * @returns {Promise<any>} du type :
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "password": String,
	    "__v": Int
    }
 */
const getStudentByEmail = async (email) => {
    //le mot de passe est aussi renvoyé ici car la fonction est utilisé pour la vérification lors de la connexion
    try{
        return await Student.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne les informations d'un étudiant par son numéro étudiant
 * @param number : Number
 * @returns {Promise<any>} du type :
   {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const getStudentByNumber = async (number) => {
    //renvoi un étudiant selon son numéro étudiant
    try{
        return await Student.findOne({studentNumber: number}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne la liste des étudiants ayant comme promo la promo entré en paramètre
 * @param promo : String correspondant à une promo valide
 * @returns {Promise<any>} du type
    [
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
    ...
    ]
 */
const getStudentByPromo = async (promo) => {
    //renvoi la liste des étudiants appartenant à une promo précise
    try{
        return await Student.find({promo: promo}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Modification de la propriété "mot de passe" d'un étudiant par son email
 * @param email : String
 * @param newPassword : String
 * @returns {Promise<any>} du type
    {
	    "_id": ObjectId,
	    "studentNumber": Number,
	    "firstname": String,
	    "lastname": String,
	    "promo": String,
	    "email": String,
	    "__v": Int
    }
 */
const updatePassword = async (email, newPassword) => {
    try {
        const hash = await passwordEncryption((newPassword)); //hachage du mot de passe
        return await Student.findOneAndUpdate({email: email}, {password: hash}, {new: true}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
}

/**
 * Vérifie si un étudiant est enresgitré dans notre base de donnée grâce à l'email
 * @param email
 * @returns {Promise<boolean>}
 */
const studentExist = async (email) => {
    try {
        const student = await getStudentByEmail(email);
        if(!student){
            return false
        }else {
            return true
        }
    }catch (e){
        console.log(e)
    }
}

module.exports = {
    addStudent,
    addGroupToStudent,
    deleteGroupToStudent,
    deleteGroupToManyStudent,
    updatePromoToStudent,
    updateEmailToStudent,
    getStudentById,
    getAllStudents,
    getStudentByNumber,
    getStudentByEmail,
    deleteStudent,
    updatePassword,
    getStudentByPromo,
    studentExist
};

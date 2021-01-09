const Student = require('../models/Student');
const passwordEncryption = require('../encryption/passwordEncryption');

const listPromo = ["IG3","IG4","IG5","Ancien"]; //liste des promos valides

// CRUD

const createNameByEmail = (email) => {
    //prend en parametre un email du type prenom.nom... et retourne dans un tableau le prenom et le nom
    const PN = email.split('@')[0];
    const prenom = PN.split('.')[0];
    const nom = PN.split('.')[1].replace(new RegExp("[^(a-zA-Z)]", "g"), ''); //supprime les chiffres possibles
    return [prenom, nom];
}
const addStudent = async (studentNumber, promo, email, password) => {
    try {
        const name = createNameByEmail(email); //creation du prenom et du nom
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

const addGroupToStudent = async (idStudent, idGroup) => {
    //ajoute un group à l'étudiant, retourne l'étudiant modifié
    try{
        return await Student.updateOne({_id: idStudent}, {group: idGroup, _id: idStudent}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

const deleteGroupToStudent = async () => {
    //supprime le group de l'étudiant, retourne l'étudiant modifié
    try{
        return await Student.updateOne({_id: idStudent}, {$unset: {group: idGroup}}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};


const updateStudent = async (idStudent, studentObject) => {
    //modification promo et/ou email
    try {
        return await Student.findOneAndUpdate({_id: idStudent}, {...studentObject, _id: idStudent},{new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

const deleteStudent = async (idStudent) => {
    //supprime un étudiant selon son id
    try{
        return await Student.deleteOne({ _id: idStudent});
    }catch (e) {
        console.log(e.message);
    }
};

const getAllStudents = async () => {
    //renvoie la liste de tout les étudiants
    try{
        return await Student.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentById = async (idStudent) => {
    //renvoie un étudiant selon son id
    try{
        return await Student.findOne({ _id: idStudent}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByName = async (name) => {
    //renvoi une étudiant selon son nom et prenom
    //prendre en compte que deux étudiants peuvent avoir les mêmes noms et prénoms
    try{
        return await Student.findOne({ name: name}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByEmail = async (email) => {
    //renvoi un étudiant selon son email : le mot de passe est aussi renvoyé ici car la fonction est utilisé pour la vérification lors de la connexion
    try{
        return await Student.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByNumber = async (number) => {
    //renvoi un étudiant selon son numéro étudiant
    try{
        return await Student.findOne({studentNumber: number}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getStudentByPromo = async (promo) => {
    //renvoi la liste des étudiants appartenant à une promo précise
    try{
        return await Student.find({promo: promo}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const updatePassword = async (email, newPassword) => {
    //modification du mot de passe
    try {
        const hash = await passwordEncryption((newPassword)); //hachage du mot de passe
        return await Student.findOneAndUpdate({email: email}, {password: hash}, {new: true}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
}

const isPromo = (promo) => {
    //vérifie si la promo entrée en paramètre est valide (présente dans notre liste)
    return listPromo.indexOf(promo)>-1;
}

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
    deleteGroupToStudent,
    updateStudent,
    getStudentById,
    getAllStudents,
    getStudentByNumber,
    getStudentByEmail,
    deleteStudent,
    updatePassword,
    getStudentByPromo,
    isPromo
};

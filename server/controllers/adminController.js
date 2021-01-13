const Admin = require('../models/Admin');
const passwordEncryption = require('../encryption/passwordEncryption');
const userFunctions = require('../utils/userFunctions');
// CRUD

/**
 * Ajoute un admin à la base de données
 * @param firstname
 * @param lastname
 * @param email
 * @param password
 * @returns {Promise<Document>}
 */
const addAdmin = async (firstname, lastname, email, password) => {
    try {
        const hash = await passwordEncryption(password);
        const admin = new Admin({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash
        });
        return await admin.save();
    }catch (error){
        console.log(error);
        throw error;
    }
};

/**
 * Modification des propriétés de l'admin
 * @param idAdmin : ObjectId
 * @param firstname : String
 * @param lastname : String
 * @param email : String
 * @returns {Promise<any>} du type
 *  {
	    "_id": ObjectId,
	    "firstname": String,
	    "lastname": String,
	    "email": String,
	    "__v": Int
    }
 */
const updateAdmin = async (idAdmin, email) => {
    //modification du prenom, nom ou email, retourne l'admin modifié
    try {
        const name = userFunctions.createNameByEmail(email);
        return await Admin.findOneAndUpdate({_id: idAdmin}, {firstname: name[0], lastname: name[1], email: email, _id: idAdmin}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Supprime un admin de la base données
 * @param idAdmin
 * @returns {Promise<*>}
 */
const deleteAdmin = async (idAdmin) => {
    try{
        return await Admin.deleteOne({ _id: idAdmin});
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne les informations de l'admin
 * @returns {Promise<any>} du type:
 * {
	    "_id": ObjectId,
	    "firstname": String,
	    "lastname": String,
	    "email": String,
	    "__v": Int
    }
 */
const getAdmin = async () => {
    try{
        return await Admin.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Retourne les informations de l'admin par son email
 * @param email : String
 * @returns {Promise<any>} du type
 * {
	    "_id": ObjectId,
	    "firstname": String,
	    "lastname": String,
	    "email": String,
	    "password": String
	    "__v": Int
    }
 */
const getAdminByEmail = async (email) => {
    //fonction utilisée pour le login : retourne l'admin avec le mot de passe pour les vérifications
    try{
        return await Admin.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Modifie le mot de passe de l'admin
 * @param mail : String
 * @param newPassword : String
 * @returns {Promise<any>} du type
 * {
	    "_id": ObjectId,
	    "firstname": String,
	    "lastname": String,
	    "email": String,
	    "__v": Int
    }
 */
const updatePassword = async (email, newPassword) => {
    try {
        const hash = await passwordEncryption((newPassword)); //hachage du mot de passe
        return await Admin.findOneAndUpdate({email: email}, {password: hash}, {new: true}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
}

const adminExist = async (email) => {
    try {
        const admin = await getAdminByEmail(email);
        if(!admin){
            return false
        }else {
            return true
        }
    }catch (e){
        console.log(e)
    }
}

module.exports =  {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    getAdminByEmail,
    updatePassword,
    adminExist
};

const Admin = require('../models/Admin');
const passwordEncryption = require('../encryption/passwordEncryption');
// CRUD

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

const updateAdmin = async (idAdmin, firstname, lastname, email) => {
    //modification du prenom, nom ou email, retourne l'admin modifié
    try {
        return await Admin.updateOne({_id: idAdmin}, {firstname, lastname, email, _id: idAdmin}, {new: true}).select("-password");
    }catch (e) {
        console.log(e.message);
    }
};

const deleteAdmin = async (idAdmin) => {
    try{
        return await Admin.deleteOne({ _id: idAdmin});
    }catch (e) {
        console.log(e.message);
    }
};

const getAdmin = async () => {
    try{
        return await Admin.find().select('-password');
    }catch (e) {
        console.log(e.message);
    }
};

const getAdminByEmail = async (email) => {
    //fonction utilisée pour le login : retourne l'admin par son email, avec le mot de passe pour les vérifications
    try{
        return await Admin.findOne({email: email});
    }catch (e) {
        console.log(e.message);
    }
};

const updatePassword = async (mail, newPassword) => {
    //modification du mot de passe, retourne l'admin mofifié : la modification ne se voit pas sur le retour puisque on ne renvoi pas le mot de passe
    try {
        const hash = await passwordEncryption((newPassword)); //hachage du mot de passe
        return await Admin.findOneAndUpdate({mail: mail}, {password: hash}, {new: true}).select('-password');
    }catch (e) {
        console.log(e.message);
    }
}


module.exports =  {
    addAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin,
    getAdminByEmail,
    updatePassword
};

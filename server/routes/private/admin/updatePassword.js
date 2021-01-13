const adminController = require('../../../controllers/adminController');
const bcrypt = require('bcrypt');
const regEmail = /^[a-z\-]{3,20}\.[a-z]{3,20}[0-9]{0,3}(@umontpellier.fr)$/

module.exports = async (req, res, next) => {
    try {
        const {email, oldPassword, newPassword, newPasswordConfirm} = req.body; //récupération des informations
        const correctEmail = email.toLowerCase().trim();
        const admin = await adminController.getAdminByEmail(correctEmail);
        if (!admin) {
            return res.status(400).json({error: "Aucun admin trouvé"});
        }else if (!newPassword || !newPasswordConfirm) {
            return res.status(400).json({error: "Pas de nouveau mot de passe saisi"});
        }else if (newPassword !== newPasswordConfirm){
            return res.status(400).json({error: "Les mots de passe saisis ne correspondent pas"});
        }
        else {
            const match = await bcrypt.compare(oldPassword, admin.password.toString());
            if(!match){
                return res.status(400).json({error: "Mot de passe incorrect"});
            }else {
                const adminUpdate = await adminController.updatePassword(correctEmail, newPassword);
                return res.status(200).json({message: "Mot de passe modifié"});
            }
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier le mot de passe"});
    }
}

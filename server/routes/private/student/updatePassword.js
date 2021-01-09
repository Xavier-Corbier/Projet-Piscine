const studentController = require('../../../controllers/studentController');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        const {oldPassword, newPassword, newPasswordConfirm} = req.body; //récupération des informations
        const idStudent = req.query.id;
        const studentId = await studentController.getStudentById(idStudent);
        if (!studentId) {
            return res.status(400).json({error: "Aucun étudiant"});
        }else if (!newPassword || !newPasswordConfirm) {
            return res.status(400).json({error: "Pas de nouveau mot de passe saisi"});
        }else if (newPassword !== newPasswordConfirm){
            return res.status(400).json({error: "Les mots de passe saisis ne correspondent pas"});
        }
        else {
            const studentWithPassword = await studentController.getStudentByEmail(studentId.email) //sinon ne retourne pas le mot de passe
            const match = await bcrypt.compare(oldPassword, studentWithPassword.password.toString());
            if(!match){
                return res.status(400).json({error: "Mot de passe incorrect"});
            }else {
                const studentUpdate = await studentController.updatePassword(studentId.email, newPassword);
                return res.status(200).json({message: "Mot de passe modifié"});
            }
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier le mot de passe"});
    }
}

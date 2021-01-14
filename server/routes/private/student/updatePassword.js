const studentController = require('../../../controllers/studentController');
const bcrypt = require('bcrypt');

/**
 * Modification du mot de passe
 * @param req
 * @param res
    * body : oldPassword, newPassword, newPasswordConfirm
    * query : identifiant de l'étudiant
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const {oldPassword, newPassword, newPasswordConfirm} = req.body; //récupération des informations
        const idStudent = req.query.id; //récupération de l'identifiant de l'étudiant

        //on vérifie si l'étudiant existe
        const studentId = await studentController.getStudentById(idStudent);
        if (!studentId) {
            return res.status(400).json({error: "Aucun étudiant"});
        }

        //on vérifie si tout les mots de passe ont été renseignés
        if (!newPassword || !newPasswordConfirm) {
            return res.status(400).json({error: "Pas de nouveau mot de passe saisi"});
        }

        //on vérifie si les mots de passe correspondent
        if (newPassword !== newPasswordConfirm){
            return res.status(400).json({error: "Les mots de passe saisis ne correspondent pas"});
        }

        //les premières vérifications ont été faites
        else {
            //on récupère l'étudiant avec son mot de passe
            const studentWithPassword = await studentController.getStudentByEmail(studentId.email);
            //on verifie si le mot de passe renseignée est le bon mot de passe
            const match = await bcrypt.compare(oldPassword, studentWithPassword.password.toString());
            if(!match){
                return res.status(400).json({error: "Mot de passe incorrect"});
            }else {
                //toutes les vérifications ont été faites, on modifie le mot de passe
                const studentUpdate = await studentController.updatePassword(studentId.email, newPassword);
                return res.status(200).json({message: "Mot de passe modifié"});
            }
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier le mot de passe"});
    }
}

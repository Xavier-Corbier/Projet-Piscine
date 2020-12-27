const studentController = require('../../../controllers/studentController');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        const {email, oldPassword, newPassword} = req.body;
        const student = await studentController.getStudentByEmail(email);
        if (!student) {
            return res.status(400).json({error: "Aucun étudiant"});
        }else if (!newPassword) {
            return res.status(400).json({error: "Pas de nouveau mot de passe saisi"});
        }else {
            const match = await bcrypt.compare(oldPassword, student.password.toString());
            if(!match){
                return res.status(400).json({error: "Mot de passe incorrect"});
            }else {
                const studentUpdate = await studentController.updatePassword(email, newPassword);
                return res.status(200).json({message: "Mot de passe modifié"});
            }
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier le mot de passe"});
    }
}

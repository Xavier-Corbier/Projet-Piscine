const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

/**
 * Modification de l'email de l'étudiant
 * @param req
 * @param res
    * query : identifiant de l'étudiant
    * body : nouvel email
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //recuperation de l'id
        const email = req.body.email; //recuperation de l'email

        //verification de la conformite de l'email
        if (!email){
            return res.status(400).json({error: "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim()
        if (!validationUtils.isStudentEmail(correctEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }

        //on vérifie si l'email n'est pas déjà utilisé
        const studentExist = await studentController.studentExist(correctEmail);
        if (studentExist){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }

        //les vérifications ont été faites: on modifie l'email
        const student = await studentController.updateEmailToStudent(idStudent, correctEmail)
        if (!student){
            //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun étudiant"});
        }

        //on retourne l'étudiant modifié
        return res.status(200).json(student);

    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier l'étudiant"});
    }
}

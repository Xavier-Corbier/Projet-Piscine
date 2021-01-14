const studentController = require('../../../controllers/studentController');

/**
 * Retourne tout les étudiants de la base de données
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {

        const students = await studentController.getAllStudents();

        //on vérifie que notre liste d'étudiants n'est pas null
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }

        //on retourne la liste des étudiants
        return res.status(200).json(students);
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves"});
    }
}

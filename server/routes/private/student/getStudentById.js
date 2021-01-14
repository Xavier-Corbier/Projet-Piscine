const studentController = require('../../../controllers/studentController');

/**
 * Retourne un étudiant à partir de son identifiant
 * @param req
    * query : identifiant de l'étudiant
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //récupération de l'id de l'étudiant à afficher

        //on vérifie que l'étudiant existe
        const student = await studentController.getStudentById(idStudent);
        if (!student) {
            return res.status(400).json({error: "Aucun étudiant"});
        }

        //on retourne l'étudiant
        return res.status(200).json(student);

    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves"});
    }
}

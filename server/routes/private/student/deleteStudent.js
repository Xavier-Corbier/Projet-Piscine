const studentController = require('../../../controllers/studentController');
const groupController = require('../../../controllers/groupController');

/**
 * Suppression d'un étudiant : suppression de l'étudiant de la base de données
 * Si l'étudiant est inscrit dans un groupe : on supprime l'étudiant du groupe
 * @param req
    * query : identifiant de l'étudiant
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //récupération de l'id de l'étudiant à supprimer
        const student = await studentController.getStudentById(idStudent); //récupération de l'étudiant à supprimer

        //on vérifie si l'étudiant existe
        if(!student){
            return res.status(400).json({error: "L'étudiant n'existe pas"});
        }

        //on vérifie si l'étudiant est inscrit dans un groupe
        const idGroup = student.group;
        if(idGroup){
            //si oui on le supprime du groupe
            await groupController.deleteStudentOfGroup(student.group, idStudent);
        }

        //on supprime l'étudiant de la base de donnée
        await studentController.deleteStudent(idStudent);

        return res.status(200).json({message : "Suppression réussie"});

    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de supprimer cet élève"});
    }
}

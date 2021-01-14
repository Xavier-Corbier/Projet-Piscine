const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

/**
 * Modification de la promo d'un étudiant
 * @param req
    * query : identifiant de l'étudiant
    * body : nom de la promotion
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //récupération de l'identifiant de l'étudiant
        const student = await studentController.getStudentById(idStudent); //récupération de l'étudiant

        //on vérifie si l'étudiant est inscrit dans un groupe
        if (student.group){
            return res.status(400).json({error: "Vous ne pouvez pas modifier votre promo lorsque vous êtes affecté à un groupe"})
        }
        const promo = req.body.promo;

        //on vérifie si la promo à été renseignée
        if (!promo){
            return res.status(400).json({error: "Aucune promo saisie"});
        }

        const correctPromo = promo.toUpperCase().trim() //nettoyage de la donnée

        //on vérifie si la promo renseignée est valide
        if (!validationUtils.isPromo(correctPromo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }

        //on effectue la modification de la promo
        const studentUpdate = await studentController.updatePromoToStudent(idStudent, correctPromo)
        if (!studentUpdate){
            //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(studentUpdate);
        }

    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier l'étudiant"});
    }
}

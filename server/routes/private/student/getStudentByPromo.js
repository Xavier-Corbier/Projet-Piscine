const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

/**
 * Retourne une liste d'étudiant en fonction de leur promotion
 * @param req
    * query : nom de la promotion
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const promo = req.query.promo; //récupération de la promotion concernée

        //on vérifie que la promotion est remplie
        if(!promo){
            return res.status(400).json({error : "Aucune promo saisie"})
        }

        const correctPromo = promo.toUpperCase().trim(); //nettoyage de la donnée

        //on vérifie si la promo envoyée est une promo valide
        if (!validationUtils.isPromo(correctPromo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }

        //on récupère tout les étudiants concernés
        const students = await studentController.getStudentByPromo(correctPromo);

        //on vérifie si la liste des étudiants retournée est null
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }
        //on retourne la liste des etudiants
        return res.status(200).json(students);

    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves concernée"});
    }
}

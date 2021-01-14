const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

/**
 * Retourne la liste des étudiants selon leur promo mais sans leur numéro étudiant
 * @param req
    * query : nom de la promotion
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const promo = req.query.promo; //récupération de la promo concernée

        //on vérifie qu'une promo est bien envoyée
        if(!promo){
            return res.status(400).json({error : "Aucune promo saisie"})
        }

        const correctPromo = promo.toUpperCase().trim(); //nettoyage de la donnée

        //on verifie si la promo envoyée est une promo valide
        if (!validationUtils.isPromo(correctPromo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }

        //on récupère la liste des étudiants
        const students = await studentController.getStudentByPromoWithoutStudentNumber(correctPromo);
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }

        //on retourne la liste des étudiants
        return res.status(200).json(students);

    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves concernée"});
    }
}

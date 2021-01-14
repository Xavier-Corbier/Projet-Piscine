const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const promo = req.query.promo;
        if(!promo){
            return res.status(400).json({error : "Aucune promo saisie"})
        }
        const correctPromo = promo.toUpperCase().trim();
        if (!validationUtils.isPromo(correctPromo)){ //on vérifie si la promo saisie est une promo valide
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        const students = await studentController.getStudentByPromoWithoutStudentNumber(correctPromo);
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(students);
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves concernée"});
    }
}

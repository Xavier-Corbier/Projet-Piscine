const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const promo = req.body.promo.toUpperCase();
        if(!promo){
            return res.status(400).json({error : "Aucune promo saisie"})
        }
        if (!studentController.isPromo(promo)){ //on vérifie si la promo saisie est une promo valide
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        const students = await studentController.getStudentByPromo(promo);
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(students);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves concernée"});
    }
}

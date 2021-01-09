const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id;
        const promo = req.body.promo;
        //on effectue la modification
        if (!promo){
            return res.status(400).json({error: "Aucune promo saisie"});
        }
        const correctPromo = promo.toUpperCase().trim()
        if (!studentController.isPromo(correctPromo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        const student = await studentController.updatePromoToStudent(idStudent, correctPromo)
        if (!student){ //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier l'étudiant"});
    }
}

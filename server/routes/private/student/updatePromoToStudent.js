const studentController = require('../../../controllers/studentController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id;
        if (!idStudent.group){
            return res.status(400).json({error: "Vous ne pouvez pas modifier votre promo lorsque vous êtes affecté à un groupe"})
        }
        const promo = req.body.promo;
        //on effectue la modification
        if (!promo){
            return res.status(400).json({error: "Aucune promo saisie"});
        }
        const correctPromo = promo.toUpperCase().trim()
        if (!validationUtils.isPromo(correctPromo)){
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

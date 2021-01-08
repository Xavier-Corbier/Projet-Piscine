const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');

//suppression d'un étudiant
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //récupération de l'id de l'étudiant à supprimer
        const student = await studentController.getStudentById(idStudent); //récupération de l'étudiant à supprimer
        if(!student){
            return res.status(400).json({error: "L'étudiant n'existe pas"});
        }else {
            await studentController.deleteStudent(idStudent);
            return res.status(200).json({message : "Suppression réussie"});
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de supprimer cet élève"});
    }
}

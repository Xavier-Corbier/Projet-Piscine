const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //écupération de l'id de l'étudiant à afficher
        const student = await studentController.getStudentById(idStudent);
        if (!student){
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves"});
    }
}

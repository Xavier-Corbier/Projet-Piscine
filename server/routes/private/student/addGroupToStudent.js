const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.params.id;
        const idGroup = req.body.idGroup;
        const student = await studentController.addGroupToStudent(idStudent, idGroup);
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

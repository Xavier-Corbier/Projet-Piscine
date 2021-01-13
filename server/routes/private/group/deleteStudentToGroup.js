const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperatioon de l'id du group a modifier
        const idStudent = req.body.idStudent;//recuperation de l'id du student à supprimer
        //vérification de l'étudiant à supprimer
        const student = await studentController.getStudentById(idStudent);
        if(!student){
            return res.status(400).json({error: "L'étudiant que vous essayez de supprimer n'existe pas"})
        }else if(!(student.group && student.group === idGroup)){
            return res.status(400).json({error: "L'étudiant que vous essayez de supprimer ne fait pas partie de votre groupe"})
        }
        const group = await groupController.deleteStudentOfGroup(idGroup,idStudent);
        await studentController.deleteGroupToStudent(idStudent, idGroup);
        if (!group){
            return res.status(400).json({error: "Suppression impossible de l'étudiant"});
        }else {
            return res.status(200).json(group);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer cet étudiant du groupe"});
    }
}

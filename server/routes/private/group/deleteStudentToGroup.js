const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const idStudent = req.body.idStudent;
        const group = await groupController.deleteStudentOfGroup(id,idStudent);
        /* await studentController.deleteGroupToStudent(idStudent, id); */
        console.log(id)
        console.log(idStudent)
        console.log(group)
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

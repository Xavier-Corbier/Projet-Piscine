const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const idStudent = req.body.idStudent;
        console.log("id",idStudent);
        const body = await groupController.getGroupById(id)
        const group = await groupController.addStudentToGroup(id, idStudent, body);
        if (!group){
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            const test = await studentController.addGroupToStudent(idStudent,id);
            if(!test){
                return res.status(400).json({error: "Etudiant ajouté au groupe mais l'étudiant n'a pas de groupe, veuillez le supprimer"});
            }
            else{
                return res.status(200).json(group);
            }
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'ajouter cet élève au groupe"});
    }
}

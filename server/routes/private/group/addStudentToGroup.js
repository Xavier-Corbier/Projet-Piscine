const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du group à modifier
        const idStudent = req.query.id; //id de l'étudiant qui fais la modification
        const idStudentToAdd = req.body.idStudent; //recuperation de l'id du student à ajouter au group
        //verification du student : s'il à déjà un group on ne peut pas l'ajouter
        const studentToAdd = await studentController.getStudentById(idStudentToAdd);
        if(studentToAdd.group){
            return res.status(400).json({error: "Vous ne pouvez pas ajouter cet étudiant : il est déjà enregistré dans un groupe"})
        }
        //si le student n'a pas la même promo que le student qui veut l'ajouter à son groupe
        const student = await studentController.getStudentById(idStudent);
        if(studentToAdd.promo.toString() !== student.promo.toString()){
            return res.status(400).json({error: "Vous ne pouvez pas ajouter cet étudiant : il ne fait pas partie de votre promo"})
        }
        //Toutes les vérifications ont été faites: ajout de l'étudiant dans le group et du group dans l'étudiant
        console.log(idGroup, idStudent, idStudentToAdd)
        const group = await groupController.addStudentToGroup(idGroup, idStudentToAdd);
        console.log(group)
        if (!group){
            return res.status(400).json({error: "Aucun group"});
        }else {
            const test = await studentController.addGroupToStudent(idStudentToAdd,idGroup);
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

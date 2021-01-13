const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

/*
Les middlewares auth et groupAuth ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - le groupe qui est dans la query existe
    - l'étudiant fait partie du groupe qu'il veut modifier
 */

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperatioon de l'id du group a modifier
        const idStudentToEdit = req.body.idStudent; //recuperation de l'id du student à supprimer

        //vérification de l'étudiant à supprimer

        //on vérifie que l'id de l'étudiant à bien été renseigné
        if(!idStudentToEdit){
            return res.status(400).json({error: "Aucun étudiant à supprimer n'a été renseigné"})
        }

        //on vérifie que l'id de l'étudiant correspond à un étudiant de notre base de donnée
        const studentToEdit = await studentController.getStudentById(idStudentToEdit);
        if(!studentToEdit){
            return res.status(400).json({error: "L'étudiant que vous essayez de supprimer n'existe pas"})
        }

        //on vérifie que l'etudiant renseigné fait partie du même groupe que l'étudiant qui fait la modification
        if(studentToEdit.group != idGroup){
            console.log(studentToEdit.group,idGroup)
            return res.status(400).json({error: "L'étudiant que vous essayez de supprimer ne fait pas partie de votre groupe"})
        }

        //Toutes les vérifications ont été faites : on supprime l'étudiant du groupe

        //on regarde si l'étudiant à supprimer est le dernier du group
        const group = await groupController.getGroupById(idGroup);
        const studentList = group.studentList;
        console.log(group)
        if(studentList.length <= 1){
            //si oui on supprimer le group
            await groupController.deleteGroup(idGroup);
            return res.status(200).json({message: "Le groupe à été supprimé"})
        }

        //si non on supprime seulement l'étudiant

        //Etape 1 : on supprime l'étudiant de la liste des étudiants du groupe
        const groupUpdate = await groupController.deleteStudentOfGroup(idGroup,idStudentToEdit);

        //Etape 2 : on supprime le groupe de l'étudiant
        await studentController.deleteGroupToStudent(idStudentToEdit, idGroup);

        //La modification à bien été effectuée
        return res.status(200).json(groupUpdate);

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer cet étudiant du groupe"});
    }
}

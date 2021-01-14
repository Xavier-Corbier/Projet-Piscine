const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

const userFunctions = require('../../../utils/userFunctions');


/*
Les middlewares auth, deadlineMiddleware et groupAutorization  ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
- le groupe qui est dans la query existe
- l'étudiant fait partie du groupe qu'il veut modifier
- la deadline de l'evenement n'est pas dépassée
*/

/**
 * Supprime un groupe : supprime aussi l'attibut groupe de tout les étudiants qui étaient présent dans le groupe
 * si le groupe avait un créneau de réservé : supprime le group du slot et le teacher référent du slot ainsi que le
 * slot du teacher référent
 * @param req
    * query : doit contenir l'id d'un group et de l'étudiant authentifié
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du groupe à supprimer
        const group = await groupController.getGroupById(idGroup) //récupération du group que l'on va supprimer
        if(!group){
            return res.status(400).json({error: "Aucun groupe à supprimer"})
        }

        //Suppresion du groupe

        //Etape 1 : vérifier si le groupe est inscrit à un slot
        const idSlot = group.slot;
        if (idSlot){
            //Etape 1.1 : supprimer le groupe du slot
            await slotController.removeGroupFromSlot(idSlot);

            //Etape 1.2 : supprimer le slot du teacher
            await teacherController.deleteSlotOfTeacher(group.teacher, idSlot);

            //Etape 1.3 : supprimer le teacher du jury du slot
            await slotController.removeTeacherFromSlot(idSlot, group.teacher);
        }

        //Etape 2 : supprimer la propriété group de tout les étudiants du groupe
        await studentController.deleteGroupToManyStudent(idGroup);

        //Etape 3 : supprimer le groupe de la bdd
        const groupDelete = await groupController.deleteGroup(idGroup);

        if(!groupDelete){
            return res.status(400).json({error: "Suppression impossible"});
        }else {
            return res.status(200).json({message : "Suppression réussie"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce groupe"});
    }
}


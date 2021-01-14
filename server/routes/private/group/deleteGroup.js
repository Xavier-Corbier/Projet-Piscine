const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
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
        await studentController.deleteGroupToManyStudent(idGroup);
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


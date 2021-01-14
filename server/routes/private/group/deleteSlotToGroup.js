const groupController = require('../../../controllers/groupController');
const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

/*
Les middlewares auth, deadlineMiddleware et groupAutorization  ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - le groupe qui est dans la query existe
    - l'étudiant fait partie du groupe qu'il veut modifier
    - la deadline de l'evenement n'est pas dépassée
 */

/**
 * Suppression ude slot d'un group : supprime le slot du group, le group du slot et le slot du teacher référent
 * Préconditions :
 * - le groupe doit avoir un créneau réservé
 * @param req
    * query : doit contenir l'id d'un group et de l'étudiant authentifié
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //récupération de l'id du groupe à modifier
        const group = await groupController.getGroupById(idGroup); //recuperation du groupe à modifier

        //on vérifie que le groupe à modifier à bien un créneau réservé
        const idSlot = group.slot;
        if(!idSlot){
            return res.status(400).json({error: "Le groupe n'as aucun créneau à supprimer"});
        }

        //on supprime le créneau
        //Etape 1 : suppresion du creneau dans le group
        const groupUpdate = await groupController.deleteSlotOfGroup(id,idSlot);

        //Etape 2 : suppresion du group dans le creneau
        //TODO : supprimer le group du créneau

        //Etape 3 : suppression du slot pour le teacher référent
        const idTeacher = group.teacher;
        await teacherController.deleteSlotOfTeacher(idTeacher, idSlotd);

        //La suppression à été effectué
        return res.status(200).json(group);

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce slot de du groupe"});
    }
}

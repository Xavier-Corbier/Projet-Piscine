const groupController = require('../../../controllers/groupController');
const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');
const studentController = require('../../../controllers/studentController');
const teacherController = require('../../../controllers/teacherController');

/*
Les middlewares auth, deadlineMiddleware et groupAutorization  ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - le groupe qui est dans la query existe
    - l'étudiant fait partie du groupe qu'il veut modifier
    - la deadline de l'evenement n'est pas dépassée
 */

/**
 * Réservation d'un slot par un groupe : ajoute le slot au groupe, ajoute le groupe au slot et ajoute le slot au
 * teacher référent du groupe
 * Préconditions :
 *  - le groupe ne doit pas avoir de créneau réservé
 *  - le créneau renseigné doit exister
 *  - ne pas être déjà réservé
 *  - étre rattaché à un evenement
 *  - correspondre à un evenement auquel l'étudiant à acces (même promo)
 * @param req
    * query : doit contenir l'id d'un group et de l'étudiant authentifié
    * body : doit contenir l'id d'un slot
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du groupe à modifier
        const idSlot = req.body.idSlot; //recuperation du slot à ajouter
        const idStudent = req.query.id; //récupération de l'id de l'étudiant qui souhaite réserver le créneaux

        //on verifie que le groupe n'a pas déjà un créneau réservé
        const group = await groupController.getGroupById(idGroup);
        if(group.slot){
            return res.status(400).json({error: "Votre groupe a déjà un créneau de réservé, veillez le supprimer " +
                    "avant dans réserver un nouveau"});
        }

        //on vérifie que le slot existe
        const slot = await slotController.getSlotById(idSlot);
        if(!slot){
            return res.status(400).json({error: "Le créneaux que vous voulez reserver n'existe pas"})
        }

        //on verifie que le slot n'est pas déjà réservé : qu'il a pas déjà un groupe
        if(slot.groupId){
            return res.status(400).json({error: "Le créneaux que vous voulez reserver est déjà pris"})
        }

        //on vérifie que le slot est bien rattaché à un event
        const event = await eventController.getEventById(slot.eventId);
        if(!event){
            return res.status(400).json({error: "Le créneaux que vous voulez reserver ne correspond à aucun évènement"})
        }

        //on vérifie que le slot correspond à un event rattaché à la promo du groupe
        if(event.promo.toString() !== group.promo.toString()){
            return res.status(400).json({error: "Le créneaux que vous voulez reserver ne correspond pas à un " +
                    "évènement auquel vous avez accés"})
        }

        //Toutes les vérifications ont été faites : on peut réserver le créneau

        //Etape 1 : Ajout du creneau au groupe
        const groupUpdate = await groupController.addSlotToGroup(idGroup, idSlot);

        //Etape 2 : Ajout du groupe au créneau
        await slotController.addGroupToSlot(idSlot, idGroup);

        //Etape 3 : Ajout du créneau au prof référent du groupe qui devra assister à la soutenance
        await teacherController.addSlotToTeacher(group.teacher, idSlot);

        //le créneaux à bien été réservé
        return res.status(200).json(groupUpdate);

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'ajouter ce slot au groupe"});
    }
}

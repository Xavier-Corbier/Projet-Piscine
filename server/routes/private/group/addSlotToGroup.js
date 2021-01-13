const groupController = require('../../../controllers/groupController');
const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');
const studentController = require('../../../controllers/studentController');
const teacherController = require('../../../controllers/teacherController');

/*
Les middlewares auth et groupAuth ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - le groupe qui est dans la query existe
    - l'étudiant fait partie du groupe qu'il veut modifier
 */

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du groupe à modifier
        const idSlot = req.body.slot; //recuperation du slot à ajouter
        const idStudent = req.query.id; //récupération de l'id de l'étudiant qui souhaite réserver le créneaux

        //vérification sur le Slot :

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

        //on vérifie que le slot correspond à un event rattaché à la promo du groupe (de l'étudiant)
        const student = await studentController.getStudentById(idStudent);
        if(event.promo.toString() !== student.promo.toString()){
            return res.status(400).json({error: "Le créneaux que vous voulez reserver ne correspond pas à un " +
                    "évènement auquel vous avez accés"})
        }

        //Toutes les vérifications ont été faites : on peut réserver le créneau

        //Etape 1 : Ajout du creneau au groupe
        const group = await groupController.addSlotToGroup(idGroup, idSlot);

        //Etape 2 : Ajout du groupe au créneau
        await slotController.addGroupToSlot(idSlot, idGroup);

        //Etape 3 : Ajout du créneau au prof référent du groupe qui devra assister à la soutenance
        await teacherController.addSlotToTeacher(group.teacher, idSlot);

        //le créneaux à bien été réservé
        return res.status(200).json(group);

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'ajouter ce slot au groupe"});
    }
}

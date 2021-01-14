const eventController = require('../../../controllers/eventController');
const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');
const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');


module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;

        // l'event existe ?
        const event = await eventController.getEventById(eventId);
        if (event === null) {
            return res.status(400).json({ message: 'Cet event n\'existe pas.' });
        }

        // pour tous les slots de l'event
            // pour tous les teachers de chaque slot
                // enlever le slot du teacher
        const slotIdList = event.slotList;
        if (slotIdList !== undefined && slotIdList.length >= 1) { // s'il y a une liste de slots et qu'elle contient au moins 1 slot
            for (let i = 0; i < slotIdList.length; i++) { // pour tous les slotIds de l'event

                const slotId = slotIdList[i];
                const slot = await slotController.getSlotById(slotId);

                if (slot !== null) {
                    const juryIdList = slot.jury;
                    if (juryIdList !== undefined && juryIdList.length >= 1) {
                        for (let j = 0; j < juryIdList.length; j ++) { // pour tous les juryIds du slot

                            const juryId = juryIdList[j];
                            const jury = await teacherController.getTeacherById(juryId);

                            if (jury !== null) {
                                await teacherController.deleteSlotOfTeacher(juryId, slotId);
                            } else {
                                console.log('Un des jurys d\'un des slots de l\'event n\'existe pas. (' + juryId + '), ' +
                                    'continuation de la suppression...');
                            }

                        }
                    } // si la juryIdList n'existe pas ou ne contient aucun jury, pas grave, on passe au slot suivant
                } else {
                    console.log('Un des slots de l\'event n\'existe pas. (' + slotId + '), continuation de la suppression...');
                }

            }
        }
        // supprimer tous les slots de l'event de la DB
        await slotController.deleteAllSlotsByEventId(eventId);


        // pour tous les groupes ayant la même promo que l'event
            // pour tous les students de chaque groupe
                // enlever le groupe au student
        const promo = event.promo;
        const groupList = await groupController.getGroupsByPromo(promo);
        // null au lieu de undefined car la liste est le résultat d'une query et non un simple attribut
        if (groupList !== null && groupList.length >= 1) {
            for (let i = 0; i < groupList.length; i++) {

               const group = groupList[i];
               const groupId = group._id;
               const studentIdList = group.studentList;

               if (studentIdList !== undefined && studentIdList.length >= 1) {
                   for (let y = 0; y < studentIdList.length; j ++) {

                       const studentId = studentIdList[j];
                       const student = await studentController.getStudentById(studentId);
                       if (student !== null) {
                           await studentController.deleteGroupToStudent(studentId, groupId);
                       } else {
                           console.log('Un des students du groupe n\'existe pas. (' + studentId + '), continuation de la suppression...');
                       }

                   }
               }

            }
        }

        // supprimer tous les groupes ayant la même promo
        await groupController.deleteAllGroupsByPromo(promo);

        // supprimer l'event de la DB
        await eventController.deleteEventById(eventId);

        return res.status(200).json({ message: 'Event supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
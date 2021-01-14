const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');
const groupController = require('../../../controllers/groupController');
const teacherController = require('../../../controllers/teacherController');


module.exports = async (req, res, next) => {
    try {
        const slotId = req.query.slotId;

        const slot = await slotController.getSlotById(slotId);
        if (slot === null) {
            return res.status(400).json({ message: 'Ce slot n\'existe pas.' });
        }

        const groupId = slot.groupId;
        if (groupId !== undefined) {
            // Il y a un id de groupe
            const group = groupController.getGroupById(groupId);
            // On vérifie que le groupe existe
            if (group !== null) {
                // Si le slot avait un groupe, on supprime le slot du groupe
                await groupController.deleteSlotOfGroup(groupId, slotId);
            } else {
                console.error('Le groupe associé à ce slot n\'existe pas, continuation de la suppression...');
            }
        }

        const juryIdList = slot.jury;
        if (juryIdList !== undefined) {
            // s'il y a une liste de jury on supprime le slot de tous les jurys
            for (const juryId of juryIdList) {
                const jury = await teacherController.getTeacherId(juryId);
                // On vérifie que le teacher existe
                if (jury !== null) {
                    await teacherController.deleteSlotOfTeacher(juryId, slotId);
                } else {
                    console.error('Un des teachers associés à ce slot n\'existent pas, ' +
                        'continuation de la suppression...');
                }
            }
        }

        const eventId = slot.eventId;
        const event = await eventController.getEventById(eventId);
        if (event !== null) {
            await eventController.removeSlotFromEvent(eventId, slotId);
        } else {
            console.error('L\'event associé à ce slot n\'existe pas, continuation de la suppression...');
        }

        // On a supprimé tous les liens qui existaient avec les autres entités, on peut maintenant supprimer le slot
        await slotController.deleteSlotById(slotId);

        return res.status(200).json({ message: 'Slot supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
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
            if (group !== undefined) {
                // Si le slot avait un groupe, on supprime le slot du groupe
                await groupController.deleteSlotOfGroup(groupId, slotId);
            } else {
                return res.status(400).json({ error: 'Le groupe associé à ce slot n\'existe pas/plus' });
            }
        }

        const jury = slot.jury;
        if (jury !== undefined) {
            // s'il y a une liste de jury on supprime le slot de tous les jurys
            for (const juryId of jury) {
                await teacherController.deleteSlotOfTeacher(juryId, slotId);
            }
        }


        // le slot a forcément un attribut eventId car il est required dans le model
        await eventController.removeSlotFromEvent(slot.eventId, slotId);

        await slotController.deleteSlotById(slotId);

        return res.status(200).json({ message: 'Slot supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
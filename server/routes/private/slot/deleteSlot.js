const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const slotId = req.query.slotId;
        const slot = await slotController.getSlotById(slotId);

        if (slot === null) {
            return res.status(400).json({ message: 'Ce slot n\'existe pas.' });
        }
        await slotController.deleteSlotById(slotId);
        await eventController.removeSlotFromEvent(slot.eventId, slotId);
        return res.status(200).json({ message: 'Slot supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
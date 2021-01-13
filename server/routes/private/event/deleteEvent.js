const eventController = require('../../../controllers/eventController');
const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        await eventController.deleteEventById(eventId);
        await slotController.deleteAllSlotsByEventId(eventId);

        return res.status(200).json({ message: 'Event supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
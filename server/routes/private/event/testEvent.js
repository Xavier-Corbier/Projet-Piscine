const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const event = await eventController.getEventById(eventId);
        const days = await eventController.populateEventWithSlots(event);
        res.status(200).json({days});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
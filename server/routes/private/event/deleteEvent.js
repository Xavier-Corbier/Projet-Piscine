const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const event = await eventController.deleteEventById(eventId);
        res.status(200).json({ message: 'Event supprimé avec succès.'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
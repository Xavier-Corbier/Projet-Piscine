const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        await eventController.updateEventById(eventId, req.body);
        res.status(200).json({ message: 'Event mis à jour avec succès.'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
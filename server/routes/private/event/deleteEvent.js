const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        await eventController.deleteEventById(eventId);
        return res.status(200).json({ message: 'Event supprimé avec succès.'});
        // TODO: supprimer les slots reliés à l'event
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
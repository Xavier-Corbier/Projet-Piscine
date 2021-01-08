const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const event = await eventController.getEventById(eventId);
        if (!event) { // l'event est null
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'event, il est null.'});
        } else {
            res.status(200).json({ message: 'Event récupéré avec succès.', event: event });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
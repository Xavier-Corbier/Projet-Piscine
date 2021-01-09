const eventController = require('../../../controllers/eventController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        if (validationUtils.isObjectId(eventId) === false) {
            req.status(400).json({ error: 'L\'id passé en paramètre est invalide.'});
        }
        const event = req.body;
        if (validationUtils.isEditable(event, ['name', 'color', 'bookingDeadline']) === false) {
            req.status(400).json({ error: 'Certains attributs de l\'event que vous essayez de modifier ne le sont pas.'});
        }
        await eventController.updateEventById(eventId, event);
        res.status(200).json({ message: 'Event mis à jour avec succès.'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
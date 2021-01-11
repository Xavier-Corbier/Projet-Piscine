const eventController = require('../../../controllers/eventController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');


module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const body = req.body;
        cleanUtils.cleanEvent(body);

        // Vérifications
        if (validationUtils.isAlphaNumeric(body.name) === false) {
            return res.status(400).json({ error: 'Le nom de l\'event n\'est pas alphanumérique.' });
        }
        if (validationUtils.isHexColorCode(body.color) === false) {
            return res.status(400).json({ error: 'La couleur n\'est pas au bon format.' });
        }
        if (validationUtils.isEditable(body, ['name', 'color', 'bookingDeadline']) === false) {
            return res.status(400).json({ error: 'Certains attributs de l\'event que ' +
                    'vous essayez de modifier ne sont pas modifiables.'});
        }

        await eventController.updateEventById(eventId, body);
        return res.status(200).json({ message: 'Event mis à jour avec succès.'});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
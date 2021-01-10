const eventController = require('../../../controllers/eventController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');


module.exports = async (req, res, next) => {
    try {
        const body = req.body;
        cleanUtils.cleanEvent(body);

        // Vérifications
        if (validationUtils.isAlphaNumeric(body.name) === false) {
            return res.status(400).json({ error: 'Le nom de l\'event n\'est pas alphanumérique.' });
        }
        if (validationUtils.isPromo(body.promo) === false) {
            return res.status(400).json({ error: 'La promo n\'est pas au bon format.' });
        }
        if (validationUtils.isHexColorCode(body.color) === false) {
            return res.status(400).json({ error: 'La couleur n\'est pas au bon format.' });
        }

        const event = await eventController.createEvent(body);
        if (event === undefined) { // l'event est null
            return res.status(500).json({ message: 'Erreur lors de la création, l\'event est null.'});
        }

        await eventController.populateEventWithSlots(event);
        return res.status(201).json({message: 'Event créé et rempli avec succès.', event: event });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
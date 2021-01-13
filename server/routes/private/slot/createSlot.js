const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');

module.exports = async (req, res, next) => {
    try {
        const body = req.body;

        cleanUtils.cleanSlot(body);

        // Vérifications de format
        if (validationUtils.isAlphaNumeric(body.room) === false) {
            return res.status(400).json({ error: 'Le nom du slot n\'est pas alphanumérique.' });
        }

        // Vérifie qu'il n'y aura pas de chevauchement
        if (await slotController.overlaps(body) === true) {
            return res.status(400).json({ error: 'Le slot que vous essayez de modifier ' +
                    'chevauchera un slot déjà existant avec les attributs que vous lui donnez.'});
        }

        const slot = await slotController.createSlot(body.eventId, body.date);
        const eventId = body.eventId;
        const slotId = slot._id;

        // création des liens entre le slot et l'event
        await slotController.addEventToSlot(slotId, eventId);
        await eventController.addSlotToEvent(eventId, slotId);

        if (slot === null) {
            return res.status(500).json({ error: 'Erreur lors de la création, le slot est null.' });
        }

        return res.status(201).json({ message: 'Slot créé avec succès.' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
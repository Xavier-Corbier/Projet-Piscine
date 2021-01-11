const slotController = require('../../../controllers/slotController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');

module.exports = async (req, res, next) => {
    try {
        const body = req.body;
        cleanUtils.cleanSlot(body);

        // Vérifications
        if (validationUtils.isAlphaNumeric(body.room) === false) {
            return res.status(400).json({ error: 'Le nom du slot n\'est pas alphanumérique.' });
        }

        const slot = slotController.createSlot(body.eventId, body.date);
        if (slot === null) {
            return res.status(500).json({ error: 'Erreur lors de la création, le slot est null.' });
        }

        return res.status(201).json({ error: 'Slot créé avec succès.' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const slotController = require('../../../controllers/slotController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        if (validationUtils.isObjectId(eventId) == false) {
            req.status(400).json({ error: 'L\'id passé en paramètre est invalide.'});
        }
        const slots = await slotController.getAllSlotsFromEvent(eventId);
        if (slots === null) {
            req.status(400).json({ error: 'Il n\y a pas de slots dans l\'event demandé.'});
        }
        res.status(200).json({ message: 'Slots de l\'event récupérés avec succès.', slots: slots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
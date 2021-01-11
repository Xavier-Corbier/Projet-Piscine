const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const slots = await slotController.getAllSlotsFromEvent(eventId);
        if (slots === null) {
            req.status(500).json({ error: 'Erreur lors de la récupération des slots dans l\'event, ils sont null.'});
        }
        return res.status(200).json({ message: 'Slots de l\'event récupérés avec succès.', slots: slots });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
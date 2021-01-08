const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const eventId = req.query.eventId;
        const slots = await slotController.getAllSlotsFromEvent(eventId);
        res.status(200).json({ message: 'Slots de l\'event ' + eventId +'récupérés avec succès.', slots: slots });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
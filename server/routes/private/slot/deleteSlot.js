const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const slotId = req.query.slotId;
        await slotController.deleteSlotById(slotId);
        return res.status(200).json({ message: 'Slot supprimé avec succès.'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
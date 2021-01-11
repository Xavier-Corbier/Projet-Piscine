const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const slots = await slotController.getAllSlots();
        if (slots === null) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des slots, ils sont null.'});
        }
        return res.status(200).json({ message: 'Slots récupérés avec succès.', slots: slots} );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
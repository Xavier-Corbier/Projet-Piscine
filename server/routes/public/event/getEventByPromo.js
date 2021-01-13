const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const promoName = req.query.promoName;
        const event = await eventController.getEventByPromo(promoName);
        if (event === null) { // l'event est null
            return res.status(500).json({ message: 'Erreur lors de la récupération de l\'event, il est null.'});
        } else {
            return res.status(200).json({ message: 'Event récupéré avec succès.', event: event });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
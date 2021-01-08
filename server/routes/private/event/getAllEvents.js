const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const events = await eventController.getAllEvents();
        if (!events) { // l'event est null
            res.status(500).json({ message: 'Erreur lors de la récupération des events, ils sont null.'});
        } else {
            res.status(200).json({ message: 'Events récupérés avec succès.', events: events });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
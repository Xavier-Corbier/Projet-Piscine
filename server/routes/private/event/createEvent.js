const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const body = req.body;
        const event = await eventController.createEvent(body);
        if (event === undefined) { // l'event est null
            res.status(500).json({ message: 'Erreur lors de la création, l\'event est null.'});
        } else {
            await eventController.populateEventWithSlots(event);
            res.status(201).json({message: 'Event créé et rempli avec succès.', event: event });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
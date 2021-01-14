const slotController = require('../../../controllers/slotController');
const eventController = require('../../../controllers/eventController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');

/**
 * Créé un slot mais il ne doit pas y avoir de jury ni de group passé dans le body de la requête.
 * L'ajout se fait après.
 * @param req
 * @param res
 * @param next
 * @return {Promise<*>}
 */
module.exports = async (req, res, next) => {
    try {
        const body = req.body;

        const room = body.room;
        const date = body.date;
        const eventId = body.eventId;
        const groupId = body.groupId;
        const jury = body.jury;

        cleanUtils.cleanSlot(body);

        // Vérifie que l'event existe
        const event = await eventController.getEventById(eventId);
        if (event === null) {
            return res.status(400).json({ error: 'L\'event spécifié n\'existe pas.'});
        }

        if (groupId !== undefined) {
            return res.status(400).json({ error: 'L\'ajout d\'un groupe se fait après la création du slot.'});
        }

        if (room !== undefined) {
            // Il y a une salle donc elle doit être au bon format et il y a un risque de chevauchement

            // Vérifie que le format de la salle est valide
            if (validationUtils.isAlphaNumeric(room) === false) {
                return res.status(400).json({error: 'La salle du slot n\'est pas alphanumérique.'});
            }

            // Vérifie qu'il n'y aura pas de chevauchement
            if (await slotController.overlaps(body) === true) {
                return res.status(400).json({ error: 'Le slot que vous essayez de créer ' +
                        'chevauchera un slot déjà existant (plages horaires concurrentes dans la même salle)'});
            }
        }

        if (jury !== undefined) {
            return res.status(400).json({ error: 'L\'ajout de membre(s) du jury se fait après la création du slot.'});
        }

        // On peut créer le slot
        const slot = await slotController.createSlot(eventId, date);
        const slotId = slot._id;

        // création des liens entre le slot et l'event
        await slotController.addEventToSlot(slotId, eventId);
        await eventController.addSlotToEvent(eventId, slotId);

        if (slot === null) {
            return res.status(500).json({ error: 'Erreur lors de la création, le slot créé est null.' });
        }

        return res.status(201).json({ message: 'Slot créé avec succès.' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
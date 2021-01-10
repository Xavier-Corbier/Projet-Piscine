const Event = require('../models/Event');
const Slot = require('../models/Slot');
const slotController = require('./slotController');


/**
 * Ajoute un nouvel event à la base de données.
 * @param eventObject l'objet JSON représentant l'event
 * @returns {Promise<Document>}
 */
module.exports.createEvent = async (eventObject) => {
    try {
        const event = new Event({
            ...eventObject,
            slotList: []
        });
        return await event.save(); // on return l'event pour le récupérer dans la partie "then" de la Promise retournée
    } catch (error) {
        console.log(error);
        throw error; // on throw l'erreur pour la récupérer dans la partie "catch" de la Promise retournée
    }
};

/**
 * Ajoute l'id d'un slot à la liste des slots d'un event
 * et l'id de l'event au slot ajouté.
 * @param eventId l'id de l'event auquel on va ajouter le slot
 * @param slotId l'id du slot à ajouter
 * @returns {Promise<void>}
 */
const addSlotToEvent = async (eventId, slotId) => {
    try {
        Slot.updateOne({ _id: slotId }, { eventId: eventId });
        return await Event.updateOne({ _id: eventId }, { $push: { slotList: slotId } }, {new: true});
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports.addSlotToEvent = addSlotToEvent;

/**
 *
 * @param eventId
 * @param slotId
 * @returns {Promise<void>}
 */
module.exports.removeSlotFromEvent = async (eventId, slotId) => {
    try {
        Slot.updateOne({ _id: slotId }, { event: eventId });
        return await Event.updateOne({ _id: eventId }, { $pull: { slotList: slotId } }, {new: true});
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Remplit automatiquement un event avec des slots. Les weekends sont ignorés.
 * @param eventObject l'objet JSON représentant l'event
 * @returns {Promise<void>}
 */
module.exports.populateEventWithSlots = async (eventObject) => {
    const eventId = eventObject._id;

    const slotDuration = eventObject.slotDuration;

    const breakDuration = eventObject.breakDuration;

    const startDate = eventObject.startDate;
    const endDate = eventObject.endDate;

    // for "tous les jours de la semaine compris entre la date de début et la date de fin"
    for (let d = new Date(startDate.getTime()); d <= endDate; d.setDate(d.getDate() + 1)) { // "setDate()" modifie le jour

        if (d.getDay() === 0 || d.getDay() === 6) {
            // on n'ajoute pas de créneaux le weekend
            break;
        }

        // on réinitialise l'heure pour chaque nouveau jour
        d.setHours(startDate.getHours());
        d.setMinutes(startDate.getMinutes());

        for (let i = 1; i <= 6; i++) {
            let slot = await slotController.createSlot(eventId, d);
            await addSlotToEvent(eventId, slot._id);

            // incrémente l'heure actuelle avec la durée du slot
            d.setMinutes(d.getMinutes() + slotDuration);

            if (i === 3) {
                // c'est l'heure de la pause
                // incrémente l'heure actuelle avec la durée de la pause
                d.setMinutes(d.getMinutes() + breakDuration);
            }
        }
    }
};

/**
 * Récupère un event dans la base de données.
 * @param eventId l'id de l'event à récupérer
 * @returns {Promise<Query<Document | null, Document>>}
 */
module.exports.getEventById = async (eventId) => {
    try {
        return await Event.findOne({ _id: eventId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Récupère tous les évènements dans la base de données.
 * @returns {Promise<any>}
 */
module.exports.getAllEvents = async () => {
    try {
        return await Event.find();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Update un event à partir de son id.
 * @param eventId l'id de l'event à update
 * @param newEvent l'objet JSON avec lequel on va update l'event
 * @returns {Promise<any>}
 */
module.exports.updateEventById = async (eventId, newEvent) => {
  try {
      return await Event.findOneAndUpdate({ _id: eventId }, { _id: eventId, ...newEvent }, { new: true });
  } catch (error) {
      console.error(error);
      throw error;
  }
};

/**
 * Supprime un event à partir de son id.
 * @param eventId l'id de l'event à supprimer.
 * @returns {Promise<any>}
 */
module.exports.deleteEventById = async (eventId) => {
    try {
        return await Event.findByIdAndDelete(eventId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

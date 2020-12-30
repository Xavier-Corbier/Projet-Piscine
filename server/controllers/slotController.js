const Slot = require('../models/Slot');

/**
 * Ajoute un nouveau slot à la base de données.
 * @param slotObject
 * @returns {Promise<Document>}
 */
module.exports.createSlot = async (eventId, date) => {
    try {
        const slot = new Slot({
            date: date,
            eventId: eventId
        });
        return await slot.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Récupère un slot dans la base de données.
 * @param slotId l'id du slot à récupérer
 * @returns {Promise<any>}
 */
module.exports.getSlotById = async (slotId) => {
    try {
        return await Slot.findOne({ _id: slotId });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Récupère tous les slots dans la base de données.
 * @returns {Promise<any>}
 */
module.exports.getAllSlots = async () => {
    try {
        return await Slot.find();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Update un slot à partir de son id.
 * @param slotId l'id du slot à update
 * @param newSlot l'objet JSON avec lequel on va remplacer le slot
 * @returns {Promise<any>}
 */
module.exports.updateSlotById = async (slotId, newSlot) => {
    try {
        return await Slot.updateOne({ _id: slotId }, { _id: slotId, ...newSlot }, { new: true });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.deleteSlotById = async (slotId) => {
    try {
        return await Slot.findByIdAndDelete(slotId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
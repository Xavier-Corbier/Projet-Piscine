const Slot = require('../models/Slot');
const Event = require('../models/Event');
const Group = require('../models/Group');

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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
        throw error;
    }
};

/**
 * Récupère tous les slots d'un event.
 * @param eventId l'id de l'event dont on veut récupérer les slots.
 * @returns {Promise<any>}
 */
module.exports.getAllSlotsFromEvent = async (eventId) => {
    try {
        return await Slot.find({ eventId: eventId });
    } catch (error) {
        console.error(error);
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
        console.error(error);
        throw error;
    }
};

/**
 * Ajoute un groupe à un slot et le groupe au slot.
 * @param slotID
 * @param groupId
 * @returns {Promise<any>}
 */
module.exports.addGroupToSlot = async (slotId, groupId) => {
    try {
        await Group.updateOne({ _id: groupId }), { slot: slotId};
        return await Slot.updateOne({ _id: slotId }, { groupId: groupId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Supprime un slot à partir de son id.
 * @param slotId
 * @returns {Promise<any>}
 */
module.exports.deleteSlotById = async (slotId) => {
    try {
        return await Slot.findByIdAndDelete(slotId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Supprime tous les slots d'un event.
 * @param eventId
 * @returns {Promise<void>}
 */
module.exports.deleteAllSlotsFromEvent = async (eventId) => {
    try {
        await Event.updateOne({ _id: eventId }, { slotList: [] });
        return await Slot.deleteMany({ eventId: eventId });

    } catch (error) {
        console.error(error);
        throw error;
    }
};
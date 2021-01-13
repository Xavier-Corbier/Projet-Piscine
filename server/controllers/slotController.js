const Slot = require('../models/Slot');
const Event = require('../models/Event');

/**
 * Ajoute un nouveau slot à la base de données.
 * @param slotObject le slot
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
 * Ajoute l'id d'un event à un slot.
 * @param eventId l'id de l'event à ajouter
 * @param slotId l'id du slot auquel on va ajouter l'event
 * @return {Promise<*>}
 */
const addEventToSlot = async (slotId, eventId) => {
  try {
      return await Slot.updateOne({ _id: slotId }, { eventId: eventId });
  } catch (error) {
      console.error(error);
      throw error;
  }
};
module.exports.addEventToSlot = addEventToSlot;

/**
 * Enlève l'id d'un event à un slot
 * @param slotId
 * @param eventId
 * @return {Promise<*>}
 */
/*const removeEventFromSlot = async (slotId) => {
    try {
        return await Slot.updateOne({ _id: slotId }, { $unset: { eventId: "" } });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports.removeEventFromSlot = removeEventFromSlot;*/

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
        return await Slot.updateOne({ _id: slotId }, { _id: slotId, ...newSlot });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Ajoute un groupe à un slot.
 * @param slotID
 * @param groupId
 * @returns {Promise<any>}
 */
module.exports.addGroupToSlot = async (slotId, groupId) => {
    try {
        return await Slot.updateOne({ _id: slotId }, { groupId: groupId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Supprime un groupe d'un slot.
 * @param slotId
 * @return {Promise<*>}
 */
module.exports.removeGroupFromSlot = async (slotId) => {
    try {
        return await Slot.updateOne({ _id: slotId }, { $unset: { groupId: "" } });
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
module.exports.deleteAllSlotsByEventId = async (eventId) => {
    try {
        return await Slot.deleteMany({ eventId: eventId });
    } catch (error) {
        console.error(error);
        throw error;
    }
};


/**
 * Calcule et retourne la date de fin d'un slot à partir de son id.
 * @param slotId l'id du slot dont on veut la date de fin
 * @return {Promise<number>} une Promise contenant la date de fin du slot s'il n'y a pas d'erreur
 */
// fonction privée donc pas exportée
const getEndDate = async (slotId) => {
    try {
        const slot = await Slot.findOne({ _id: slotId });
        const event = await Event.findOne({ _id: slot.eventId });
        const date = slot.date;

        return date.setMinutes(date.getMinutes + event.slotDuration);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Vérifie que le slot passé en paramètre ne chevauche pas un slot déjà existant.
 * Un slot en chevauche un autre si pour une salle donnée leurs heures sont concurrentes.
 * @param slot le slot qui ne doit pas chevaucher un slot déjà existant.
 * @return {Promise<boolean>}
 */
/*
Cette fonction est dans le controller au lieu d'être dans le validationUtils car,
bien qu'elle fasse une vérification sur le slot, elle interagit avec la base de données (findOne).
 */
module.exports.overlaps = async (slot) => {
    try {
        if (slot.room === null) {
            // le slot n'a pas de salle : pas de chevauchement
            return false;
        } else {
            const foundSlot = Slot.findOne({ room: slot.room });
            if (foundSlot !== null) {
                // les slots sont dans la même salle, on vérifie que les dates ne se chevauchent pas
                const uncertainStartDate = slot.date;
                const uncertainEndDate = getEndDate(slot._id);
                const startDate = foundSlot.date;
                const endDate = getEndDate(foundSlot._id);

                if (uncertainStartDate <= endDate && uncertainStartDate >= startDate) {
                    // la date de début chevauche le slot existant
                    return true;
                }

                if (uncertainEndDate <= endDate && uncertainEndDate >= startDate) {
                    // la date de fin chevauche le slot existant
                    return true;
                }

            } else {
                // aucun slot avec la même salle n'a été trouvé : pas de chevauchement
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Indique si un slot chevauche un autre slot (ne vérifie que les dates, pas la salle).
 * @param slot1 le premier slot
 * @param slot2 le second slot
 * @return {Promise<Boolean>}
 */
const datesOverlapsWith = async (slotId1, slotId2) => {
    const slot1 =  await Slot.findOne({ _id: slotId1 });
    const slot2 =  await Slot.findOne({ _id: slotId2 });
    const startDate1 = slot1.date;
    const startDate2 = slot2.date;
    const endDate1 = getEndDate(slot1._id);
    const endDate2 = getEndDate(slot2._id);

    if (startDate1 >= startDate2 && startDate1 <= endDate2) {
        // la date de début 1 chevauche le slot 2
        return true;
    }

    if (endDate1 >= startDate2 && endDate1 <= endDate2) {
        //la date de fin 1 chevauche le slot 2
        return true;
    }

    // les slots ne se chevauchent pas
    return false;
};
module.exports.datesOverlapsWith = datesOverlapsWith;

/**
 * Indique si un slot chevauche un des slots compris dans une liste (ne vérifie que les dates, pas les salles).
 * Précondition : les ids de tous les sots sont valides et existent
 * @param uncertainSlotId l'id du slot à vérifier
 * @param slotIdList la liste de slots
 * @return {Promise<Boolean>}
 */
module.exports.datesOverlapsWithSlotList = async (uncertainSlotId, slotIdList) => {
    for (let i = 0; i < slotIdList.length; i++) {
        const slotId = slotIdList[i];
        const isDateOverlapped = await datesOverlapsWith(uncertainSlotId, slotId);
        if (isDateOverlapped) {
            return true;
        }
        /*for (const slotId in slotIdList) {
            //console.log(slotId);
            console.log(slotIdList[0]);
            const isDateOverlapped = await datesOverlapsWith(uncertainSlotId, slotId);
            if (isDateOverlapped) {
                return true;
            }
        }*/
    }
    return false;
};

/**
 * Ajoute un jury (teacher) à la liste de jury du slot
 * @param idSlot
 * @param idTeacher
 * @return {Promise<*>}
 */
module.exports.addTeacherToSlot = async (idSlot, idTeacher) => {
    try {
        return await Slot.findByIdAndUpdate({_id: idSlot}, {$push: {jury: idTeacher}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

/**
 * Supprime un jury (teacher) de la liste de jury du slot.
 * @param idSlot
 * @param idTeacher
 * @return {Promise<*>}
 */
module.exports.removeTeacherFromSlot = async (idSlot, idTeacher) => {
    try {
        return await Slot.findOneAndUpdate({_id: idSlot}, {$pull: {jury: idTeacher}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

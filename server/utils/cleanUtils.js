/**
 * Nettoie les attributs d'un event (supprime les espaces inutiles,
 * passe certains attributs en upperCase...)
 * @param event l'event à nettoyer
 */
module.exports.cleanEvent = (event) => {
    if (event.name) {
        event.name = event.name.toString().trim();
    }
    if (event.promo) {
        event.promo = event.promo.toString().trim().toUpperCase();
    }
    if (event.color) {
        event.color = event.color.toString().trim();
    }
};

/**
 * Nettoie les attributs d'un slot (supprime les espaces inutiles,
 * passe certains attributs en upperCase...)
 * @param slot le slot à nettoyer
 */
module.exports.cleanSlot = (slot) => {
    if (slot.room) {
        slot.room = slot.room.toString().trim().toUpperCase();
    }
};
const mongoose = require('mongoose');

/**
 * Vérifie si un objet passé en paramètre est un ObjectID de mongoose.
 * @param object l'objet à vérifier
 * @return {boolean} true si l'objet est un ObjectId; false sinon
 */
module.exports.isObjectId = (object) => {
    return mongoose.Types.ObjectId.isValid(object.toString());
};

/**
 * Vérifie si un objet passé en paramètre est modifiable. Pour qu'un objet soit modifiable il faut
 * que toutes ses clés soient contenues dans le tableau "editableKeys".
 * @param requestObject l'objet à vérifier
 * @param editableKeys le tableau contenant les clés modifiables
 */
module.exports.isEditable = (requestObject, editableKeys) => {
    for (const [key, value] of Object.entries(requestObject)) {
        if (editableKeys.contains(key) === false) {
            return false; // une des clés n'est pas modifiable
        }
    }
    return true; // toutes les clés sont modifiables
};
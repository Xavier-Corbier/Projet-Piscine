/**
 * Vérifie si un objet passé en paramètre est modifiable. Pour qu'un objet soit modifiable il faut
 * que toutes ses clés soient contenues dans le tableau "editableKeys".
 * @param requestObject l'objet à vérifier
 * @param editableKeys le tableau contenant les clés modifiables
 * @return {boolean} true si l'objet est modifiable; false sinon
*/
module.exports.isEditable = (requestObject, editableKeys) => {
    for (const [key, value] of Object.entries(requestObject)) {
        if (editableKeys.includes(key) === false) {
            return false; // une des clés n'est pas modifiable
        }
    }
    return true; // toutes les clés sont modifiables
};

/**
 * Vérifie qu'une String passée en paramètre respecte le format d'un code couleur hexadecimal.
 * @param string la string à vérifier
 * @return {*} true si la String est dans le bon format; false sinon
 */
module.exports.isHexColorCode = (string) => {
    const hexColorRegex = /#([a-f]|[A-F]|[0-9]){6}/;
    return hexColorRegex.test(string);
};

/**
 * Vérifie qu'une String passée en paramètre respecte le format d'une promo d'IG.
 * Formats acceptés : IG3, IG4 ou IG5
 * @param string la string à vérifier
 * @return {*} true si la String est dans le bon format; false sinon
 */
module.exports.isPromo = (string) => {
  const promoRegex = /[iI][gG][3-5]/;
  return promoRegex.test(string);
};

/**
 * Vérifie qu'une String passée en paramètre respecte le format d'un nom d'event.
 * @param string la string à vérifier
 * @return {*} true si la String est dans le bon format; false sinon
 */
module.exports.isAlphaNumeric = (string) => {
    const eventNameRegex = /\w+/;
    return eventNameRegex.test(string);
};
/*Variables*/
const listPromo = ["IG3","IG4","IG5","Ancien"]; //liste des promos valides

/*Fonctions*/
/**
 * Vérifie si un objet passé en paramètre est modifiable. Pour qu'un objet soit modifiable il faut
 * que toutes ses clés soient contenues dans le tableau "editableKeys".
 * @param requestObject l'objet à vérifier
 * @param editableKeys le tableau contenant les clés modifiables
 * @return {boolean} true si l'objet est modifiable; false sinon
*/
const isEditable = (requestObject, editableKeys) => {
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
const isHexColorCode = (string) => {
    const hexColorRegex = /#([a-f]|[A-F]|[0-9]){6}/;
    return hexColorRegex.test(string);
};

/**
 * Vérifie si la promo passé en paramètre est valide (présent dans notre liste de promo)
 * @param promo : String
 * @returns {boolean} : true si le string passé en paramètre correspond à une promo valide, false sinon
 */
const isPromo = (promo) => {
    return listPromo.indexOf(promo)>-1;
}

/**
 * Vérifie qu'une String passée en paramètre respecte le format d'un nom d'event.
 * @param string la string à vérifier
 * @return {*} true si la String est dans le bon format; false sinon
 */
const isAlphaNumeric = (string) => {
    const eventNameRegex = /[A-Za-z0-9]/;
    return eventNameRegex.test(string);
};

const isUserEmail = (email) => {
    const regEmail = /^[a-z-]{3,20}\.[a-z\-]{3,30}[0-9]{0,3}@(etu.)?(umontpellier.fr)$/;
    return regEmail.test(email);
}

const isStudentEmail = (email) => {
    const regStudentEmail = /^[a-z\-]{3,20}\.[a-z\-]{3,30}[0-9]{0,3}(@etu.umontpellier.fr)$/;
    return regStudentEmail.test(email);
}

const isAdminEmail = (email) => {
    const regAdminEmail = /^[a-z\-]{3,20}\.[a-z\-]{3,30}[0-9]{0,3}(@umontpellier.fr)$/;
    return regAdminEmail.test(email);
}

module.exports = {
    isEditable,
    isHexColorCode,
    isPromo,
    isAlphaNumeric,
    isUserEmail,
    isStudentEmail,
    isAdminEmail
}

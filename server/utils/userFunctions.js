const tokenFunctions = require('../encryption/token');
const studentController = require('../controllers/studentController');

/**
 * Extrait le nom et le prenom d'un utilisateur à partir de son email
 * @param email : string de la forme prenom.nom(chiffre possible)@etu.umontpellier.fr
 * @returns {[string, string]} : retourne le nom et le prenom dans un tableau
 */
const createNameByEmail = (email) => {
    const PN = email.split('@')[0];
    const prenom = PN.split('.')[0];
    const nom = PN.split('.')[1].replace(new RegExp("[^(a-zA-Z)]", "g"), ''); //supprime les chiffres possibles
    const prenomCapitalized = prenom.charAt(0).toUpperCase() + prenom.slice(1);
    const nomCapitalized = nom.charAt(0).toUpperCase() + nom.slice(1);
    return [prenomCapitalized, nomCapitalized];
}

module.exports = {createNameByEmail}

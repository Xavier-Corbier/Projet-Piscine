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

const canManipulateGroup = async (baererHeader, idGroup) => {
    try {
        const decodedToken = await tokenFunctions.decodedToken(baererHeader);
        if (decodedToken.isAdmin){ //l'admin peut agir sur n'importe quel groupe
            return true
        }/*else{ //on verifie si l'etudiant fait bien partie du group à modifier
            const idStudent = decodedToken.id;
            const student = await studentController.getStudentById(idStudent);
            if(student.group && student.group.toString() === idGroup.toString()){
                return true
            }else{
                return false
            }
        }*/
        return true
    }catch(e) {
        console.log(e);
    }
}

module.exports = {createNameByEmail, canManipulateGroup}

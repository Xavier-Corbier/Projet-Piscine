const jwt = require('jsonwebtoken');

/**
 * Prend en paramètre un header bearer, extrait le token et retourne le token décodé ou false s'il n'a pu le décoder
 * @param bearerHeader
 * @returns {Promise<boolean|*>}
 */
const decodedToken = async (bearerHeader) => {
    try {
        const bearerToken = bearerHeader.split(" ")[1]; //récupération du token
        const decodedToken = jwt.verify(bearerToken, process.env.tokenkey); //décodage du token
        return decodedToken;
    } catch (error) {
        console.log("Erreur lors de la récupération du token ");
        return false;
    }
}

/**
 * Créer le token d'un utilisateur
 * @param user : ObjectJSON admin ou student
 * @param isAdmin : boolean pour savoir si l'utilisateur et l'admin
 * @returns
 */
const createUserToken = async (user, isAdmin) => {
    try {
        //données cryptées dans le token
        const tokenUser = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            isAdmin: isAdmin,
        };
        //creation du token
        const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '2h'});
        //retour
        const myReturn = {
            success: true,
            message: 'Connected !',
            token: token,
            firstName: user.firstname,
            userId: user._id,
            isAdmin: isAdmin
        };
        return myReturn;
    }catch (error) {
        console.log(error);
    }
};

module.exports = {createUserToken, decodedToken};

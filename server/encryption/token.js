const jwt = require('jsonwebtoken');

const decodedToken = async (bearerHeader) => {
    try {
        const bearerToken = bearerHeader.split(" ")[1]; //récupération du token
        const decodedToken = jwt.verify(bearerToken, process.env.tokenkey); //décodage du token
    } catch (error) {
        console.log("Erreur lors de la récupération du token ");
        return false;
    }
}

const createUserToken = async (user, isAdmin) => {
    //création d'un token pour les utilisateurs
    try {
        //données cryptées dans le token
        const tokenUser = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            isAdmin: isAdmin,
        };
        //creation du token
        const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
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

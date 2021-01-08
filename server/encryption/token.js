const jwt = require('jsonwebtoken');

const token = async (req) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        return jwt.decode(token);
    } catch (error) {
        console.log("erreur lors de la récupération du token ");
        return false;
    }
}

const createUserToken = async (user, isAdmin) => {
    //création d'un token pour les utilisateurs
    try {
        //if password compare is true, we return token
        const tokenUser = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            isAdmin: isAdmin,
        };
        const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
        const myReturn = {
            success: true,
            message: 'Connected !',
            token: token,
            firstName: user.firstname,
            userId: user._id,
            isAdmin: isAdmin
        };
        console.log({myReturn})
        return myReturn;
    }catch (error) {
        console.log(error);
    }
};

module.exports = {createUserToken, token};

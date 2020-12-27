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

//const userId = decodedToken.userId;

module.exports = {decodeToken: token};

require('dotenv').config();
const jwt = require('jsonwebtoken');
const token = require('../encryption/token');

module.exports = async (req, res , next) => {
    try {
        let bearerToken;
        const bearerHeader = req.headers["authorization"]; //récupération du header
        if (typeof bearerHeader !== 'undefined') {
            const decodedToken = await token.decodedToken(bearerHeader);//décodage du token
            const isAdmin = decodedToken.isAdmin; //récupération du bool isAdmin stocké dans le token
            if (!isAdmin ) { //il ne s'agit pas de l'admin
                res.status(403).json({ error : "Impossible d'accéder à cette page protégée"});
                return false;
            } else { //il s'agit de l'admin : il peut accéder à la page
                next();
                return true;
            }
        } else { //aucun header trouvé
            res.status(401).json({message : "Aucun token "})
        }
    }catch(error) {
        res.status(401).json({message: "Unauthorized"});
    }
};

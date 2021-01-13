require('dotenv').config();
const token = require('../encryption/token');

/**
 * Middlewares qui vérifie si l'user authantifier correspond à l'admin,
 * si oui il pourra acceder aux routes qui seront placées après le middlewares,
 * si non il sera bloqué
 * @param req
 * @param res
 * @param next
 * @returns {Promise<boolean>}
 */
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

require('dotenv').config();
const jwt = require('jsonwebtoken');
const token = require('../encryption/token');

module.exports = async (req, res , next) => {
    try {
        const bearerHeader = req.headers["authorization"]; //récupération du header
        if (typeof bearerHeader !== 'undefined') {
            const decodedToken = await token.decodedToken(bearerHeader); //décodage du token
            console.log(decodedToken)
            const userId = decodedToken.id; //récupération de l'id stocké dans le token
            const isAdmin = decodedToken.isAdmin; //récupération du bool isAdmin stocké dans le token
            if ((req.query.id && req.query.id.toString() === userId.toString()) || isAdmin ) {
                //l'id du token correspond à celui de la query : l'étudiant peut accéder à la page OU il s'agit de l'admin
                next();
                return true;
            } else { //l'utilisateur n'a pas l'autorisation d'accéder à cette page
                res.status(403).json({ error : "Impossible d'accéder à cette page protégée"});
                return false;
            }
        } else { //aucun header trouvé
            res.status(401).json({message : "Aucun token "})
        }
    }catch(error) {
        console.log(error)
        res.status(401).json({message: "Unauthorized"});
    }
};

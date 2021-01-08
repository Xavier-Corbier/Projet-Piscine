require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res , next) => {
    try {
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            const decodedToken = jwt.verify(bearerToken, process.env.tokenkey);
            const userId = decodedToken.id;
            const isAdmin = decodedToken.isAdmin;
            if ((req.query.id && req.query.id.toString() === userId.toString()) || isAdmin ) {
                next();
                return true;
            } else {
                console.log("Impossible d'accéder à cette page protégée");
                res.status(403).json({ error : "Impossible d'accéder à cette page protégée"});
                return false;
            }
        } else {
            console.log("Aucun token");
            res.status(401).json({message : "Aucun token "})
        }
    }catch(error) {
        res.status(401).json({message: "Unauthorized"});
    }
};

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
            console.log(isAdmin);
            if (!isAdmin ) {
                console.log("Impossible d'accéder à cette page protégée");
                res.status(403).json({ error : "Impossible d'accéder à cette page protégée"});
                return false;
            } else {
                next();
                return true;
            }
        } else {
            console.log("Aucun token");
            res.send({status : 401,message : "Aucun token"})
        }
    }catch(error) {
        console.log("try / catch ");
        res.send({status: 403, message: "Bad news token wrong"});
    }
};

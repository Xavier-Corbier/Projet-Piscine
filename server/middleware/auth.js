require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    try {
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            jwt.verify(bearerToken, process.env.tokenkey, function (err) {
                if (err) {
                    console.log("Impossible d'accéder à cette page protégée 12");
                    res.send({status: 403});
                    return false;
                } else {
                    next();
                    return true;
                }
            });
        } else {
            console.log("Aucun token");
            res.send({status: 401, message: "mon message d'erreur de token"})
        }
    } catch (error) {
        console.log("try / catch ");
        res.send({status: 403, message: "Bad news token wrong"});
    }
};

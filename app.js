require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors()); // TODO: se documenter sur cors

// Les requêtes qui ne passent pas par le middleware d'authentification sont redirigées vers le router public
// TODO: implémenter le router public
//app.use("/api", require('./server/routes/public'));

// Les requêtes qui passent par le middleware d'authentification sont redirigées vers le router privé
app.use("/api", /*require('./server/middleware/auth'),*/ require('./server/routes/private'));
// TODO: implémenter le middleware d'auth

/* Handling errors */
app.use((req,res,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        error : {
            message : err.message,
            status : err.status
        }
    });
});

module.exports = app;

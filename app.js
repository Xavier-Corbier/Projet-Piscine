require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.MONGO_URI,
    { useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors()); // TODO: se documenter sur cors

app.use(bodyParser.json());

// Les requêtes qui ne passent pas par le middleware d'authentification sont redirigées vers le router public
app.use("/api", require('./server/routes/public'));

// Les requêtes qui passent par le middleware d'authentification sont redirigées vers le router privé
app.use("/api", require('./server/middleware/auth'), require('./server/routes/private'));

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

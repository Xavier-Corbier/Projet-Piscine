require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

/*mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));*/

app.use(cors());

//routes accessible without being authenticated are redirected in routes
//app.use("/api", require('./server/routes/public'));

//All routes with restricted content pass trough the isAuth middleware to verify authentication
app.use("/api", /*require('./server/middleware/auth'),*/ require('./server/routes/private'));

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

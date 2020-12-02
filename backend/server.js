// imports
const http = require('http');
const app = require('./app');

const normalizePort = (val) => {
    const port = parseInt(val, 10); // parse la valeur "val" en base 10

    if (isNaN(port)) { // si le port n'est pas un nombre
        return val;
    }

    if (port >= 0) { // si le port est supérieur à 0 on le retourne
        return port;
    }
    return false; // dans tous les autres cas on return false
};

const port = normalizePort(process.env.PORT || 3000); // définit le port (que l'on normalise avec notre fonction)
app.set('port', port); // set le port de l'app express

const errorHandler = (error) => {
    if (error.syscall !== 'listen') { // syscall : propriété de l'erreur qui décrit quel appel système a foiré
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

    switch (error.code) {
        case 'EACCES': // erreur d'accès (manque de privilèges)
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE': // erreur de port déjà utilisé
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default: // toutes les autres erreurs
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind)
});

server.listen(port);

// require('dotenv').config();
// const http = require('http');
// const app = require('./app');
//
//
// const normalizePort = val => {
//     const port = parseInt(val, 10);
//
//     if (isNaN(port)) {
//         return val;
//     }
//     if (port >= 0) {
//         return port;
//     }
//     return false;
// };
// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
//
// const errorHandler = error => {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges.');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use.');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// };
//
// const server = http.createServer(app);
//
//
// server.on('error', errorHandler);
// server.on('listening', () => {
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
//     console.log('Listening on ' + bind);
// });
//
// server.listen(port);

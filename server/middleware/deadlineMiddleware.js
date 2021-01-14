require('dotenv').config();
const studentController = require('../controllers/studentController');
const eventController = require('../controllers/eventController');

/**
 * Middleware qui vérifie si la deadline de l'evenement auquel l'étudiant est inscrit n'est pas passée
 * si oui, il ne peut pas accéder au routes suivantes
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>|boolean>}
 */
module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id; //recupération de l'id de l'étudiant
        const student = await studentController.getStudentById(idStudent);

        //on vérifie que la deadline de l'evenement n'est pas passé
        const promo = student.promo;
        const event = await eventController.getEventByPromo(promo);
        if (event === null) {
            res.status(403).json({error: "Il n\'y a pas d\'event pour la promo " + promo});
        }
        if (new Date() > event.bookingDeadline) {
            res.status(403).json({error: "La date limite de réservation est dépassée"});
            return false;
        }else {
            next();
            return true;
        }
    }catch(e) {
        console.log(e);
        return res.status(401).json({message: "Unauthorized"});
    }
}

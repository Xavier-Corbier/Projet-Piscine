const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
const eventController = require('../../../controllers/eventController');

/*
Les middlewares auth, deadlineMiddleware et groupAutorization  ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - le groupe qui est dans la query existe
    - l'étudiant fait partie du groupe qu'il veut modifier
    - la deadline de l'evenement n'est pas dépassée
 */

/**
 * Ajoute un étudiant dans un groupe : ajoute aussi la propriété groupe à l'étudiant
 * Préconditions :
 *  - Le groupe ne doit pas avoir atteint le nombre maximum d'étudiant par groupe indiqué dans l'évenement
 *  - L'étudiant qu el'on souhaite ajouter ne doit pas déjà faire partie d'un groupe
 *  - L'étudiant à ajouter doit faire partie de la même promotion que l'étudiant qui souhaite l'ajouter (que le groupe)
 * @param req
    *  query : doit contenir l'id d'un group et de l'étudiant authentifié
    * body : doit contenir l'id de l'étudiant à ajouter
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du group à modifier
        const idStudentToAdd = req.body.idStudent; //recuperation de l'id du student à ajouter au group

        //on vérifie si le groupe n'a pas atteint le nombre d'élève maximum
        const group = await groupController.getGroupById(idGroup);
        const event = await eventController.getEventByPromo(group.promo);
        const studentList = group.studentList;
        if(studentList.length >= event.maxStudentNumber){
            return res.status(400).json({error: "Vous ne pouvez pas ajouter d'étudiant : votre groupe à atteint le " +
                    "nombre maximum d'étudiant"});
        }

        //on vérifie si l'étudiant à ajouter n'a pas déjà un groupe affecté
        const studentToAdd = await studentController.getStudentById(idStudentToAdd);
        if(studentToAdd.group){
            return res.status(400).json({error: "Vous ne pouvez pas ajouter cet étudiant : il est déjà enregistré " +
                    "dans un groupe"});
        }

        //on vérifie si le student a la même promo que le student qui veut l'ajouter à son groupe
        if(studentToAdd.promo.toString() !== group.promo.toString()){
            return res.status(400).json({error: "Vous ne pouvez pas ajouter cet étudiant : il ne fait pas partie de " +
                    "votre promo"});
        }

        //Toutes les vérifications ont été faites: on fait l'ajout

        //Etape 1 : Ajout de 'étudiant dans le groupe
        const groupUpdate = await groupController.addStudentToGroup(idGroup, idStudentToAdd);

        //Etape 2 : Ajout du groupe pour l'étudiant
        await studentController.addGroupToStudent(idStudentToAdd,idGroup);

        //L'ajout à été affectué
        return res.status(200).json(groupUpdate);

    }catch(e){
        console.log(e);
        return res.status(500).json({error: "Impossible d'ajouter cet élève au groupe"});
    }
}

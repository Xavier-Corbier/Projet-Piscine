const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
const eventController = require('../../../controllers/eventController');

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du group à modifier
        const idStudent = req.query.id; //recuperation de l'id de l'étudiant qui fait la modification
        const idStudentToAdd = req.body.idStudent; //recuperation de l'id du student à ajouter au group

        const student = await studentController.getStudentById(idStudent); //récupération de l'étudiant qui fait la
        // modification

        //verification du student :

        //on vérifie si le groupe n'a pas atteint le nombre d'élève maximum
        const event = await eventController.getEventByPromo(student.promo);
        const group = await groupController.getGroupById(idGroup);
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
        if(studentToAdd.promo.toString() !== student.promo.toString()){
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

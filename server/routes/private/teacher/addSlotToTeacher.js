const teacherController = require('../../../controllers/teacherController');
const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const idSlot = req.body.slot;
        const slot = await slotController.getSlotById(idSlot);
        const id = req.query.idTeacher;
        const teacher = await teacherController.getTeacherId(id);
        slotListe = teacher.slotList;

        if (!slot){ // On regarde si le slot existe
            return res.status(400).json({error: "Impossible d'ajouter ce slot à l'enseignant car le slot n'existe pas "});
        }
        else if (slotListe.includes(idSlot)) { // On Regarde si le slot a déjà été ajouté
            return res.status(400).json({error: "Impossible d'ajouter le slot à l'enseignant, le slot a déjà été ajouté à l'enseignant"});
        }
        else {
            const teacherModifie = await teacherController.addSlotToTeacher(id,idSlot);
            if (!teacherModifie){
                return res.status(400).json({error: "Impossible d'ajouter le slot à l'enseignant"}); // Cas d'une autre erreur
            }else {
                return res.status(200).json(teacherModifie); // On ajoute le slot au teacher
            }
        }

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des enseignants"});
    }
}

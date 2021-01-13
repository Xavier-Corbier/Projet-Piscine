const teacherController = require('../../../controllers/teacherController');
const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idTeacher;
        const idSlot = req.body.slot;
        const slot = await slotController.getSlotById(idSlot);
        const teacher = await teacherController.getTeacherById(id)
        const slotListe = teacher.slotList

        if (!slot){ // On regarde si le slot existe
            return res.status(400).json({error: "Impossible de supprimer ce slot à l'enseignant car le slot n'existe pas "});
        }
        else if (!slotListe.includes(idSlot)){ // On regarde si le slot est bien à l'enseignant
            return res.status(400).json({error: "Impossible de supprimer ce slot à l'enseignant car le slot ne lui a pas été attribué "});
        }
        else {
            const teacherModifie = await teacherController.deleteSlotOfTeacher(id,idSlot);
            if (!teacherModifie){
                return res.status(400).json({error: "Suppression impossible du slot"});
            }else {
                return res.status(200).json({message : "Suppression réussie"});
            }
        }

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce slot du groupe"});
    }
}

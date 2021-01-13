const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const idTeacher = req.query.idTeacher;
        const idSlot = req.query.idSlot;
        const slot = await slotController.deleteJuryToSlot(idSlot, idTeacher);
        const teacher = await teacherController.deleteSlotOfTeacher(idTeacher, idSlot);
        if (!slot){
            return res.status(400).json({error: "Aucun créneaux"});
        }else if(!teacher) {
            return res.status(400).json({error: "Aucun enseignant"});
        }else {
            return res.status(200).json(slot);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de supprimer ce créneaux"});
    }
}

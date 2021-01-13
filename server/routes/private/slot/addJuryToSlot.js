const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        //TODO: verification : idTeacher = bien un teacher, pas vide ... idSLot existe
        //TODO : relier aux teacher : ajout du créneaux dans leur liste
        const idTeacher = req.query.idTeacher;
        const idSlot = req.query.idSlot;
        console.log(idTeacher, idSlot);
        const slot = await slotController.addJuryToSlot(idSlot, idTeacher);
        const teacher = await teacherController.addSlotToTeacher(idTeacher, idSlot);
        if (!slot){
            return res.status(400).json({error: "Aucun créneau"});
        }else if(!teacher) {
            return res.status(400).json({error: "Aucun enseignant"});
        }else {
            return res.status(200).json(slot);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier ce créneaux"});
    }
}

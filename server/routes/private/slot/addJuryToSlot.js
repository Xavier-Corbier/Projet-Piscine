const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const teacherId = req.query.idTeacher;
        const slotId = req.query.idSlot;

        const teacher = await teacherController.getTeacherById(teacherId);
        if (teacher === null) {
            return res.status(400).json({ error: 'Le teacher spécifié n\'existe pas.' });
        }

        const slot = await slotController.getSlotById(slotId);
        if (slot === null) {
            return res.status(400).json({ error: 'Le slot spécifié n\'existe pas.' });
        }

        const teacherSlotList = teacher.slotList;
        if (teacherSlotList !== undefined || teacherSlotList.length >= 1) {
            if (await slotController.datesOverlapsWithSlotList(slotId, teacherSlotList)) {
                return res.status(400).json({ error: 'Ce slot chevauchera un slot déjà existant du teacher.' });
            }

            if (slot.jury.includes(teacherId) === true) {
                return res.status(400).json({ error: 'Ce teacher est déjà assigné à ce slot.' });
            }
        }

        // Le slot et le teacher existent, on créé les liens
        await slotController.addTeacherToSlot(slotId, teacherId);
        await teacherController.addSlotToTeacher(teacherId, slotId);
        return res.status(200).json({message: 'Le teacher a été ajouté au slot avec succès.' });

    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message });
    }
};

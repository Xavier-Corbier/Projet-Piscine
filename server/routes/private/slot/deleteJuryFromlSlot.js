const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const teacherId = req.query.idTeacher;
        const slotId = req.query.idSlot;

        if (await teacherController.getTeacherId(teacherId) === undefined) {
            return res.status(400).json({ error: 'Le teacher spécifié n\'existe pas.' });
        }

        if (await slotController.getSlotById(slotId) === undefined) {
            return res.status(400).json({ error: 'Le slot spécifié n\'existe pas.' });
        }

        // Le teacher et le slot existent, on supprime les liens
        await slotController.removeTeacherFromSlot(slotId, teacherId);
        await teacherController.deleteSlotOfTeacher(teacherId, slotId);

        return res.status(200).json({message: 'Le teacher a été supprimé du slot avec succès.' });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
};

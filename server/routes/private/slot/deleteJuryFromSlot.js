const slotController = require('../../../controllers/slotController');
const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const teacherId = req.query.idTeacher;
        const slotId = req.query.idSlot;

        const teacher = await teacherController.getTeacherId(teacherId);
        if (teacher === null) {
            return res.status(400).json({ error: 'Le teacher spécifié n\'existe pas.' });
        }

        const slot = await slotController.getSlotById(slotId);
        if (slot === null) {
            return res.status(400).json({ error: 'Le slot spécifié n\'existe pas.' });
        }

        // Le teacher et le slot existent, on supprime les liens
        // Même si le teacher ne possède pas le slot ce n'est pas grave, on ne supprimera rien
        // Avec plus de temps il aurait quand même fallu faire cette vérif pour rendre le code plus propre
        await slotController.removeTeacherFromSlot(slotId, teacherId);
        await teacherController.deleteSlotOfTeacher(teacherId, slotId);

        return res.status(200).json({message: 'Le teacher a été supprimé du slot avec succès.' });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.message});
    }
};

const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idTeacher;
        const idSlot = req.body.slot;
        const teacher = await teacherController.deleteSlotOfTeacher(id,idSlot);
        console.log(id)
        console.log(idSlot)
        console.log(teacher)
        if (!teacher){
            return res.status(400).json({error: "Suppression impossible du slot"});
        }else {
            return res.status(200).json(teacher);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce slot du groupe"});
    }
}

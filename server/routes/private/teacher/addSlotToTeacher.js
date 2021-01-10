const teacherController = require('../../../controllers/teacherController');


module.exports = async (req, res, next) => {
    try {
        const id = req.query.idTeacher;
        const idSlot = req.body.slot;
        const teacher = await teacherController.addSlotToTeacher(id,idSlot);
        if (!teacher){
            return res.status(400).json({error: "Impossible d'ajouter le slot à l'enseignant"});
        }else {
            return res.status(200).json(teacher);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des enseignants"});
    }
}

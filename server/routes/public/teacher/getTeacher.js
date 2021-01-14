const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const teacher = await teacherController.getTeacher()
        if(!teacher){
            return res.status(400).json({error: "Aucun enseignant"});
        }else {
            return res.status(200).json(teacher);
        }
    }catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: "Impossible de récupérer les enseignants"
        });
    }
}
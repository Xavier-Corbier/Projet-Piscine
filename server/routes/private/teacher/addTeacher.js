const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const teacherObject = req.body;
        const teacher = await teacherController.addTeacher(teacherObject);
        if(!teacher ){
            return res.status(400).json({error: "Création échouée"});
        }else {
            return res.status(200).json(teacher);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.name});
    }
}

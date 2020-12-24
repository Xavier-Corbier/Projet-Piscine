const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const students = await studentController.getAllStudents();
        if (!students){
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(students);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves"});
    }
}

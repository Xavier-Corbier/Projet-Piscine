const teacherController = require('../../../controllers/teacherController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idTeacher;
        const teacher = await teacherController.deleteTeacher(id);

        if(!teacher){
            return res.status(400).json({error: "Suppression impossible"});
        }else {
            return res.status(200).json({message : "Suppression réussie"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer cet enseignant"});
    }
}


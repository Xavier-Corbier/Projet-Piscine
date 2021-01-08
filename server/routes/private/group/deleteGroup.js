const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        /*
        const studentList = req.query.studentList;

        while(studentList.length > 0 ){
            await studentController.deleteGroupOfStudent(req.query.id,group.id);
              await groupController.deleteStudentToGroup(group.id,req.query.id);

        } */
        const group = await groupController.deleteGroup(id);
        console.log(group);
        if(!group){
            return res.status(400).json({error: "Suppression impossible"});
        }else {

            return res.status(200).json({message : "Suppression réussie"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce groupe"});
    }
}


const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
const userFunctions = require('../../../utils/userFunctions');

module.exports = async (req, res, next) => {
    try {
        const idGroup = req.query.idGroup; //recuperation de l'id du groupe à supprimer
        const group = await groupController.getGroupById(idGroup) //récupération du group que l'on va supprimer
        if(!group){
            return res.status(400).json({error: "Aucun groupe à supprimer"})
        }
        await studentController.deleteGroupToManyStudent(idGroup);
        const groupDelete = await groupController.deleteGroup(idGroup);
        if(!groupDelete){
            return res.status(400).json({error: "Suppression impossible"});
        }else {
            return res.status(200).json({message : "Suppression réussie"});
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce groupe"});
    }
}


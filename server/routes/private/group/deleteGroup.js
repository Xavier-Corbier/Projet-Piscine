const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const body = await groupController.getGroupById(id)
        const group = await groupController.deleteGroup(id, body);
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


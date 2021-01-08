const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const groupObject = req.body;
        const group = await groupController.updateGroup(id,groupObject);
        if (!group){
            return res.status(400).json({error: "Aucun Groupe"});
        }else {
            return res.status(200).json(group);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'accéder à ce groupe, mise à jour du groupe impossible"});
    }
}

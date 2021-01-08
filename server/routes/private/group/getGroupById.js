const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try{
        const id = req.query.idGroup;
        const group = await groupController.getGroupById(id);
        if (!group){
            return res.status(400).json({error: "Aucun groupe"});
        }else {
            return res.status(200).json(group);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des groupes"});
    }
}
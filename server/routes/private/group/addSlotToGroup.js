const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const idSlot = req.body.idSlot;
        const group = await groupController.addSlotToGroup(id,idSlot);
        console.log(id)
        console.log(idSlot)
        console.log(group)
        if (!group){
            return res.status(400).json({error: "Aucun Groupe"});
        }else {
            return res.status(200).json(group);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible d'ajouter ce slot au groupe"});
    }
}

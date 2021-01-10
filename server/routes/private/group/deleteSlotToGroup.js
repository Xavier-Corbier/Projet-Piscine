const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        const id = req.query.idGroup;
        const idSlot = req.body.idSlot;
        const group = await groupController.deleteSlotOfGroup(id,idSlot);
        if (!group){
            return res.status(400).json({error: "Suppression impossible du slot"});
        }else {
            return res.status(200).json(group);
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: "Impossible de supprimer ce slot de du groupe"});
    }
}

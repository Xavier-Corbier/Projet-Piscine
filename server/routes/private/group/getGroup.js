const groupController = require('../../../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        const group = await groupController.getGroup()
        if(!group){
            return res.status(400).json({error: "Aucun groupe"});
        }else {
            return res.status(200).json(group);
        }
    }catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: "Impossible de récupérer les groupes"
        });
    }
}
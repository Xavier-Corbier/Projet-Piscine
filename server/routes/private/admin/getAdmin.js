const adminController = require('../../../controllers/adminController');

module.exports = async (req, res, next) => {
    try {
        const admin = await adminController.getAdmin()
        if(!admin){
            return res.status(400).json({error: "Aucun admin"});
        }else {
            return res.status(200).json(admin);
        }
    }catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: "Impossible de récupérer les informations de l'admin"
        });
    }
}

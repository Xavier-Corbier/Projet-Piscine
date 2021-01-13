const adminController = require('../../../controllers/adminController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const idAdmin = req.query.id;
        const email = req.body.email;
        if (!email){
            return res.status(400).json({error: "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim()
        if (!validationUtils.isAdminEmail(correctEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }
        //on effectue la modification
        const admin = await adminController.updateAdmin(idAdmin, correctEmail)
        if (!admin){ //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun admin"});
        }else {
            return res.status(200).json(admin);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier l'admin"});
    }
}

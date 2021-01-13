require('dotenv').config();
const studentController = require('../controllers/studentController');
const groupController = require('../controllers/groupController');

module.exports = async (req, res, next) => {
    try {
        //j'appelle ce middleware après le middleware d'auth donc je sais que :
        //          - req.query.id est présent et correspond bien à l'id du token
        //          - l'étudiant existe forcément
        //on verifie si l'etudiant fait bien partie du group à modifier
        const idStudent = req.query.id;
        const idGroup = req.query.idGroup;

        //on vérifie que l'id du groupe est bien renseigné
        if(!idGroup){
            res.status(403).json({ error : "Groupe manquant pour accéder à cette page"});
            return false
        }

        //on vérifie que l'id du group correspond à un groupe de notre bdd
        const group = await groupController.getGroupById(idGroup);
        if(!group){
            res.status(403).json({ error : "Groupe invalide pour accéder à cette page"});
            return false
        }

        //on vérifie que l'étudiant fait bien partie du groupe auquel il veux accéder/modifier
        const student = await studentController.getStudentById(idStudent);
        if(student.group && student.group.toString() === idGroup.toString()){
            next();
            return true

        }else{
            res.status(403).json({ error : "Impossible d'accéder à cette page protégée"});
            return false
        }

    }catch(e) {
        console.log(e);
        return res.status(401).json({message: "Unauthorized"});
    }
}

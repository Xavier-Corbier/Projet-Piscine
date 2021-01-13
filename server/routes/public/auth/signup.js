require('dotenv').config();
const studentController = require('../../../controllers/studentController');
const jwt = require('jsonwebtoken');
const token = require('../../../encryption/token');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
    try {
        const { studentNumber, promo, email, password } = req.body;
        //on vérifie si tout les champs ont bien été remplis
        if (!studentNumber){
            return res.status(400).json({error : "Aucun numéro étudiant saisi"});
        }else if (!promo){
            return res.status(400).json({error : "Aucune promo saisie"});
        }else if (!email){
            return res.status(400).json({error : "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim();
        //verification du format de l'email
        if (!validationUtils.isUserEmail(correctEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }
        //on vérifie si l'email est déjà utilisé
        const studentExistEmail = await studentController.getStudentByEmail(correctEmail);
        if (studentExistEmail){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        //on vérifie si le numéro étudiant est déjà utilisé
        const studentExistNumber = await studentController.getStudentByNumber(studentNumber);
        if (studentExistNumber){
            return res.status(400).json({error : "Ce numéro étudiant est déjà utilisé"});
        }
        //on vérifie si la promo est une promo valide
        const correctPromo = promo.toUpperCase().trim();
        if (!validationUtils.isPromo(correctPromo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        else {
            //si toute les conditions sont vérifiés
            //creation de l'étudiant dans la base de donnée
            const student = await studentController.addStudent(studentNumber, correctPromo, correctEmail, password);
            //si la création à réussi : creation du token
            const userToken = await token.createUserToken(student, false);
            return  res.status(200).json(userToken);
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error : "Impossible de créer l'utilisateur"
        });
    }
};


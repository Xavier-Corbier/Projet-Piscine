require('dotenv').config();
const studentController = require('../../../controllers/studentController');
const regEmail = /^[a-z\-]{3,20}\.[a-z]{3,20}[0-9]{0,3}(@etu.umontpellier.fr)$/
//const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const token = require('../../../encryption/token');

module.exports = async (req, res, next) => {
    try {
        const { studentNumber, promo, email, password } = req.body;
        //on vérifie si tout les champs ont bien été remplis
        if (!studentNumber){
            return res.status(400).json({error : "Aucun numéro étudaint saisi"});
        }else if (!promo){
            return res.status(400).json({error : "Aucune promo saisie"});
        }else if (!email){
            return res.status(400).json({error : "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim();
        //verification du format de l'email
        if (!correctEmail.match(regEmail)) {
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
        if (!studentController.isPromo(promo)){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        else {
            //si toute les conditions sont vérifiés
            //creation de l'étudiant dans la base de donnée
            const student = await studentController.addStudent(studentNumber, promo, correctEmail, password);
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


require('dotenv').config();
const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');
const adminController = require('../../../controllers/adminController');
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');

const verifyEmailEtu = (email) => {
    const domain = email.split('@')[1];
    console.log(domain);
    return (domain.toString() === 'etu.umontpellier.fr');
}

module.exports = async (req, res, next) => {
    try {
        const { studentNumber, firstname, lastname, promo, email, password } = req.body;
        if (!studentNumber){
            return res.status(400).json({error : "Aucun numéro étudaint saisi"});
        }else if (!firstname){
            return res.status(400).json({error : "Aucun prénom saisi"});
        }else if (!lastname){
            return res.status(400).json({error : "Aucun nom saisi"});
        }else if (!promo){
            return res.status(400).json({error : "Aucune promo saisie"});
        }else if (!email){
            return res.status(400).json({error : "Aucun email saisi"});
        }else if (!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        }else if (!verifyEmailEtu(email)){
            return res.status(400).json({error : "L'adresse ne correspond pas à une adresse étudiante"});
        }
        const studentExistEmail = await studentController.getStudentByEmail(email.toLowerCase());
        if (studentExistEmail){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        const studentExistNumber = await studentController.getStudentByNumber(studentNumber);
        console.log(studentExistNumber);
        if (studentExistNumber){
            return res.status(400).json({error : "Ce numéro étudiant est déjà utilisé"});
        }
        const studentPromo = await promoController.getPromoByName(promo);
        if (!studentPromo){
            return res.status(400).json({error : "La promo saisie n'existe pas"})
        }
        else {
            //creation of student in database
            const student = await studentController.addStudent(studentNumber, firstname, lastname, promo, email.toLowerCase(), password);
            //Add student to studentList in his promo
            const promoObject = await promoController.addStudentToPromo(studentPromo.id, student.id);
            //if success token creation of 1day
            const tokenUser = {
                id: student._id,
                email: student.email,
                firstname: student.firstname
            };
            console.log('mon token user' , tokenUser);
            console.log(process.env.tokenkey)
            const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
            console.log('mon token' , token);
            return  res.status(200).json({
                success: true,
                message: 'Connected !',
                token: token,
                firstName: student.firstname,
                userId: student._id,
                isAdmin: false,
            });
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error : "Impossible de créer l'utilisateur"
        });
    }
};


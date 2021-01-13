require('dotenv').config();
const jwt = require('jsonwebtoken');
const studentController = require('../../../controllers/studentController');
const adminController = require('../../../controllers/adminController');
const token = require('../../../encryption/token');
const validationUtils = require('../../../utils/validationUtils');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucun email saisi"});
        } else if (!password) {
            return res.status(400).json({error: "Aucun mot de passe saisi"});
        }
        //vérification de la conformité de l'email
        const correctEmail = email.toLowerCase().trim();
        if (!validationUtils.isUserEmail(correctEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        } else {
            //on regarde si l'email correspond à un de nos étudiants inscrit
            const studentExist = await studentController.studentExist(correctEmail);
            if (!studentExist) { //aucun étudiant n'est trouvé, on regarde s'il s'agit de l'administrateur qui souhaite se connecter
                const adminExist = await adminController.adminExist(correctEmail);
                if (!adminExist) { //l'email n'est pas dans notre base de données
                    return res.status(400).json({error: "Cet email n'est pas dans notre base de données, essayez de vous inscrire."});
                }
                //l'email correspond à l'admin : on vérifie si le mot de passe est correcte
                const admin = await adminController.getAdminByEmail(correctEmail);
                const match = await bcrypt.compare(password, admin.password.toString());
                if (match) {
                    //Les informations sont correctes : on créer le token
                    const adminToken = await token.createUserToken(admin, true);
                    console.log({adminToken});
                    return res.status(200).json(adminToken);
                }else { //le mot de passe est faux
                    return res.status(401).json({error: 'Mot de passe incorrect'});
                }
            }
            //l'email correspond à un étudiant : vérification du mot de passe
            const student = await studentController.getStudentByEmail((correctEmail));
            const match = await bcrypt.compare(password, student.password.toString());
            if (match) {
                //Les informations sont correctes : on créer le token
                const studentToken = await token.createUserToken(student, false);
                return res.status(200).json(studentToken);
            } else { //le mot de passe est faux
                console.log('Mot de passe incorrect');
                return res.status(401).json({error: 'mot de passe incorrect'});
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: "Internal error.",
            message: error.message
        });
    }
};

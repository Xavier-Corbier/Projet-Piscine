require('dotenv').config();
const regEmail = /^[a-z-]{3,20}\.[a-z]{3,20}[0-9]{0,3}@(etu.)?(umontpellier.fr)$/
//const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const studentController = require('../../../controllers/studentController');
const adminController = require('../../../controllers/adminController');
const bcrypt = require('bcrypt');

const userToken = async (user, isAdmin) => {
    try {
        //if password compare is true, we return token
        const tokenUser = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            isAdmin: isAdmin,
        };
        const token = jwt.sign(tokenUser, process.env.tokenkey, {expiresIn: '200000h'});
        const myReturn = {
            success: true,
            message: 'Connected !',
            token: token,
            firstName: user.firstname,
            userId: user._id,
            isAdmin: isAdmin
        };
        console.log({myReturn})
        return myReturn;
    }catch (error) {
        console.log(error);
    }
};

module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucun email saisi"});
        } else if (!password) {
            return res.status(400).json({error: "Aucun mot de passe saisi"});
        } else if (!email.toLowerCase().match(regEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        } else {
            const student = await studentController.getStudentByEmail(email.toLowerCase());
            if (!student) {
                const admin = await adminController.getAdminByEmail(email.toLowerCase());
                if (!admin) {
                    return res.status(401).json({error: "Cet email n'est pas dans notre base de données, essayez de vous inscrire."});
                }
                //if is admin
                const match = await bcrypt.compare(password, admin.password.toString());
                if (match) {
                    const adminToken = await userToken(admin, true);
                    console.log({adminToken});
                    return res.status(200).json(adminToken);
                }else {
                    return res.status(401).json({error: 'Mot de passe incorrect'});
                }
            }
            //if is student
            const match = await bcrypt.compare(password, student.password.toString());
            if (match) {
                const studentToken = await userToken(student, false);
                return res.status(200).json(studentToken);
            } else {
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

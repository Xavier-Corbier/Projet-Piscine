require('dotenv').config();
const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const jwt = require('jsonwebtoken');
const studentController = require('../../../controllers/studentController');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email) {
            //if data is empty we return 400 status
            return res.status(400).json({error : "Aucun email saisi"});
        }else if(!password){
            return res.status(400).json({error : "Aucun mot de passe saisi"});
        }else if(!email.toLowerCase().match(regEmail)){
            return res.status(400).json({error : "Format de l'email incorrect"});
        } else {
            const student = await studentController.getStudentByEmail(email.toLowerCase());
            if (!student){
                return res.status(401).json({error : "Cet email n'est pas dans notre base de données, essayez de vous inscrire."});
                //traiter le cas de l'admin
            }
            //comparing encrypted password of user
            const match = await bcrypt.compare(password,student.password.toString());
            if(match){
                //if password compare is true, we return token
                const tokenStudent = {
                    id: student._id,
                    email: student.email,
                    firstName: student.firstName
                };
                const token = jwt.sign(tokenStudent, process.env.tokenkey, {expiresIn: '200000h'});
                //return satuts OK with token
                return  res.status(200).json({
                    success: true,
                    message: 'Connected !',
                    token: token,
                    firstName: student.firstName,
                    userId: student._id,
                    //isAdmin : fonction bool
                });
            }
            else{
                console.log('mot de passe incorrect');
                return  res.status(401).json({
                    error: 'mot de passe incorrect'
                });
            }
        }
    } catch(error) {
        console.log(error.message);
        return  res.status(500).json({
            error: "Internal error.",
            message : error.message
        });
    }
};

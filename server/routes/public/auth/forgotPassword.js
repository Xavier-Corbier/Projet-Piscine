const sgMail = require('@sendgrid/mail');
const randStr = require('randomstring');
const studentController = require('../../../controllers/studentController');

module.exports = forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const student = await studentController.getStudentByEmail(email);
        if(!student){
            res.status(400).json({error: "Aucun étudiant ne correspond à cette adresse"});
        }
        else {
            const randomPassword = randStr.generate(8);
            await studentController.updatePassword(email, randomPassword);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email.toString(),
                from: 'monAplli@gmail.com',
                subject: 'Mot de passe oublié',
                text: 'Votre nouveau mot de passe' + randomPassword,
            };
            await sgMail.send(msg);
            console.log("envoi réussi");
            return res.status(201).json({message: "Envoie réussi"});
        }
    }catch (e){
        res.status(500).json({error: "Impossible d'envoyer un nouveau mot de passe"})
        console.log(e.message);
    }
}

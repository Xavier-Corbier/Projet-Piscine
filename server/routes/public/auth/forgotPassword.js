const sgMail = require('@sendgrid/mail');
const randStr = require('randomstring');
const studentController = require('../../../controllers/studentController');
const regEmail = /^[a-z\-]{3,20}\.[a-z]{3,20}[0-9]{0,3}(@etu.umontpellier.fr)$/

module.exports = forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email; //récupération de l'email de l'utilsateur
        //vérification de la conformité de l'email
        const correctEmail = email.toLowerCase().trim();
        if (!correctEmail.match(regEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }
        const student = await studentController.getStudentByEmail(correctEmail);
        if(!student){
            res.status(400).json({error: "Aucun étudiant ne correspond à cette adresse"});
        }
        else {
            const randomPassword = randStr.generate(8);
            await studentController.updatePassword(correctEmail, randomPassword);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            console.log(process.env.SENDGRID_API_KEY)
            const msg = {
                to: email.toString(),
                from: 'margot.georget@etu.umontpellier.fr',
                subject: 'Mot de passe oublié',
                text: 'Votre nouveau mot de passe ' + randomPassword + 'Pour changer votre mot de passe aller dans votre compte -> Changez mot de passe ',
            };
            await sgMail.send(msg);
            console.log("envoi réussi");
            return res.status(201).json({message: "Envoie réussi"});
        }
    }catch (e){
        res.status(500).json({error: e})
        console.log(e);
    }
}

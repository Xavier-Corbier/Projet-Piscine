const sgMail = require('@sendgrid/mail');
const randStr = require('randomstring');
const studentController = require('../../../controllers/studentController');
const adminController = require('../../../controllers/adminController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email; //récupération de l'email de l'utilsateur
        //vérification de la conformité de l'email
        if(!email){
            return res.status(400).json({error: "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim();
        if (!validationUtils.isUserEmail(correctEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }
        //on regarde si l'email existe dans notre base de donnée
        const studentExist = await studentController.studentExist(correctEmail);
        if(!studentExist){ //aucun étudiant trouvé : on vérifie s'il s'agit de l'admin
            const adminExist = await adminController.adminExist(correctEmail);
            if (!adminExist) { //aucun utilisateur trouvé
                res.status(400).json({error: "Aucun utilisateur ne correspond à cette adresse"});
            }
            //il s'agit de l'admin
            const randomPassword = randStr.generate(8); //génération d'un mot de passe aléatoire
            await adminController.updatePassword(correctEmail, randomPassword); //modification du mot de passe de l'admin
        }
        else { //un étudiant à été trouvé
            const randomPassword = randStr.generate(8); //génération d'un mot de passe aléatoire
            await studentController.updatePassword(correctEmail, randomPassword); //modification du mot de passe de l'étudiant
            //envoie du nouveau mot de passe par mail
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: correctEmail,
                from: 'projetpiscineig@gmail.com',
                subject: 'Mot de passe oublié',
                text: 'Vous avez fait une demande de nouveau mot de passe. Voici votre nouveau mot de passe : ' + randomPassword +
                    '.\nPensez à changez ce mot de passe par un mot de passe que vous aurez choisi. ' +
                    ' Pour changer votre mot de passe aller dans : Mon compte -> Changez le mot de passe.',
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

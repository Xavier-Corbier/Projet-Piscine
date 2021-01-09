const studentController = require('../../../controllers/studentController');
const regEmail = /^[a-z\-]{3,20}\.[a-z]{3,20}[0-9]{0,3}(@etu.umontpellier.fr)$/

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id;
        const email = req.body.email;
        if (!email){
            return res.status(400).json({error: "Aucun email saisi"});
        }
        const correctEmail = email.toLowerCase().trim()
        if (!correctEmail.match(regEmail)) {
            return res.status(400).json({error: "Format de l'email incorrect"});
        }
        const studentExistEmail = await studentController.getStudentByEmail(correctEmail);
        if (studentExistEmail){
            return res.status(400).json({error : "Cet email est déjà utilisé"});
        }
        const student = await studentController.updateEmailToStudent(idStudent, correctEmail)
        if (!student){ //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de modifier l'étudiant"});
    }
}

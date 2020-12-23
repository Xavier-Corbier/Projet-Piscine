const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.params.id;
        const student = await studentController.getStudentById(idStudent);
        const studentPromo = await promoController.getPromoByName(student.promo);
        const promo = await promoController.deleteStudentToPromo(studentPromo.id, student.id);
        await studentController.deleteStudent(idStudent);
        if(!student || !promo){
            return res.status(400).json({error: "Suppression échouée"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible de supprimer cet élève"});
    }
}

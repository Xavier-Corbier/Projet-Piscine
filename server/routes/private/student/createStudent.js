const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');

module.exports = async (req, res, next) => {
    try {
        const studentObject = req.body;
        const student = await studentController.addStudent(studentObject);
        const studentPromo = await promoController.getPromoByName(student.promo);
        const promo = await promoController.addStudentToPromo(studentPromo.id, student.id);
        if(!student || !promo){
            return res.status(400).json({error: "Création échoué"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: e.name});
    }
}

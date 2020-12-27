const studentController = require('../../../controllers/studentController');
const promoController = require('../../../controllers/promoController');

module.exports = async (req, res, next) => {
    try{
        const idPromo = req.query.id;
        const promo = await promoController.getPromoById(idPromo);
        const studentIdList = promo.studentList;
        let i = 0;
        var studentList = [];
        while (i<studentIdList.length) {
            const student = await studentController.getStudentById(studentIdList[i]);
            studentList.push(student);
            i+=1;
        }
        if(!studentList){
            return res.status(400).json({error: "Aucun élève"});
        }else {
            return res.status(200).json(studentList);
        }
    }catch (e) {
        console.log(e.message);
        return res.status(500).json({error: "Impossible de retourner cette liste"});
    }
}

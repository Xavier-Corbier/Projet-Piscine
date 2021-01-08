const studentController = require('../../../controllers/studentController');

const editableKeys = ["email","promo"] //attributs modifiables

const isPresent = (keys) => {
    //vérifie si au moins un des éléments de keys(liste) est présent dans editableKeys
    var isPresent = false;
    var i = 0;
    while (i<keys.length && !isPresent) {
        if (editableKeys.indexOf(keys[i])>-1){
            isPresent=true;
        }
        i+=1
    }
    return isPresent
}
const invalidKey = (keys) => {
    //vérifie si un des éléments de keys n'est pas présent dans editableKeys
    var invalidKey = false;
    var i = 0;
    while (i<keys.length && !invalidKey) {
        if (editableKeys.indexOf(keys[i])===-1){
            invalidKey=true;
        }
        i+=1
    }
    return invalidKey
}

module.exports = async (req, res, next) => {
    try {
        const idStudent = req.query.id;
        const studentObject = req.body;
        const keys = Object.keys(studentObject);
        if (invalidKey(keys)){ //on vérifie si un élément renseigné n'est pas modifiable
            return res.status(400).json({error: "Un attribut renseigné n'est pas modifiable"});
        }
        if (!isPresent(keys)) { //on vérifie si au moins un des éléments modifiables est présent
            return res.status(400).json({error: "Aucun attibut à modifier"});
        }
        //on effectue la modification
        const student = await studentController.updateStudent(idStudent, studentObject);
        if (!student){ //si aucun étudiant n'est retourner : aucun étudiant n'a été trouvé par l'id
            return res.status(400).json({error: "Aucun étudiant"});
        }else {
            return res.status(200).json(student);
        }
    }catch(e){
        console.log(e.message);
        return res.status(500).json({error: "Impossible d'accéder à la liste des élèves"});
    }
}

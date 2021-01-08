const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');

module.exports = async (req, res, next) => {
    try {
        const groupObject = req.body;
        const group = await groupController.createGroup(groupObject);

        if(!group ){ //si le groupe est nul (groupObject nul ou ne correspond pas au format)
            return res.status(400).json({error: "Création échouée, le groupe n'a pas été créé"});
        }else {
            const test1 =await groupController.addStudentToGroup(group.id, req.query.id);  // On ajoute l'étudiant dans la liste d'étudiant du groupe
            const test2 = await studentController.addGroupToStudent(req.query.id,group.id); // On ajoute le groupe à l'étudiant associé (qui fait la demande de création du groupe)
            if (!test1){ // on regarde si l'étudiant à été ajouté au groupe
                return res.status(400).json({error: "Création réussie, mais attention l'étudiant n'a pas été affecté à son groupe"});
            }else if(!test2){ // on regarde si on a ajouté le groupe à l'étudiant
                return res.status(400).json({error: "Création réussie, mais attention le groupe n'a pas été affecté à l'étudiant"});
            }
            else { // cas où tout est bon
                return res.status(200).json(group);
            }

        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({error: error.name});
    }
}

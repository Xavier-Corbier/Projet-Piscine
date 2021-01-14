const groupController = require('../../../controllers/groupController');
const studentController = require('../../../controllers/studentController');
const teacherController = require('../../../controllers/teacherController');

/*
Les middlewares auth et deadlineMiddleware ont été passés, on sait que :
    - l'étudiant dont l'id se trouve dans la query existe
    - la deadline de l'evenement n'est pas dépassée
 */

/**
 * Créer un groupe avec un nom et un teacher référent au minimum
 * Il est possible d'avoir comme autres propriétés : le nom de l'entreprise et/ou le nom et le prenom du tuteur de
 * l'entreprise
 * A la création du groupe l'étudiant à l'origine de la création est directement ajouté dans le groupe, et son attribut
 * groupe est créé. La promo du group est défini en fonction de la promo de l'étudiant qui le créer
 * Préconditions:
 *  - l'étudiant créateur ne doit pas avoir déjà de groupe renseigné
 *  - un teacher référent doit être renseigné et doit correspondre à un enseignant de notre bdd
 * Erreur possible : utilisation d'un nom déjà pris
 * @param req
    * query : l'id du student authentifié
    * body : doit contenir un groupObject (au minimum nom et teacher référent)
 * @param res
 * @param next
 * @returns {Promise<*|CancelableRequest<any>>}
 */
module.exports = async (req, res, next) => {
    try {
        const groupObject = req.body; //récupération des informations du group à créer
        const idTeacher = groupObject.teacher; //attribut required donc forcément présent sinon ValidationError
        const idStudent = req.query.id;

        //on vérifie si l'étudiant n'a pas déjà un groupe
        const student = await studentController.getStudentById(idStudent);
        if(student.group){
            return res.status(400).json({error: "Vous etes déjà affecté à un groupe : vous ne pouvez pas créer de groupe"});
        }

        //on vérifie si le teacher renseigné existe bien
        const teacher = await teacherController.getTeacherById(idTeacher);
        if(!teacher){
            return res.status(400).json({error: "Aucun enseignant trouvé"});
        }

        //on créer le group
        const promo = student.promo;
        const group = await groupController.createGroup(groupObject, promo);
        if(!group ){ //si le groupe est nul (groupObject nul ou ne correspond pas au format)
            return res.status(400).json({error: "Création échouée, le groupe n'a pas été créé"});
        }else {
            const test1 = await groupController.addStudentToGroup(group.id, req.query.id);  // On ajoute l'étudiant dans la liste d'étudiant du groupe
            const test2 = await studentController.addGroupToStudent(req.query.id,group.id); // On ajoute le groupe à l'étudiant associé (qui fait la demande de création du groupe)*
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
        return res.status(500).json({error: error.message});
    }
}

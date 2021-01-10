const Teacher = require('../models/Teacher');
// CRUD

/**
 * Ajoute un enseignant dans la BDD
 * @param teacherObject : l'objet JSON représentant l'enseignant
 * @returns {Promise<Document>}
 */
const addTeacher = async (teacherObject) => {
    try {
        const teacher = new Teacher({
            ...teacherObject,
        });
        return await teacher.save();
    }catch (error){
        console.log(error);
        throw error;
    }
};

/**
 * Récupère tout les enseignants de la BDD
 * @returns {Promise<*>}
 */
const getTeacher = async() => { // Renvoie la liste de tout les enseignants
    try {
        return await Teacher.find();
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

/**
 * Modifie un enseignant avec l'id de celui-ci
 * @param id : id de l'enseignant à modifier
 * @param teacherObject : l'objet JSON avec lequel on va modifier cet enseignant
 * @returns {Promise<*>}
 */
const updateTeacher = async(id,teacherObject) => {
    try {
        return await Teacher.findOneAndUpdate({_id: id}, {...teacherObject, _id: id}, {new:true}) // Modifie un enseignant (tout ses attributs), on modifie cet enseignant de part son id (_id)
    }catch (error) {
    console.log(error.message);
    throw error;
    }
};

/**
 * Supprime un enseignant entièrement avec son id
 * @param id : id de l'enseignant à supprimer
 * @returns {Promise<*>}
 */
const deleteTeacher = async(id) => {
    try {
        return await Teacher.findByIdAndDelete({_id: id});  // Supprime un enseignant(tout ses attributs), on le supprime de part son id(_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

/**
 * Récupère un enseigant de la BDD
 * @param id: id de l'enseignant à récupérer
 * @returns {Promise<*>}
 */
const getTeacherId = async (id) => {
    try {
        return await Teacher.findOne({_id: id});
    }catch (e) {
        console.log(e.message);
    }
};

/**
 * Ajoute un créneau à la liste des créneaux de l'enseignant
 * @param id : id de l'enseignant à modifier
 * @param idSlot : id du créneau à ajouter
 * @returns {Promise<*>}
 */
const addSlotToTeacher = async(id, idSlot) => {
    try{
        return await Teacher.findByIdAndUpdate({_id: id}, {$push: {slotList: idSlot}}, {new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

/**
 * Supprime un créneau d'un enseignant
 * @param id : id du groupe à modifier
 * @param idSlot: id du créneau à supprimer
 * @returns {Promise<*>}
 */
const deleteSlotOfTeacher = async (id, idSlot) => {
    try {
        return await Teacher.findOneAndUpdate({_id: id}, {$pull: {slotList: idSlot}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/*
Exportation de toutes les fonctions
 */
module.exports = {
    addTeacher, //ok
    getTeacher, //ok
    updateTeacher, //ok
    deleteTeacher, // ok
    getTeacherId,// ok
    addSlotToTeacher, // ok
    deleteSlotOfTeacher, //ok
};
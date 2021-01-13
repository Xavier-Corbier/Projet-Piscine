const Group = require('../models/Group');
const Student = require('../models/Student');
const Slot = require('../models/Student');

// CRUD

/**
 * Ajoute/Crée un nouveau groupe à la BDD,
 * @param groupObject : l'objet JSON représentant le groupe
 * @returns {Promise<Document>}
 */
const createGroup = async (groupObject) => { //Crée un groupe avec au minimum un nom de groupe, une liste d'étudiant et un enseignant.
    try {
        const group = new Group({
            ...groupObject,
            studentList: [],
        });

        return await group.save();
    }catch (error){
        console.log(error);
        throw error;
    }
};

/**
 * Récupère tout les groupes de la BDD
 * @returns {Promise<any>}
 */
const getGroup = async() => { // Renvoie la liste de tout les groupes
    try {
        return await Group.find();
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};
/**
 * Modifie un groupe à partir de l'id de celui-ci
 * @param id : l'id du groupe à modifier
 * @param groupObject : l'objet JSON avec lequel on va modifier ce groupe
 * @returns {Promise<any>}
 */
const updateGroup = async (id,groupObject) => {
    try {
        return await Group.findOneAndUpdate( { _id: id}, {_id: id, ...groupObject}, {new:true}); // Modifie un groupe, on modifie ce groupe de part son id (_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * Supprime le groupe entièrement
 * @param id : ObjectId : id du groupe à supprimer
 * @returns {Promise<any>}
 */
const deleteGroup = async (id) => {
    try {
        return await Group.findByIdAndDelete({_id: id});  // Supprime un groupe, on le supprime de part son id(_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}
/**
 * Récupère un groupe dans la base de donnée
 * @param idGroup : id du groupe à récuperer
 * @returns {Promise<any>}
 */
const getGroupById = async(idGroup) => {
    try {
        return await Group.findOne({_id: idGroup});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/*
const getGroupByStudent = async (studentList) => {
    try {
        return await Group.findOne({studentList: studentList});
    }catch (e) {
        console.log(e.messagenodem);
    }
}
*/

/**
 * Ajoute un créneau au groupe
 * @param id : id du groupe auquel on doit ajouter le créneau
 * @param idSlot : id du créneau que l'on doit ajouter
 * @returns {Promise<*>}
 */
const addSlotToGroup = async (id, idSlot) => {
    try {
        return await Group.findByIdAndUpdate({_id: id}, {slot: idSlot, _id: idGroup},{new: true});
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Ajoute un étudiant au groupe
 * @param id : id du groupe auquel on doit ajouter un étudiant
 * @param idStudent : id de l'étudiant à ajouter au groupe
 * @param body : objet JSON avec lequel on va eviter d'ajouter des doublons
 * @returns {Promise<any>}
 */
const addStudentToGroup = async (id, idStudent) => {
    try {
        return await Group.findByIdAndUpdate({_id: id}, {$push: {studentList: idStudent}},{new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * Ajoute le premier étudiant au groupe (lors de la création
 * @param id : id du groupe auquel on doit ajouter l'étudiant
 * @param idStudent : id de l'étudiant à ajouter au groupe
 * @returns {Promise<any>}
 */
const addFirstStudentToGroup = async (id, idStudent) => {
    try {
        return await Group.findByIdAndUpdate({_id: id}, {$push: {studentList: idStudent}},{new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * Supprime le Créneau du groupe
 * @param id : id du groupe à modifier
 * @param idSlot : id du créneau à enlever
 * @returns {Promise<any>}
 */
const deleteSlotOfGroup = async (id, idSlot) => {
    try {
        return await Group.findOneAndUpdate({_id: id}, {$unset: {slot: idSlot}},{new: true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * Supprime un étudiant du groupe
 * @param id : id du groupe à modifier
 * @param idStudent : id de l'étudiant à modifier
 * @returns {Promise<*>}
 */
const deleteStudentOfGroup = async (id, idStudent) => {
    try {
        return await Group.findOneAndUpdate({_id: id}, {$pull: {studentList: idStudent}},{new: true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

/*
Exportation de toutes les fonctions
 */
module.exports = {
    createGroup, //ok
    getGroup, //ok
    updateGroup, //ok
    deleteGroup, // ok
    getGroupById, //ok
    addSlotToGroup, //ok
    addStudentToGroup, //ok
    addFirstStudentToGroup, //ok
    deleteSlotOfGroup, //ok
    deleteStudentOfGroup, // ok
}

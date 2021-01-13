const Group = require('../models/Group');

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
 * Récupère un groupe dans la base de donnée selon l'id
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

/**
 * Ajoute un créneau au groupe
 * @param idGroup : id du groupe auquel on doit ajouter le créneau
 * @param idSlot : id du créneau que l'on doit ajouter
 * @returns {Promise<*>}
 */
const addSlotToGroup = async (idGroup, idSlot) => {
    try {
        return await Group.findByIdAndUpdate({_id: idGroup}, {slot: idSlot, _id: idGroup},{new: true});
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Ajoute un étudiant au groupe
 * @param id : id du groupe auquel on doit ajouter un étudiant
 * @param idStudent : id de l'étudiant à ajouter au groupe
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

/**
 *
 * @param idSlot
 * @returns {Promise<any>}
 */
const deleteGroupFromManyStudent = async (idSlot) => {
    try{
        return await Group.updateMany({slot: idSlot}, {$unset: {slot: idSlot}}, {new: true});
    }catch (e) {
        console.log(e.message);
    }
};

/*
Exportation de toutes les fonctions
 */
module.exports = {
    createGroup,
    getGroup,
    deleteGroup,
    getGroupById,
    addSlotToGroup,
    addStudentToGroup,
    addFirstStudentToGroup,
    deleteSlotOfGroup,
    deleteStudentOfGroup,
    deleteGroupFromManyStudent
}

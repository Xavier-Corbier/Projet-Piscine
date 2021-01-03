const Group = require('../models/Group');
// CRUD

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


const getGroup = async() => { // Renvoie la liste de tout les groupes
    try {
        return await Group.find();
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

const updateGroup = async (id,groupObject) => {
    try {
        return await Group.findOneAndUpdate( { _id: id}, {_id: id, ...groupObject}, {new:true}); // Modifie un groupe (tout ses attributs), on modifie cet groupe de part son id (_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

const deleteGroup = async (id) => {
    try {
        return await Group.findByIdAndDelete({_id: id});  // Supprime un groupe(tout ses attributs), on le supprime de part son id(_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}
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


const addSlotToGroup = async(id, idSlot) => {
    try{
        return await Group.findByIdAndUpdate({_id: id}, {$push: {slot: idSlot}}, {new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

const addStudentToGroup = async (id, idStudent) => {
    try {
        return await Group.findByIdAndUpdate({_id: id}, {$push: {studentList: idStudent}},{new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}


const deleteSlotOfGroup = async (id, idSlot) => {
    try {
        return await Group.findOneAndUpdate({_id: id}, {$pull: {slot: idSlot}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

const deleteStudentOfGroup = async (id, idStudent) => {
    try {
        return await Group.findOneAndUpdate({_id: id}, {$pull: {studentList: idStudent}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = {
    createGroup, //ok
    getGroup, //ok
    updateGroup, //ok
    deleteGroup, // ok?
    getGroupById, //ok
    addSlotToGroup,
    addStudentToGroup, //ok?
    deleteSlotOfGroup,
    deleteStudentOfGroup, // ok?
}
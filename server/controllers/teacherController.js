const Teacher = require('../models/Teacher');
// CRUD

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

// addSlotToTeacher

const getTeacher = async() => { // Renvoie la liste de tout les enseignants
    try {
        return await Teacher.find();
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

const updateTeacher = async(id,teacherObject) => {
    try {
        return await Teacher.findOneAndUpdate({_id: id}, {...teacherObject, _id: id}, {new:true}) // Modifie un enseignant (tout ses attributs), on modifie cet enseignant de part son id (_id)
    }catch (error) {
    console.log(error.message);
    throw error;
    }
};

const deleteTeacher = async(id) => {
    try {
        return await Teacher.findByIdAndDelete({_id: id});  // Supprime un enseignant(tout ses attributs), on le supprime de part son id(_id)
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};




const getTeacherByLastName = async (lastName) => {
    try {
        return await Teacher.findOne({lastName: lastName});
    }catch (e) {
        console.log(e.message);
    }
};


const addSlotToTeacher = async(id, idSlot) => {
    try{
        return await Teacher.findByIdAndUpdate({_id: id}, {$push: {slot: idSlot}}, {new:true});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
};

const deleteSlotOfTeacher = async (id, idSlot) => {
    try {
        return await Teacher.findOneAndUpdate({_id: id}, {$pull: {slot: idSlot}});
    }catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = {
    addTeacher, //ok
    getTeacher, //ok
    updateTeacher, //ok
    deleteTeacher, // ok
    getTeacherByLastName,// ok
    addSlotToTeacher, // ok
    deleteSlotOfTeacher,
};
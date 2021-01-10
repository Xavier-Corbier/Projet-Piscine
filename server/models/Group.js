const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name: {type : String, required : true , unique : true},
    tutorFirstName: {type: String},
    tutorLastName: {type: String},
    companyName: {type: String},
    slot: {type: mongoose.Schema.Types.ObjectId, ref: 'Slot'},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required : true},
    studentList: [{type: mongoose.Schema.Types.ObjectId, ref: 'studentList', required : true, unique : true}]
});

module.exports = mongoose.model('Group', groupSchema);

// addStudent
// creategroupbystudent
const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    tutorFirstName: { type: String, required: true },
    tutorLastName: { type: String, required: true },
    companyName: { type: String, required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot'},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    studentList: { type: mongoose.Schema.Types.ObjectId, ref: 'studentList'}
});

module.exports = mongoose.model('Group', groupSchema);

const mongoose = require("mongoose");

const groupProjectSchema = mongoose.Schema({
    tutorFirstName: { type: String, required: true },
    tutorLastName: { type: String, required: true },
    companyName: { type: String, required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, //Unique?
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

module.exports = mongoose.model('Group', groupProjectSchema);

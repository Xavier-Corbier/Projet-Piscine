const mongoose = require("mongoose");

const groupProjectSchema = mongoose.Schema({
    firstNameTutor: { type: String, required: true },
    lastNameTutor: { type: String, required: true },
    nameEntreprise: { type: String, required: true },
    _slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, //Unique?
    _teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

module.exports = mongoose.model('Group', groupProjectSchema);

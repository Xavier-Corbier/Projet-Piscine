const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    // n° étudiant à peut être crypter ?
    _id: { type: Int, required: true , unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    promo: { type: String, required: true },
    email: { type: String, required: true },
    pasword: { type: String, required: true },
    _groupProject: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupProject', required: true }
});

module.exports = mongoose.model('Student', studentSchema);

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');


const studentSchema = mongoose.Schema({
    studentNumber: { type: Number, required: true , unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    promo: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
    // pas required car à la création l'étudiant n'a pas de groupProject
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Student', studentSchema);

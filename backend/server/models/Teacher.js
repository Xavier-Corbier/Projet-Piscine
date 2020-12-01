const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    _slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }
});

module.exports = mongoose.model('Teacher', teacherSchema);

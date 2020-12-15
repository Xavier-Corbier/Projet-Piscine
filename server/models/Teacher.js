const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    slotList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }]
    /*
    Quand on assigne un slot à un prof, la date de ce slot de doit pas chevaucher avec
    la date d'un slot qu'il possède déjà
     */
});

module.exports = mongoose.model('Teacher', teacherSchema);

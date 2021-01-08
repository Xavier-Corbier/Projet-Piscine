const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    slotList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot'}]
});


module.exports = mongoose.model('Teacher', teacherSchema);

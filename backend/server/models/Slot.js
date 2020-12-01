const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
    room: { type: String, required: true },
    date:  { type: String, required: true },
    hour: { type: Int, required: true },
    _event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

module.exports = mongoose.model('Slot', slotSchema);

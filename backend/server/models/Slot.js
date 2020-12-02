const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
    room: { type: String, required: true },
    date:  { type: Date, required: true },
    hour: { type: Date, required: true },
    _event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

module.exports = mongoose.model('Slot', slotSchema);

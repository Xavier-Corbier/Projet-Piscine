const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    wording: { type: String, required: true },
    durationSlot: { type: Number, required: true },
    deadline: { type: Date, required: true },
    nbMaxStudent: { type: Number, required: true },
    nbJury: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promo: { type: String, required: true },
    listSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }]
});

module.exports = mongoose.model('Event', eventSchema);

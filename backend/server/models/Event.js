const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    wording: { type: String, required: true },
    durationSlot: { type: Int, required: true },
    deadline: { type: Date, required: true },
    nbMaxStudent: { type: Int, required: true },
    nbJury: { type: Int, required: true },
    startdate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promo: { type: String, required: true },
    listSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }]
});

module.exports = mongoose.model('Event', eventSchema);

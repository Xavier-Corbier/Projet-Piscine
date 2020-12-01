const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    wording: { type: String, required: true },
    durationSlot: { type: Int, required: true },
    deadline: { type: Int, required: true },
    nbMaxStudent: { type: Int, required: true },
    nbJury: { type: Int, required: true },
    startdate: { type: Int, required: true },
    endDate: { type: Int, required: true },
    promo: { type: String, required: true },
    listSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }]
});

module.exports = mongoose.model('Event', eventSchema);

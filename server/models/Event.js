const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    color: { type: String, required: true, unique: true},
    maxStudentNumber: { type: Number, required: true },
    maxJuryNumber: { type: Number },
    slotDuration: { type: Number, required: true },
    breakDuration: {type: Number, required: true},
    bookingDeadline: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promo: { type: String, required: true },
    slotList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot'}]
});

module.exports = mongoose.model('Event', eventSchema);

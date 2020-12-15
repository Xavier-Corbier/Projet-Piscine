const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    slotDuration: { type: Number, required: true },
    bookingDeadline: { type: Date, required: true },
    maxStudentNumber: { type: Number, required: true },
    maxJuryNumber: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    promo: { type: String, required: true },
    slotList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }]
    // slotList required: true pour respecter le MCD de la prof mais en réalité on peut créer un évènement vide
    // TODO: demander à la prof si l'évènement peut être vide
});

module.exports = mongoose.model('Event', eventSchema);

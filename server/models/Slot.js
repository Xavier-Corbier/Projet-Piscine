const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
    room: { type: String},
    date:  { type: Date, required: true }, // l'heure est comprise dans l'objet Date
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    jury: [{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}]
    // Le slot n'a pas besoin du prof, il pourra le récupérer à partir du group
});

/*
Contraintes d'unicité d'un slot :
- soit même salle qu'un autre slot mais à une heure forcément différente
- soit même heure qu'un autre slot mais dans une salle forcément différente
- soit une autre salle et une autre heure
le couple (date, salle) doit être unique
 */

module.exports = mongoose.model('Slot', slotSchema);

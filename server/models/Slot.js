const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
    room: { type: String, required: true },
    date:  { type: Date, required: true }, // l'heure est comprise dans l'objet Date
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
    // Le slot n'a pas besoin du prof, il pourra le récupérer à partir du group
});

/*
Contraintes d'unicité d'un slot :
- soit même salle qu'un autre slot mais à une heure forcément différente
- soit même heure qu'un autre slot mais dans une salle forcément différente
- soit une autre salle et une autre heure
le couple (date, salle) doit être unique
 */
// indexe les clés room et date et assure l'unicité du couple
slotSchema.index({room: 1, date: 1}, {unique: true});

module.exports = mongoose.model('Slot', slotSchema);

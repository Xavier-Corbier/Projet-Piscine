const mongoose = require("mongoose");
// TODO: implémenter le module UniqueValidator pour le studentNumber

const studentSchema = mongoose.Schema({
    // n° étudiant à peut être crypter ?
    studentNumber: { type: Number, required: true , unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    promo: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    /*
    Si la prof peut ajouter un étudiant alors le password/email n'est pas required, ce sera à l'étudiant
    de les créer lorsqu'il finalisera la création de son compte.
    Si la prof ne peut pas ajouter un édutiant alors ils sont required, l'étudiant fournit toutes les
    données à la création de son compte
     */
    // TODO: demander à la prof si elle veut ajouter les élèves à la main/fichier CSV puis les laisser faire leur compte
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'}
    // pas required car à la création l'étudiant n'a pas de groupProject
});

module.exports = mongoose.model('Student', studentSchema);

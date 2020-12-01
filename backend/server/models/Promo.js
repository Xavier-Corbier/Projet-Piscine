const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    name: {type: String, required: true},
    listStudents : [{type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}]
});

module.exports = mongoose.model('Promo', promoSchema)

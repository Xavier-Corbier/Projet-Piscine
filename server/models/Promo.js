const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    studentList : [{type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: false, unique: true}]
});

module.exports = mongoose.model('Promo', promoSchema)

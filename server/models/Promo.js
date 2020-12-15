const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
    name: {type: String, required: true},
    studentList : [{type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: false}]
});

module.exports = mongoose.model('Promo', promoSchema)

const Event = require('../models/Event');

module.exports.addEvent = (req, res, next) => {
    const body = req.body
    const event = new Event({
        name: body.name,
        slotDuration: body.slotDuration,
        bookingDeadline: new Date(body.bookingDeadline),
        maxStudentNumber: body.maxStudentNumber,
        maxJuryNumber: body.maxJuryNumber,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        promo: body.promo
    });
    event.save()
        .then(() => res.status(201).json({ message: 'Event ' + body.name + ' créé !' }))
        .catch((error) => res.status(500).json({ error }));
};

module.exports.getEvent = (req, res, next) => {
    Event.findOne({ _id: req.params.id })
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la récupération de l\'event d\'id '
                + req.params.id, err: error }));
};

module.exports.updateEvent = (req, res, next) => {
    Event.updateOne({ _id: req.params.id }, { ...req.body })
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la modification de l\'event d\'id '
            + req.params.id, err: error }));
};

module.exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id })
        .then((event) => res.status(200).json({ message: 'L\'event d\'id ' + req.params.id + ' a été supprimé.'}))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la supression de l\'event d\'id '
        + req.params.id, err: error }));
};
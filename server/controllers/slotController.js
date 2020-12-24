const Slot = require('../models/Slot');

module.exports.addSlot = (req, res, next) => {
    const body = req.body;
    const room = body.room.toUpperCase();
    const slot = new Slot({
        room: room,
        date: body.date,
        event: body.event, // id de l'event
    });
    slot.save()
        .then(() => res.status(201).json({ message: 'Le slot du ' + body.date + ' en salle ' + room + ' a été créé.'}))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la création du slot.', err: error }));
};

module.exports.getSlot = (req, res, next) => {
    Slot.findOne({ _id: req.params.id })
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la récupération du slot d\'id '
                + req.params.id, err: error }));
};

module.exports.updateSlot = (req, res, next) => {
    Slot.updateOne({ _id: req.params.id }, { ...req.body })
        .then((event) => res.status(200).json({ event }))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la modification du slot d\'id '
                + req.params.id, err: error }));
};

module.exports.deleteSlot = (req, res, next) => {
    Slot.deleteOne({ _id: req.params.id })
        .then((event) => res.status(200).json({ message: 'Le slot d\'id ' + req.params.id + ' a été supprimé.'}))
        .catch((error) => res.status(500).json({ message: 'Erreur lors de la suppression du slot d\'id '
                + req.params.id, err: error }));
};

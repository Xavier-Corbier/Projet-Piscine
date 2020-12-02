const Event = require('../../../models/Event');

exports.addEvent= (req, res, next) => {
    const event = new Event({
        ...req.body
    });
    event.save()
        .then(() => res.status(201).json({ message: 'Evenement enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

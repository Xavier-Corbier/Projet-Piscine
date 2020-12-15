const Event = require('../../../models/Event');

const addEvent = (req, res, next) => {
    const event = new Event({
        ...req.body
    });
    event.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}

module.exports = {addEvent}

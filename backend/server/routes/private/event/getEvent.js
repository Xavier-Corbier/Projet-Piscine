const Event = require('../../../models/Event');

exports.getEventList= (req, res, next) => {
    Event.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}

const Group = require('../models/Group');
const groupController = require('./groupController');
// CRUD

module.exports.addGroup = (req, res, next) => {
    // TODO
    const group = new Group({
        ...req.body
    });

    group.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getGroup = (req, res, next) => {
    const groups = Group.find()
        .then((groups) => {res.status(200).json(groups)})
        .catch(error => {res.status(404).json({error: error})});
}

module.exports.updateGroup = (req, res, next) => {
    // TODO
    const groups =Group.updateOne({ _id: req.params.id }, {$set : {...req.body, _id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.deleteGroup = (req, res, next) => {
    // TODO
    const groups = Group.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

module.exports.getGroupById = (req, res, next) => { //renvoie une étudiant selon son id
    const groups = Group.findOne({ _id: req.params.id})
        .then((groups) => {res.status(200).json(groups)})
        .catch(error => {res.status(404).json({error: error})});
}

module.exports.getIdGroupByStudent = (req, res, next) => {
    const groups = Group.findOne({ studentList: req.params.studentList})
        .then((groups) => {res.status(200).json(groups)})
        .catch(error => {res.status(404).json({error: error})});
};
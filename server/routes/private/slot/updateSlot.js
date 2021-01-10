const slotController = require('../../../controllers/slotController');
const validationUtils = require('../../../utils/validationUtils');

module.exports = async (req, res, next) => {
  try {
      const slotId = req.query.slotId;
      if (validationUtils.isObjectId(slotId) === false) {
          req.status(400).json({ error: 'L\'id passé en paramètre est invalide.'});
      }
      const slot = req.body;
      if (validationUtils.isEditable(slot, ['room', 'groupId']) === false) {
          req.status(400).json({ error: 'Certains attributs du slots que vous essayez de modifier ne le sont pas.'});
      }
      await slotController.updateSlotById(slotId, slot);
      res.status(200).json({ message: 'Slot mis à jour avec succès.'});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
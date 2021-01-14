const slotController = require('../../../controllers/slotController');
const validationUtils = require('../../../utils/validationUtils');
const cleanUtils = require('../../../utils/cleanUtils');

module.exports = async (req, res, next) => {
  try {
      const slotId = req.query.slotId;
      const body = req.body;
      cleanUtils.cleanSlot(body);

      if (await slotController.overlaps(body) === true) {
          return res.status(400).json({ error: 'Le slot que vous essayez de modifier ' +
                  'chevauchera un slot déjà existant (plages horaires concurrentes dans la même salle)'});
      }
      if (validationUtils.isEditable(body, ['room', 'groupId']) === false) {
          return res.status(400).json({ error: 'Certains attributs du slots que ' +
                  'vous essayez de modifier ne sont pas modifiables. ' +
                  'Pour modifier les membres du jury utilisez les routes prévues à cet effet.'});
      }

      const slot = await slotController.getSlotById(slotId);
      if (slot === null) {
          return res.status(400).json({ message: 'Ce slot n\'existe pas.' });
      }

      await slotController.updateSlotById(slotId, body);
      return res.status(200).json({ message: 'Slot mis à jour avec succès.'});

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
const slotController = require('../../../controllers/slotController');

module.exports = async (req, res, next) => {
  try {
      const slots = await slotController.getAllSlots();
      if (slots === null) {
          res.status(500).json({ error: 'Il n\' y a pas de slot dans la base de données.'});
      }
      res.status(200).json({ message: 'Slots récupérés avec succès.', slots: slots} );
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
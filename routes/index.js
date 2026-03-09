const express = require('express');
const router = express.Router();

// Page d'accueil — sera complétée à l'étape des vues
router.get('/', (req, res) => {
  res.send('Port de Plaisance Russell — API en cours de construction');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const catwaysService = require('../services/catways');
const reservationsService = require('../services/reservations');
const { isAuthenticated } = require('../middlewares/auth');

// GET /catways — liste tous les catways
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const catways = await catwaysService.getAll();
    res.render('catways', { catways, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /catways/:id — détails d'un catway
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    res.render('catway', { catway, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// POST /catways — créer un catway
router.post('/', isAuthenticated, async (req, res) => {
  try {
    await catwaysService.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /catways/:id — remplacer un catway
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.replace(req.params.id, req.body);
    res.json(catway);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// PATCH /catways/:id — modifier partiellement un catway
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.update(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// DELETE /catways/:id — supprimer un catway
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await catwaysService.remove(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// --- Sous-routes réservations (seront complétées étape 5) ---

// GET /catways/:id/reservations
router.get('/:id/reservations', isAuthenticated, async (req, res) => {
  res.json({ message: 'À implémenter étape 5' });
});

// GET /catways/:id/reservations/:idReservation
router.get('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  res.json({ message: 'À implémenter étape 5' });
});

// POST /catways/:id/reservations
router.post('/:id/reservations', isAuthenticated, async (req, res) => {
  res.json({ message: 'À implémenter étape 5' });
});

// DELETE /catways/:id/reservations/:idReservation
router.delete('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  res.json({ message: 'À implémenter étape 5' });
});

module.exports = router;

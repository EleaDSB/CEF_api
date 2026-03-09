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

// --- Sous-routes réservations ---

// GET /catways/:id/reservations — liste les réservations d'un catway
router.get('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    const reservations = await reservationsService.getAllByCatway(catway.catwayNumber);
    res.render('reservations', { reservations, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// GET /catways/:id/reservations/:idReservation — détails d'une réservation
router.get('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    const reservation = await reservationsService.getById(req.params.idReservation);
    res.render('reservation', { reservation, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// POST /catways/:id/reservations — créer une réservation
router.post('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    await reservationsService.create(catway.catwayNumber, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /catways/:id/reservations/:idReservation — supprimer une réservation
router.delete('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    await reservationsService.remove(req.params.idReservation);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

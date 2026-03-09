const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const reservationsService = require('../services/reservations');

// GET / — page d'accueil
router.get('/', (req, res) => {
  const error = req.query.error || null;
  res.render('index', { error });
});

// GET /dashboard — tableau de bord (protégé)
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// GET /reservations — liste de toutes les réservations (protégé)
router.get('/reservations', isAuthenticated, async (req, res) => {
  try {
    const reservations = await reservationsService.getAll();
    res.render('reservations', { reservations, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /docs — documentation de l'API
router.get('/docs', isAuthenticated, (req, res) => {
  res.render('docs', { user: req.user });
});

module.exports = router;

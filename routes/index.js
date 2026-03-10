/**
 * @module routes/index
 * @description Routes principales de l'application : accueil, tableau de bord, réservations globales et documentation.
 */

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const reservationsService = require('../services/reservations');

/**
 * @route GET /
 * @description Page d'accueil avec formulaire de connexion.
 * Affiche un message d'erreur si le paramètre `error` est présent dans l'URL.
 * @access Public
 */
router.get('/', (req, res) => {
  const error = req.query.error || null;
  res.render('index', { error });
});

/**
 * @route GET /dashboard
 * @description Tableau de bord de l'utilisateur connecté.
 * Contient tous les formulaires de gestion (catways, réservations, utilisateurs).
 * @access Privé
 */
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

/**
 * @route GET /reservations
 * @description Liste l'ensemble des réservations toutes ressources confondues.
 * @access Privé
 */
router.get('/reservations', isAuthenticated, async (req, res) => {
  try {
    const reservations = await reservationsService.getAll();
    res.render('reservations', { reservations, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /docs
 * @description Page de documentation de l'API (vue d'ensemble, tutoriel, exemples, glossaire).
 * @access Public
 */
router.get('/docs', (req, res) => {
  const user = req.session?.token ? req.user : null;
  res.render('docs', { user });
});

module.exports = router;

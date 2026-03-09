/**
 * @module routes/catways
 * @description Routes CRUD pour la ressource Catway et ses sous-ressources Réservation.
 * Toutes les routes sont protégées par le middleware isAuthenticated.
 */

const express = require('express');
const router = express.Router();
const catwaysService = require('../services/catways');
const reservationsService = require('../services/reservations');
const { isAuthenticated } = require('../middlewares/auth');

/**
 * @route GET /catways
 * @description Retourne la liste de tous les catways.
 * @access Privé
 */
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const catways = await catwaysService.getAll();
    res.render('catways', { catways, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route GET /catways/:id
 * @description Retourne les détails d'un catway par son identifiant.
 * @param {string} id - Identifiant MongoDB du catway
 * @access Privé
 */
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    res.render('catway', { catway, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route POST /catways
 * @description Crée un nouveau catway.
 * @body {number} catwayNumber - Numéro du catway
 * @body {string} catwayType - Type : "long" ou "short"
 * @body {string} catwayState - Description de l'état
 * @access Privé
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    await catwaysService.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route PUT /catways/:id
 * @description Remplace entièrement un catway existant.
 * @param {string} id - Identifiant MongoDB du catway
 * @access Privé
 */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.replace(req.params.id, req.body);
    res.json(catway);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route PATCH /catways/:id
 * @description Modifie partiellement un catway (ex: mise à jour de l'état).
 * @param {string} id - Identifiant MongoDB du catway
 * @body {string} catwayState - Nouveau état du catway
 * @access Privé
 */
router.patch('/:id', isAuthenticated, async (req, res) => {
  try {
    await catwaysService.update(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route DELETE /catways/:id
 * @description Supprime un catway par son identifiant.
 * @param {string} id - Identifiant MongoDB du catway
 * @access Privé
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await catwaysService.remove(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// ─── Sous-routes Réservations ─────────────────────────────────────────────────

/**
 * @route GET /catways/:id/reservations
 * @description Liste toutes les réservations d'un catway donné.
 * @param {string} id - Identifiant MongoDB du catway
 * @access Privé
 */
router.get('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    const reservations = await reservationsService.getAllByCatway(catway.catwayNumber);
    res.render('reservations', { reservations, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route GET /catways/:id/reservations/:idReservation
 * @description Retourne les détails d'une réservation spécifique.
 * @param {string} id - Identifiant MongoDB du catway
 * @param {string} idReservation - Identifiant MongoDB de la réservation
 * @access Privé
 */
router.get('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    const reservation = await reservationsService.getById(req.params.idReservation);
    res.render('reservation', { reservation, user: req.user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route POST /catways/:id/reservations
 * @description Crée une réservation pour un catway.
 * @param {string} id - Identifiant MongoDB du catway
 * @body {string} clientName - Nom du client
 * @body {string} boatName - Nom du bateau
 * @body {Date} checkIn - Date d'arrivée
 * @body {Date} checkOut - Date de départ
 * @access Privé
 */
router.post('/:id/reservations', isAuthenticated, async (req, res) => {
  try {
    const catway = await catwaysService.getById(req.params.id);
    await reservationsService.create(catway.catwayNumber, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route DELETE /catways/:id/reservations/:idReservation
 * @description Supprime une réservation par son identifiant.
 * @param {string} id - Identifiant MongoDB du catway
 * @param {string} idReservation - Identifiant MongoDB de la réservation
 * @access Privé
 */
router.delete('/:id/reservations/:idReservation', isAuthenticated, async (req, res) => {
  try {
    await reservationsService.remove(req.params.idReservation);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

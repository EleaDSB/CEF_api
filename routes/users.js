/**
 * @module routes/users
 * @description Routes CRUD pour la gestion des comptes utilisateurs.
 * Toutes les routes sont protégées par le middleware isAuthenticated.
 */

const express = require('express');
const router = express.Router();
const usersService = require('../services/users');
const { isAuthenticated } = require('../middlewares/auth');

/**
 * @route POST /users
 * @description Crée un nouvel utilisateur. Le mot de passe est hashé automatiquement.
 * @body {string} name - Nom de l'utilisateur
 * @body {string} email - Adresse email (unique)
 * @body {string} password - Mot de passe (min. 6 caractères)
 * @access Privé
 */
router.post('/', isAuthenticated, async (req, res) => {
  try {
    await usersService.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route PUT /users/:id
 * @description Met à jour les informations d'un utilisateur.
 * Si le mot de passe est modifié, il est re-hashé via le hook bcrypt.
 * @param {string} id - Identifiant MongoDB de l'utilisateur
 * @access Privé
 */
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    await usersService.update(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

/**
 * @route DELETE /users/:id
 * @description Supprime un utilisateur par son identifiant.
 * @param {string} id - Identifiant MongoDB de l'utilisateur
 * @access Privé
 */
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

/**
 * @module routes/auth
 * @description Routes d'authentification : connexion et déconnexion.
 */

const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

/**
 * @route POST /auth/login
 * @description Authentifie un utilisateur et stocke le JWT en session.
 * Redirige vers /dashboard si succès, vers / avec message d'erreur sinon.
 * @body {string} email - Adresse email de l'utilisateur
 * @body {string} password - Mot de passe de l'utilisateur
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    req.session.token = token;
    res.redirect('/dashboard');
  } catch (err) {
    res.redirect('/?error=' + encodeURIComponent(err.message));
  }
});

/**
 * @route GET /auth/logout
 * @description Détruit la session et redirige vers la page d'accueil.
 * @access Public
 */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

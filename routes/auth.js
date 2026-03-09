const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

// POST /auth/login — connexion utilisateur
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

// GET /auth/logout — déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

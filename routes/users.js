const express = require('express');
const router = express.Router();
const usersService = require('../services/users');
const { isAuthenticated } = require('../middlewares/auth');

// POST /users — créer un utilisateur
router.post('/', isAuthenticated, async (req, res) => {
  try {
    await usersService.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id — modifier un utilisateur
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    await usersService.update(req.params.id, req.body);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// DELETE /users/:id — supprimer un utilisateur
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;

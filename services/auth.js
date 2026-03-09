const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Vérifie les identifiants et retourne un JWT si valides.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>} token JWT
 * @throws {Error} si email/mot de passe invalides
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return token;
};

module.exports = { login };

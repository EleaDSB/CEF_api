/**
 * @module middlewares/auth
 * @description Middleware d'authentification basé sur JWT stocké en session.
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware de protection des routes.
 * Vérifie la présence et la validité du JWT stocké en session.
 * Si le token est valide, les informations de l'utilisateur sont attachées à req.user.
 * Redirige vers la page d'accueil si le token est absent ou invalide.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isAuthenticated = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.session.destroy();
    return res.redirect('/');
  }
};

module.exports = { isAuthenticated };

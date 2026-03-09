const jwt = require('jsonwebtoken');

/**
 * Middleware de protection des routes.
 * Vérifie la présence et la validité du JWT stocké en session.
 * Redirige vers la page d'accueil si non authentifié.
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

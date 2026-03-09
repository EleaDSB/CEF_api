const User = require('../models/user');

/**
 * Crée un nouvel utilisateur.
 * @param {Object} data - { name, email, password }
 * @returns {Promise<Object>}
 */
const create = async (data) => {
  const user = new User(data);
  return await user.save();
};

/**
 * Met à jour un utilisateur par son id.
 * @param {string} id
 * @param {Object} data - champs à modifier
 * @returns {Promise<Object>}
 * @throws {Error} si non trouvé
 */
const update = async (id, data) => {
  // Si le mot de passe est modifié, on passe par save() pour déclencher le hook bcrypt
  if (data.password) {
    const user = await User.findById(id);
    if (!user) throw new Error('Utilisateur non trouvé');
    Object.assign(user, data);
    return await user.save();
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!user) throw new Error('Utilisateur non trouvé');
  return user;
};

/**
 * Supprime un utilisateur par son id.
 * @param {string} id
 * @returns {Promise<void>}
 * @throws {Error} si non trouvé
 */
const remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('Utilisateur non trouvé');
};

module.exports = { create, update, remove };

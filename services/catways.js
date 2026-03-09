const Catway = require('../models/catway');

/**
 * Retourne la liste de tous les catways.
 * @returns {Promise<Array>}
 */
const getAll = async () => {
  return await Catway.find();
};

/**
 * Retourne un catway par son id.
 * @param {string} id
 * @returns {Promise<Object>}
 * @throws {Error} si non trouvé
 */
const getById = async (id) => {
  const catway = await Catway.findById(id);
  if (!catway) throw new Error('Catway non trouvé');
  return catway;
};

/**
 * Crée un nouveau catway.
 * @param {Object} data - { catwayNumber, catwayType, catwayState }
 * @returns {Promise<Object>}
 */
const create = async (data) => {
  const catway = new Catway(data);
  return await catway.save();
};

/**
 * Remplace entièrement un catway (PUT).
 * @param {string} id
 * @param {Object} data - { catwayNumber, catwayType, catwayState }
 * @returns {Promise<Object>}
 * @throws {Error} si non trouvé
 */
const replace = async (id, data) => {
  const catway = await Catway.findByIdAndUpdate(
    id,
    { catwayNumber: data.catwayNumber, catwayType: data.catwayType, catwayState: data.catwayState },
    { returnDocument: 'after', runValidators: true, overwrite: true }
  );
  if (!catway) throw new Error('Catway non trouvé');
  return catway;
};

/**
 * Met à jour partiellement un catway (PATCH).
 * @param {string} id
 * @param {Object} data - champs à modifier
 * @returns {Promise<Object>}
 * @throws {Error} si non trouvé
 */
const update = async (id, data) => {
  const catway = await Catway.findByIdAndUpdate(
    id,
    data,
    { returnDocument: 'after', runValidators: true }
  );
  if (!catway) throw new Error('Catway non trouvé');
  return catway;
};

/**
 * Supprime un catway par son id.
 * @param {string} id
 * @returns {Promise<void>}
 * @throws {Error} si non trouvé
 */
const remove = async (id) => {
  const catway = await Catway.findByIdAndDelete(id);
  if (!catway) throw new Error('Catway non trouvé');
};

module.exports = { getAll, getById, create, replace, update, remove };

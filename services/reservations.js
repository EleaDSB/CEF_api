const Reservation = require('../models/reservation');

/**
 * Retourne toutes les réservations d'un catway.
 * @param {number} catwayNumber
 * @returns {Promise<Array>}
 */
const getAllByCatway = async (catwayNumber) => {
  return await Reservation.find({ catwayNumber });
};

/**
 * Retourne toutes les réservations (toutes ressources confondues).
 * @returns {Promise<Array>}
 */
const getAll = async () => {
  return await Reservation.find();
};

/**
 * Retourne une réservation par son id.
 * @param {string} id
 * @returns {Promise<Object>}
 * @throws {Error} si non trouvée
 */
const getById = async (id) => {
  const reservation = await Reservation.findById(id);
  if (!reservation) throw new Error('Réservation non trouvée');
  return reservation;
};

/**
 * Crée une réservation pour un catway.
 * @param {number} catwayNumber
 * @param {Object} data - { clientName, boatName, checkIn, checkOut }
 * @returns {Promise<Object>}
 */
const create = async (catwayNumber, data) => {
  const reservation = new Reservation({ ...data, catwayNumber });
  return await reservation.save();
};

/**
 * Supprime une réservation par son id.
 * @param {string} id
 * @returns {Promise<void>}
 * @throws {Error} si non trouvée
 */
const remove = async (id) => {
  const reservation = await Reservation.findByIdAndDelete(id);
  if (!reservation) throw new Error('Réservation non trouvée');
};

module.exports = { getAll, getAllByCatway, getById, create, remove };

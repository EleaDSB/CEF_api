/**
 * @module models/reservation
 * @description Modèle Mongoose représentant une réservation de catway.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Numéro du catway réservé
 * @property {string} clientName - Nom du client
 * @property {string} boatName - Nom du bateau amarré
 * @property {Date} checkIn - Date de début de réservation
 * @property {Date} checkOut - Date de fin de réservation (doit être > checkIn)
 * @property {Date} createdAt - Date de création (auto)
 * @property {Date} updatedAt - Date de dernière modification (auto)
 */
const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire']
  },
  clientName: {
    type: String,
    required: [true, 'Le nom du client est obligatoire'],
    trim: true
  },
  boatName: {
    type: String,
    required: [true, 'Le nom du bateau est obligatoire'],
    trim: true
  },
  checkIn: {
    type: Date,
    required: [true, 'La date d\'arrivée est obligatoire']
  },
  checkOut: {
    type: Date,
    required: [true, 'La date de départ est obligatoire'],
    validate: {
      validator: function (value) {
        // La date de départ doit être postérieure à la date d'arrivée
        return value > this.checkIn;
      },
      message: 'La date de départ doit être postérieure à la date d\'arrivée'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);

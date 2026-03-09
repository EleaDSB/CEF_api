/**
 * @module models/catway
 * @description Modèle Mongoose représentant un catway (appontement) du port.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Catway
 * @property {number} catwayNumber - Numéro unique identifiant le catway
 * @property {string} catwayType - Type du catway : "long" ou "short"
 * @property {string} catwayState - Description de l'état actuel du catway
 * @property {Date} createdAt - Date de création (auto)
 * @property {Date} updatedAt - Date de dernière modification (auto)
 */
const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'],
    unique: true
  },
  catwayType: {
    type: String,
    required: [true, 'Le type est obligatoire'],
    enum: {
      values: ['long', 'short'],
      message: 'Le type doit être "long" ou "short"'
    }
  },
  catwayState: {
    type: String,
    required: [true, 'L\'état du catway est obligatoire'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);

/**
 * @module models/user
 * @description Modèle Mongoose représentant un utilisateur de la capitainerie.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @typedef {Object} User
 * @property {string} name - Nom complet de l'utilisateur
 * @property {string} email - Adresse email unique (mise en minuscules)
 * @property {string} password - Mot de passe hashé (bcrypt, min. 6 caractères)
 * @property {Date} createdAt - Date de création (auto)
 * @property {Date} updatedAt - Date de dernière modification (auto)
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Format d\'email invalide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  }
}, { timestamps: true });

/**
 * Hook pre-save : hash automatique du mot de passe si modifié.
 * Utilise bcrypt avec un facteur de coût de 10.
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);

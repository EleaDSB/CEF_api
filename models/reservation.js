const mongoose = require('mongoose');

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
        return value > this.checkIn;
      },
      message: 'La date de départ doit être postérieure à la date d\'arrivée'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);

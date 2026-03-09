require('dotenv').config();
const { expect } = require('chai');
const mongoose = require('mongoose');

const catwaysService = require('../services/catways');
const reservationsService = require('../services/reservations');

// Données de test
const testCatway = {
  catwayNumber: 9999,
  catwayType: 'short',
  catwayState: 'état de test'
};

let createdCatwayId;
let createdReservationId;

before(async function () {
  this.timeout(10000);
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
  // Nettoyage préventif
  const Catway = require('../models/catway');
  await Catway.deleteMany({ catwayNumber: 9999 });
  const Reservation = require('../models/reservation');
  await Reservation.deleteMany({ catwayNumber: 9999 });
});

after(async function () {
  // Nettoyage final des données de test
  const Catway = require('../models/catway');
  await Catway.deleteMany({ catwayNumber: 9999 });
  const Reservation = require('../models/reservation');
  await Reservation.deleteMany({ catwayNumber: 9999 });
});

// ─── CATWAYS ──────────────────────────────────────────────────────────────────

describe('Catways', () => {

  it('1. Lister tous les catways', async function () {
    this.timeout(5000);
    const catways = await catwaysService.getAll();
    expect(catways).to.be.an('array');
    expect(catways.length).to.be.greaterThan(0);
  });

  it('2. Créer un catway', async function () {
    this.timeout(5000);
    const catway = await catwaysService.create(testCatway);
    expect(catway).to.have.property('_id');
    expect(catway.catwayNumber).to.equal(9999);
    expect(catway.catwayType).to.equal('short');
    createdCatwayId = catway._id.toString();
  });

  it('3. Récupérer les détails d\'un catway', async function () {
    this.timeout(5000);
    const catway = await catwaysService.getById(createdCatwayId);
    expect(catway).to.have.property('catwayNumber', 9999);
    expect(catway).to.have.property('catwayState', 'état de test');
  });

  it('4. Modifier l\'état d\'un catway', async function () {
    this.timeout(5000);
    const catway = await catwaysService.update(createdCatwayId, { catwayState: 'état modifié' });
    expect(catway.catwayState).to.equal('état modifié');
  });

  it('5. Supprimer un catway', async function () {
    this.timeout(5000);
    // Recréer un catway pour le supprimer (le précédent sera réutilisé pour les réservations)
    const temp = await catwaysService.create({ catwayNumber: 9998, catwayType: 'long', catwayState: 'à supprimer' });
    await catwaysService.remove(temp._id.toString());
    try {
      await catwaysService.getById(temp._id.toString());
      throw new Error('Le catway aurait dû être supprimé');
    } catch (err) {
      expect(err.message).to.equal('Catway non trouvé');
    }
  });

});

// ─── RÉSERVATIONS ─────────────────────────────────────────────────────────────

describe('Réservations', () => {

  it('6. Créer une réservation', async function () {
    this.timeout(5000);
    const reservation = await reservationsService.create(9999, {
      clientName: 'Client Test',
      boatName: 'Bateau Test',
      checkIn: new Date('2025-07-01'),
      checkOut: new Date('2025-07-15')
    });
    expect(reservation).to.have.property('_id');
    expect(reservation.clientName).to.equal('Client Test');
    expect(reservation.catwayNumber).to.equal(9999);
    createdReservationId = reservation._id.toString();
  });

  it('7. Lister les réservations d\'un catway', async function () {
    this.timeout(5000);
    const reservations = await reservationsService.getAllByCatway(9999);
    expect(reservations).to.be.an('array');
    expect(reservations.length).to.be.greaterThan(0);
    expect(reservations[0].catwayNumber).to.equal(9999);
  });

  it('8. Récupérer les détails d\'une réservation', async function () {
    this.timeout(5000);
    const reservation = await reservationsService.getById(createdReservationId);
    expect(reservation).to.have.property('clientName', 'Client Test');
    expect(reservation).to.have.property('boatName', 'Bateau Test');
  });

  it('9. Supprimer une réservation', async function () {
    this.timeout(5000);
    await reservationsService.remove(createdReservationId);
    try {
      await reservationsService.getById(createdReservationId);
      throw new Error('La réservation aurait dû être supprimée');
    } catch (err) {
      expect(err.message).to.equal('Réservation non trouvée');
    }
  });

});

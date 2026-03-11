require('dotenv').config();
const mongoose = require('mongoose');

const migrate = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connexion MongoDB OK');

  const result = await mongoose.connection.collection('reservations').updateMany(
    { startDate: { $exists: true } },
    [{ $set: { checkIn: '$startDate', checkOut: '$endDate' } },
     { $unset: ['startDate', 'endDate'] }]
  );

  console.log(`${result.modifiedCount} réservation(s) migrée(s)`);
  mongoose.connection.close();
};

migrate().catch(console.error);

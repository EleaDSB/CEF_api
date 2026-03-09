require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');

const createUser = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: 'admin@portrussell.fr' });
  if (existing) {
    console.log('Utilisateur déjà existant');
    return mongoose.connection.close();
  }

  await User.create({
    name: 'Capitaine Russell',
    email: 'admin@portrussell.fr',
    password: 'Admin1234'
  });

  console.log('Utilisateur créé :');
  console.log('  Email    : admin@portrussell.fr');
  console.log('  Password : Admin1234');
  mongoose.connection.close();
};

createUser().catch(console.error);

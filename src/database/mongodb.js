const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à la base de donnée mongodb effectuée avec succès');
  } catch (error) {
    console.error('Echec de connexion à la base de donnée mongodb:', error);
    process.exit(1);
  }
};

module.exports = connectDB;


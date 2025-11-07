const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5 secondes pour la sélection du serveur
      socketTimeoutMS: 45000, // Timeout de 45 secondes pour les opérations socket
    });
    console.log('Connexion à la base de donnée mongodb effectuée avec succès');
  } catch (error) {
    console.error('Echec de connexion à la base de donnée mongodb:', error);
    console.warn('⚠️ Le serveur continuera sans MongoDB. Les messages ne seront pas sauvegardés.');
    // Ne pas faire planter le serveur si MongoDB n'est pas disponible
    // process.exit(1);
  }
};

module.exports = connectDB;


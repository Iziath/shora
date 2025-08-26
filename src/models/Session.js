const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sessionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: () => `session-${uuidv4()}`,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  revokedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ajout d'un index unique pour éviter plusieurs sessions actives par utilisateur
sessionSchema.index({ userId: 1, revokedAt: null }, { unique: true });

module.exports = mongoose.model('Session', sessionSchema);
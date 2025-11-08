const mongoose = require('mongoose');

// Modèle User partagé avec le backend principal
// Utilise le même schéma que backend/models/User.js
const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    match: /^\+229\d{8}$/
  },
  isChatbotUser: {
    type: Boolean,
    default: false
  },
  hasVisitedBefore: {
    type: Boolean,
    default: false
  },
  lastVisitAt: {
    type: Date,
    default: Date.now
  },
  name: { type: String, default: '' },
  profession: {
    type: String,
    enum: ['maçon', 'électricien', 'plombier', 'charpentier', 'peintre', 'manœuvre', 'autre'],
    default: 'autre'
  },
  chantierType: {
    type: String,
    enum: ['construction', 'rénovation', 'infrastructure', 'autre'],
    default: 'autre'
  },
  language: {
    type: String,
    enum: ['fr', 'fon', 'yoruba'],
    default: 'fr'
  },
  preferredMode: {
    type: String,
    enum: ['text', 'audio'],
    default: 'text'
  },
  status: {
    type: Boolean,
    default: false
  },
  conversationState: {
    type: String,
    enum: ['new', 'onboarding', 'active', 'inactive'],
    default: 'new'
  },
  onboardingStep: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  hasScannedQR: { type: Boolean, default: false },
  lastInteraction: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'users', // Utiliser la même collection que le backend
  strict: false // Permettre des champs supplémentaires
});

// Index pour recherche rapide
userSchema.index({ phoneNumber: 1 });
userSchema.index({ name: 1 });
userSchema.index({ profession: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ lastInteraction: -1 });
userSchema.index({ isChatbotUser: 1, lastVisitAt: -1 });

module.exports = mongoose.model('User', userSchema);


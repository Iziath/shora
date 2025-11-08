const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

// Modèle User unique pour tous les types d'utilisateurs
// Fusionne les utilisateurs chatbot et les utilisateurs d'authentification
const userSchema = new mongoose.Schema({
  // Champs pour l'authentification (optionnels)
  uuid: {
    type: String,
    default: () => `user-${uuidv4()}`,
    unique: true,
    sparse: true
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    minlength: 8
  },
  // Champs pour les utilisateurs chatbot et WhatsApp
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
  collection: 'users', // Utiliser la même collection que le backend principal
  strict: false, // Permettre des champs supplémentaires
  timestamps: true // Timestamps automatiques
});

// Méthode de hachage de mot de passe (pour l'authentification)
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Mot de passe haché avec succès');
  }
  next();
});

// Méthode de comparaison de mot de passe
userSchema.methods.verifyPassword = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

// Index pour recherche rapide
userSchema.index({ phoneNumber: 1 });
userSchema.index({ name: 1 });
userSchema.index({ profession: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ lastInteraction: -1 });
userSchema.index({ isChatbotUser: 1, lastVisitAt: -1 });
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model('User', userSchema);


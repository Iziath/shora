const mongoose = require('mongoose');

const chatbotUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  profession: {
    type: String,
    default: null
  },
  chantierType: {
    type: String,
    default: null
  },
  langue: {
    type: String,
    default: 'fr'
  },
  mode: {
    type: String,
    enum: ['text', 'audio'],
    default: 'text'
  },
  hasVisitedBefore: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: false // true = a déjà visité une fois
  },
  lastVisitAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour recherche rapide par nom
chatbotUserSchema.index({ name: 1 });

module.exports = mongoose.model('ChatbotUser', chatbotUserSchema);


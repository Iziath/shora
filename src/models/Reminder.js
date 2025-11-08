const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: String, // ID de l'utilisateur (peut être ObjectId ou String selon le contexte)
    required: true
  },
  message: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null // URL de l'image (peut être stockée sur Cloudinary, S3, ou localement)
  },
  sent: {
    type: Boolean,
    default: false
  },
  sentAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour recherche rapide des rappels non envoyés
reminderSchema.index({ userId: 1, sent: 1 });
reminderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Reminder', reminderSchema);


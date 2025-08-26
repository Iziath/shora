const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: () => `user-${uuidv4()}`,

    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
}, {
  timestamps: true
});

/** Méthode de hachage de mot de passe
 * Avant de sauvegarder l'utilisateur, hash le mot de passe dans la base de donnée.
 */
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    //génère automatiquement un sel unique (10 tours de salage) 
    // et le combine avec le mot de passe pour produire un hachage sécurisé. 
    // Le sel est inclus dans le hachage final stocké dans la base de données (chaîne commençant par $2b$).
    this.password = await bcrypt.hash(this.password, 10);
    console.log('Mot de passe haché avec succès');
    next();
  }
})

/**
 * Méthode de comparaison de mot de passe entré en clair avec le hachage stocké en base de donnée
 * @param {*} password 
 * @returns 
 */
userSchema.methods.verifyPassword = async function (password) {
  //bcrypt.compare extrait le sel du hachage stocké, 
  // hache le mot de passe saisi avec ce sel, et compare les deux hachages. 
  // Si les hachages correspondent, la vérification réussit.
  // Sinon, la vérification échoue.
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
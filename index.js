const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/database/mongodb');
const usersRoutes = require('./src/routes/users');
const botRoutes = require('./src/routes/bot');
const authRoutes = require('./src/routes/auth');
const {authenticate} = require('./src/middleware/auth');


const app = express();
app.use(express.json())

//Initialisation de la connexion à la base de donnée
connectDB();

//Configuration des middleware et de cors
app.use(cors());
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb', extended: true}))

// Utiliser les routes
app.use('/users', usersRoutes);
app.use('/bot', botRoutes);
app.use('/auth', authRoutes);


app.get('/', (request, response) => {
    response.json({message: "Bienvenu sur l'API QuranConnect"});
})

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
// Écouter sur toutes les interfaces (0.0.0.0) pour permettre l'accès via IP locale
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`🌐 Accessible via IP locale sur le port ${PORT}`);
});


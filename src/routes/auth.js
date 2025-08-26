const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Session = require('../models/Session');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

router.post('/register', async (request, response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        return response.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return response.status(400).json({ message: 'Le nom d\'utilisateur ou l\'email existe déjà' });
        }

        // Créer un nouvel utilisateur (le mot de passe est haché automatiquement via le middleware pre-save)
        const user = new Users({ username, email, password });
        await user.save();

        response.status(201).json({ message: 'Inscription réussie, veuillez vous connecter' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        response.status(500).json({ message: 'Erreur serveur interne' });
    }
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        console.log('Email ou mot de passe manquant');
        return response.status(400).json({ message: 'Email et mot de passe requis' });
    }

    try {
        const user = await Users.findOne({ email });
        if (!user || !(await user.verifyPassword(password))) {
            return response.status(400).json({ message: 'Identifiants invalides ! Veuillez réessayer' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Vérifier si une session active existe déjà
        let session = await Session.findOne({ userId: user._id, revokedAt: null });
        if (session) {
            // Mettre à jour la session existante
            session.refreshToken = refreshToken;
            session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await session.save();
            console.log('Session mise à jour :', session);
        } else {
            // Créer une nouvelle session
            session = new Session({
                userId: user._id,
                refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
            });
            await session.save();
            console.log('Nouvelle session créée :', session);
        }

        response.status(200).json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        response.status(500).json({ message: 'Erreur serveur interne' });
    }
});

router.post('/refresh', async (request, response) => {
    const { refreshToken } = request.body;
    if (!refreshToken) {
        return response.status(400).json({ message: 'Refresh token requis' });
    }
    try {
        // Vérifier le refresh token
        const payload = verifyRefreshToken(refreshToken);
        if (!payload) {
            console.log('Refresh token invalide ou expiré');
            return response.status(401).json({ message: 'Refresh token invalide ou expiré' });
        }

        // Vérifier la session
        const session = await Session.findOne({ refreshToken, revokedAt: null });
        if (!session) {
            console.log('Session non trouvée ou révoquée');
            return response.status(401).json({ message: 'Session non trouvée ou révoquée' });
        }

        // Vérifier l'expiration de la session
        if (session.expiresAt < new Date()) {
            console.log('Session expirée');
            return response.status(401).json({ message: 'Session expirée' });
        }

        // Vérifier l'utilisateur
        const user = await Users.findById(payload.userId);
        if (!user) {
            console.log('Utilisateur non trouvé');
            return response.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Générer un nouveau access token et refresh token
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // Mettre à jour la session avec le nouveau refresh token
        session.refreshToken = newRefreshToken;
        session.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await session.save();
        console.log('Session mise à jour avec nouveau refresh token :', session);

        response.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error);
        return response.status(401).json({ message: 'Erreur lors du rafraîchissement du token' });
    }
});

router.post('/logout', async (request, response) => {
    const { refreshToken } = request.body;
    if (!refreshToken) {
        console.log('Refresh token requis');
        return response.status(400).json({ message: 'Refresh token requis' });
    }
    try {
        // Supprimer la session
        const session = await Session.findOneAndDelete({ refreshToken });
        if (!session) {
            console.log('Session non trouvée');
            return response.status(400).json({ message: 'Session non trouvée' });
        }
        response.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        response.status(500).json({ message: 'Erreur serveur interne' });
    }
});

module.exports = router;




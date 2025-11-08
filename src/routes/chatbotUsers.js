const express = require('express');
const router = express.Router();
const ChatbotUser = require('../models/ChatbotUser');

// Créer ou mettre à jour un utilisateur chatbot
router.post('/create-or-update', async (req, res) => {
    try {
        const { name, profession, chantierType, langue, mode } = req.body;
        
        if (!name) {
            return res.status(400).json({ 
                success: false, 
                error: 'Le nom est requis' 
            });
        }

        // Chercher si l'utilisateur existe déjà
        let user = await ChatbotUser.findOne({ name: name.trim() });
        
        if (user) {
            // Mettre à jour l'utilisateur existant
            user.profession = profession || user.profession;
            user.chantierType = chantierType || user.chantierType;
            user.langue = langue || user.langue;
            user.mode = mode || user.mode;
            user.hasVisitedBefore = true;
            user.status = true; // A déjà visité
            user.lastVisitAt = new Date();
            user.updatedAt = new Date();
            await user.save();
            
            return res.json({
                success: true,
                data: user,
                isNewUser: false,
                message: 'Utilisateur mis à jour'
            });
        } else {
            // Créer un nouvel utilisateur
            user = new ChatbotUser({
                name: name.trim(),
                profession: profession || null,
                chantierType: chantierType || null,
                langue: langue || 'fr',
                mode: mode || 'text',
                hasVisitedBefore: false,
                status: false, // Première visite
                lastVisitAt: new Date()
            });
            await user.save();
            
            // Marquer comme ayant visité après la première création
            user.hasVisitedBefore = true;
            user.status = true;
            await user.save();
            
            return res.json({
                success: true,
                data: user,
                isNewUser: true,
                message: 'Nouvel utilisateur créé'
            });
        }
    } catch (error) {
        console.error('Erreur create-or-update chatbot user:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Vérifier si un utilisateur existe
router.get('/check/:name', async (req, res) => {
    try {
        const user = await ChatbotUser.findOne({ name: req.params.name.trim() });
        res.json({
            success: true,
            exists: !!user,
            data: user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Récupérer tous les utilisateurs (pour les rappels)
router.get('/all', async (req, res) => {
    try {
        const users = await ChatbotUser.find().sort({ lastVisitAt: -1 });
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

module.exports = router;


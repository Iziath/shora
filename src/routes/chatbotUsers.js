const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

        // Chercher si l'utilisateur existe déjà (par nom et isChatbotUser = true)
        let user = await User.findOne({ 
            name: name.trim(), 
            isChatbotUser: true 
        });
        
        if (user) {
            // Mettre à jour l'utilisateur existant
            user.profession = profession || user.profession;
            user.chantierType = chantierType || user.chantierType;
            user.language = langue || user.language;
            user.preferredMode = mode || user.preferredMode;
            user.hasVisitedBefore = true;
            user.status = true; // A déjà visité
            user.lastVisitAt = new Date();
            user.lastInteraction = new Date();
            await user.save();
            
            return res.json({
                success: true,
                data: user,
                isNewUser: false,
                message: 'Utilisateur mis à jour'
            });
        } else {
            // Créer un nouvel utilisateur chatbot
            user = new User({
                name: name.trim(),
                profession: profession || 'autre',
                chantierType: chantierType || 'autre',
                language: langue || 'fr',
                preferredMode: mode || 'text',
                isChatbotUser: true,
                hasVisitedBefore: true,
                status: true,
                lastVisitAt: new Date(),
                lastInteraction: new Date(),
                conversationState: 'active',
                isActive: true
            });
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
        const user = await User.findOne({ 
            name: req.params.name.trim(),
            isChatbotUser: true 
        });
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

// Récupérer tous les utilisateurs chatbot (pour les rappels)
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({ isChatbotUser: true }).sort({ lastVisitAt: -1 });
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


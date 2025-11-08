const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const User = require('../models/User');

// Récupérer les rappels en attente pour un utilisateur
router.get('/pending/:userId', async (req, res) => {
    try {
        const reminders = await Reminder.find({
            userId: req.params.userId,
            sent: false
        }).sort({ createdAt: -1 }).limit(10);

        res.json({
            success: true,
            data: reminders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Marquer un rappel comme envoyé
router.post('/:reminderId/mark-sent', async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.reminderId);
        if (!reminder) {
            return res.status(404).json({
                success: false,
                error: 'Rappel non trouvé'
            });
        }

        reminder.sent = true;
        reminder.sentAt = new Date();
        await reminder.save();

        res.json({
            success: true,
            message: 'Rappel marqué comme envoyé'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Récupérer les rappels par nom d'utilisateur (pour le frontend)
router.get('/user/:name', async (req, res) => {
    try {
        const user = await User.findOne({ 
            name: req.params.name.trim(),
            isChatbotUser: true 
        });
        if (!user) {
            return res.json({
                success: true,
                data: []
            });
        }

        const reminders = await Reminder.find({
            userId: user._id.toString(),
            sent: false
        }).sort({ createdAt: -1 }).limit(5);

        res.json({
            success: true,
            data: reminders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;


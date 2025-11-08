const Reminder = require('../models/Reminder');
const User = require('../models/User');
const { getRandomReminder } = require('../config/reminders');
const axios = require('axios');

/**
 * Service de rappels automatiques pour les utilisateurs du chatbot
 * Envoie des rappels de sécurité chaque jour à partir de 9h, toutes les 5 minutes
 */

class ReminderService {
    constructor() {
        this.isRunning = false;
        this.reminderInterval = null;
        this.dailyRemindersSent = new Set(); // Pour éviter les doublons
    }

    /**
     * Démarrer le service de rappels
     */
    start() {
        if (this.isRunning) {
            console.log('⚠️ Service de rappels déjà démarré');
            return;
        }

        console.log('🚀 Démarrage du service de rappels automatiques');
        this.isRunning = true;

        // Vérifier l'heure actuelle et programmer le premier rappel
        this.scheduleNextReminder();

        // Vérifier toutes les minutes si on doit démarrer les rappels
        setInterval(() => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();

            // Si on est à 9h00 et qu'on n'a pas encore démarré aujourd'hui
            if (hour === 9 && minute === 0 && !this.hasStartedToday()) {
                this.startDailyReminders();
            }

            // Réinitialiser à minuit
            if (hour === 0 && minute === 0) {
                this.dailyRemindersSent.clear();
            }
        }, 60000); // Vérifier toutes les minutes
    }

    /**
     * Vérifier si on a déjà démarré les rappels aujourd'hui
     */
    hasStartedToday() {
        const today = new Date().toDateString();
        return this.dailyRemindersSent.has(today);
    }

    /**
     * Programmer le prochain rappel
     */
    scheduleNextReminder() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Si on est avant 9h, programmer pour 9h
        if (hour < 9) {
            const targetTime = new Date();
            targetTime.setHours(9, 0, 0, 0);
            const delay = targetTime.getTime() - now.getTime();
            
            setTimeout(() => {
                this.startDailyReminders();
            }, delay);
        } else if (hour === 9) {
            // Si on est à 9h, démarrer immédiatement
            this.startDailyReminders();
        }
    }

    /**
     * Démarrer les rappels quotidiens (9h - toutes les 5 minutes)
     */
    startDailyReminders() {
        const today = new Date().toDateString();
        if (this.dailyRemindersSent.has(today)) {
            return; // Déjà démarré aujourd'hui
        }

        this.dailyRemindersSent.add(today);
        console.log('📅 Démarrage des rappels quotidiens pour aujourd\'hui');

        // Envoyer le premier rappel immédiatement
        this.sendRemindersToAllUsers();

        // Programmer les rappels toutes les 5 minutes jusqu'à 18h
        this.reminderInterval = setInterval(() => {
            const now = new Date();
            const hour = now.getHours();

            // Arrêter après 18h
            if (hour >= 18) {
                console.log('🛑 Arrêt des rappels quotidiens (après 18h)');
                this.stopDailyReminders();
                return;
            }

            // Envoyer les rappels
            this.sendRemindersToAllUsers();
        }, 5 * 60 * 1000); // Toutes les 5 minutes
    }

    /**
     * Arrêter les rappels quotidiens
     */
    stopDailyReminders() {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval);
            this.reminderInterval = null;
        }
    }

    /**
     * Envoyer des rappels à tous les utilisateurs actifs
     */
    async sendRemindersToAllUsers() {
        try {
            const users = await User.find({
                isChatbotUser: true,
                lastVisitAt: {
                    $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Dernière visite dans les 7 derniers jours
                }
            });

            console.log(`📤 Envoi de rappels à ${users.length} utilisateurs`);

            // Obtenir un rappel aléatoire avec image
            const randomReminder = getRandomReminder();

            // Créer un rappel pour chaque utilisateur actif
            for (const user of users) {
                try {
                    const reminder = new Reminder({
                        userId: user._id.toString(), // Convertir en string
                        message: randomReminder.message,
                        imageUrl: randomReminder.imageUrl,
                        sent: false
                    });
                    await reminder.save();
                    console.log(`✅ Rappel créé pour ${user.name}`);
                } catch (error) {
                    console.error(`❌ Erreur création rappel pour ${user.name}:`, error.message);
                }
            }

            console.log(`💬 ${users.length} rappels créés avec message: ${randomReminder.message}`);

        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi des rappels:', error);
        }
    }

    /**
     * Arrêter le service
     */
    stop() {
        this.isRunning = false;
        this.stopDailyReminders();
        console.log('🛑 Service de rappels arrêté');
    }
}

module.exports = new ReminderService();


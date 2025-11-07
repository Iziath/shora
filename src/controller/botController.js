const Bot = require('../models/Bot');
const llmService = require('../services/llm_service');
const ttsService = require('../services/tts_service');
const path = require('path');

const voiceBot = async (req, res) => {
    try {
        console.log("Route '/voice-bot/' appelée");
        console.log(`\n=== NOUVELLE REQUÊTE ===\nUtilisateur: ${req.body.text}`);

        const bot_reply = await llmService.get_response(req.body.text);
        console.log(`🤖 Réponse brut du LLM : ${bot_reply}`);
        if (!bot_reply) {
            return res.status(500).json({ error: 'Erreur de génération de réponse.' });
        }

        const audio_filename = `response_${Date.now()}.mp3`;
        let audio_path;
        try {
            audio_path = await ttsService.generate_audio(bot_reply, audio_filename);
            if (!require('fs').existsSync(audio_path)) {
                console.warn('⚠️ Fichier audio non généré, continuons sans audio');
                audio_path = null;
            }
        } catch (ttsError) {
            console.error('⚠️ Erreur génération audio:', ttsError.message);
            audio_path = null; // Continuer sans audio
        }

        // Sauvegarder dans MongoDB (optionnel, ne pas bloquer si échec)
        try {
            const botMessage = new Bot({
                text_user: req.body.text,
                text_bot: bot_reply,
                audio_bot: audio_path ? `/audio/${audio_filename}` : null
            });
            await botMessage.save();
            console.log('✅ Message sauvegardé dans MongoDB');
        } catch (dbError) {
            console.warn('⚠️ Erreur sauvegarde MongoDB (non bloquant):', dbError.message);
            // Continuer même si la sauvegarde échoue
        }

        // Retourner la réponse même si la sauvegarde a échoué
        res.json({
            text_user: req.body.text,
            text_bot: bot_reply,
            audio_bot: audio_path ? `/audio/${audio_filename}` : null
        });
    } catch (error) {
        console.error(`\n!!! ERREUR CRITIQUE !!!`);
        console.error(`Message: ${error.message}`);
        console.error(`Stack: ${error.stack}`);
        console.error(`Erreur complète:`, error);
        res.status(500).json({ 
            error: 'Erreur interne du serveur.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getAudio = async (req, res) => {
    const audio_filename = req.params.audio_filename;
    const audio_path = path.join('audio_responses', audio_filename);

    if (require('fs').existsSync(audio_path)) {
        res.sendFile(audio_path, { root: '.' });
    } else {
        res.status(404).json({ error: 'Fichier audio non trouvé.' });
    }
};

module.exports = { voiceBot, getAudio };
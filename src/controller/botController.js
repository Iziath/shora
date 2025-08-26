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
        const audio_path = await ttsService.generate_audio(bot_reply, audio_filename);

        if (!require('fs').existsSync(audio_path)) {
            return res.status(500).json({ error: 'Erreur génération audio.' });
        }

        const botMessage = new Bot({
            text_user: req.body.text,
            text_bot: bot_reply,
            audio_bot: `/audio/${audio_filename}`
        });
        await botMessage.save();

        res.json({
            text_user: req.body.text,
            text_bot: bot_reply,
            audio_bot: `/audio/${audio_filename}`
        });
    } catch (error) {
        console.error(`\n!!! ERREUR CRITIQUE !!!\n${error.message}`);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
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
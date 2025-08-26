const axios = require('axios');
const {SYSTEM_PROMPT} = require('../config/prompts');

class LLMService {
    constructor() {
        this.systemPrompt = SYSTEM_PROMPT;
        this.ollama_url = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    }

    async get_response(user_input) {
        console.log(`🎤 MESSAGE_UTILISATEUR : ${user_input}`);
        const prompt = `${this.system_prompt}\nUtilisateur: ${user_input}\nAssistant:`;

        try {
        const response = await axios.post(this.ollama_url, {
            model: 'llama3.1',
            prompt,
            stream: false
        });
        return this._clean_response(response.data.response || '');
        } catch (error) {
        console.error(`Erreur lors de l'appel à Ollama : ${error.message}`);
        return 'Désolé, une erreur est survenue avec le modèle local.';
        }
    }

    _clean_response(raw_response){
        return raw_response.split('Assistant:').pop().trim();
    }
}

module.exports = new LLMService();

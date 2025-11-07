const axios = require('axios');
const {SYSTEM_PROMPT} = require('../config/prompts');

class LLMService {
    constructor() {
        this.systemPrompt = SYSTEM_PROMPT;
        this.ollama_url = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    }

    async get_response(user_input) {
        console.log(`🎤 MESSAGE_UTILISATEUR : ${user_input}`);
        const prompt = `${this.systemPrompt}\nUtilisateur: ${user_input}\nAssistant:`;

        try {
        const response = await axios.post(this.ollama_url, {
            model: 'llama3.1',
            prompt,
            stream: false
        }, {
            timeout: 30000 // Timeout de 30 secondes
        });
        return this._clean_response(response.data.response || '');
        } catch (error) {
        console.error(`Erreur lors de l'appel à Ollama : ${error.message}`);
        // Si Ollama n'est pas disponible, retourner une réponse de fallback intelligente
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.response?.status === 500) {
            // Réponses de fallback basées sur le message de l'utilisateur
            const lowerInput = user_input.toLowerCase().trim();
            
            if (lowerInput.includes('salut') || lowerInput.includes('bonjour') || lowerInput.includes('hello')) {
                return 'Bonjour ! 👋 Je suis SHORA, votre assistant de sécurité au travail. Comment puis-je vous aider aujourd\'hui ?';
            }
            if (lowerInput.includes('aide') || lowerInput.includes('help')) {
                return '🆘 Je peux vous aider avec :\n• Conseils de sécurité sur les chantiers\n• Informations sur les EPI (Équipements de Protection Individuelle)\n• Procédures d\'urgence\n• Signalement d\'incidents\n\nQue souhaitez-vous savoir ?';
            }
            if (lowerInput.includes('danger') || lowerInput.includes('incident') || lowerInput.includes('accident')) {
                return '🚨 Pour signaler un danger ou un incident, utilisez la commande *Danger* dans WhatsApp. Un superviseur sera alerté immédiatement.';
            }
            if (lowerInput.includes('epi') || lowerInput.includes('équipement') || lowerInput.includes('protection')) {
                return '🦺 Les EPI essentiels sur un chantier :\n• Casque de sécurité\n• Chaussures de sécurité\n• Gants de protection\n• Lunettes de protection\n• Vêtements de sécurité réfléchissants\n\nPortez toujours vos EPI !';
            }
            
            return 'Bonjour ! Je suis SHORA, votre assistant de sécurité. Je peux vous aider avec des conseils de sécurité, les EPI, les procédures d\'urgence, etc. Que souhaitez-vous savoir ?\n\n💡 Pour installer Ollama et activer l\'IA complète, consultez le guide d\'installation.';
        }
        return 'Désolé, une erreur est survenue. Je suis SHORA, votre assistant de sécurité. Comment puis-je vous aider ?';
        }
    }

    _clean_response(raw_response){
        return raw_response.split('Assistant:').pop().trim();
    }
}

module.exports = new LLMService();

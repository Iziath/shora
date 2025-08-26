const gTTS = require('node-gtts')('fr');
    const fs = require('fs');
    const path = require('path');

    class TTSService {
        constructor(output_dir = 'audio_responses') {
            this.output_dir = output_dir;
            if (!fs.existsSync(this.output_dir)) {
            fs.mkdirSync(this.output_dir, { recursive: true });
            }
        }

        generate_audio(text, filename) {
            const processed_text = this.clean_text(text);
            const full_path = path.join(this.output_dir, filename);

            return new Promise((resolve, reject) => {
            gTTS.save(full_path, processed_text, (err) => {
                if (err) {
                console.error(`Erreur génération audio : ${err.message}`);
                return reject(err);
                }
                resolve(full_path);
            });
            });
        }

        clean_text(text) {
            text = text.replace(/\*/g, '');
            text = text.replace(/\n+/g, '. ');
            text = text.replace(/(\s*-\s*|\s*\*\s*)/g, ', ');
            text = text.replace(/: /g, ', ');
            text = text.replace(/; /g, '. ');
            text = text.replace(/[?!]/g, '.');
            text = text.replace(/[»«’]/g, '');
            text = text.replace(/\s+(et|ou|donc)\s+/g, ' $1 ');
            text = text.replace(/\b(afin de|pour|en)\b/g, '$0,');

            let phrases = [];
            for (let phrase of text.split('. ')) {
            phrase = phrase.trim();
            if (phrase.split(' ').length > 15) {
                phrases.push(...this.split_french_sentence(phrase));
            } else {
                phrases.push(phrase);
            }
            }
            text = phrases.join('. ');

            text = text.split(' ').filter(Boolean).join(' ');
            if (!text.endsWith('.')) text += '.';
            return text;
        }

        split_french_sentence(sentence) {
            const split_points = [
            /\s+mais\s+/,
            /\s+car\s+/,
            /\s+donc\s+/,
            /\s+cependant\s+/,
            /,\s+(qui|que|dont)\s+/
            ];
            for (const pattern of split_points) {
            sentence = sentence.replace(pattern, (match) => `. ${match.trim()} `);
            }
            return sentence.split('. ').filter(s => s.trim());
        }
    }

module.exports = new TTSService();
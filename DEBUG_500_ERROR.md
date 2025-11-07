# 🐛 Débogage de l'erreur 500

## ❌ Erreur actuelle

```
POST http://localhost:3001/bot/voice-bot 500 (Internal Server Error)
```

## ✅ Corrections appliquées

1. **Correction de l'erreur de casse** : `this.system_prompt` → `this.systemPrompt`
2. **Amélioration de la gestion d'erreurs TTS** : Le chatbot continue même si l'audio échoue
3. **Timeout ajouté** pour les appels Ollama (30 secondes)

## 🔍 Vérifier les logs du serveur

**Regardez le terminal où `Quran_back` tourne** pour voir l'erreur exacte. Vous devriez voir :

```
!!! ERREUR CRITIQUE !!!
[message d'erreur détaillé]
```

## 🔧 Causes possibles et solutions

### 1. Ollama non installé/démarré

**Symptôme** : `ECONNREFUSED` ou `ETIMEDOUT` dans les logs

**Solution** :
- Installez Ollama : https://ollama.com/download/windows
- Téléchargez le modèle : `ollama pull llama3.1`
- Démarrez Ollama

**OU** désactivez temporairement Ollama dans `Quran_back/.env` :
```env
USE_OLLAMA=false
```

### 2. Erreur MongoDB

**Symptôme** : Erreur de connexion ou de sauvegarde dans les logs

**Solution** :
- Vérifiez que MongoDB est connecté
- Vérifiez l'URI dans `Quran_back/.env`

### 3. Erreur TTS (gTTS)

**Symptôme** : Erreur lors de la génération audio

**Solution** :
- Le chatbot devrait maintenant continuer sans audio
- Vérifiez que `node-gtts` est installé : `npm install node-gtts`

### 4. Erreur dans le modèle Bot

**Symptôme** : Erreur lors de `botMessage.save()`

**Solution** :
- Vérifiez que le modèle `Bot` est correctement défini
- Vérifiez la connexion MongoDB

## 🧪 Test après correction

1. **Redémarrez le serveur Quran_back**
2. **Envoyez un message** depuis le dashboard
3. **Vérifiez les logs** pour voir si l'erreur persiste

## 📝 Logs à vérifier

Dans le terminal de `Quran_back`, vous devriez voir :

```
Route '/voice-bot/' appelée
=== NOUVELLE REQUÊTE ===
Utilisateur: [votre message]
🎤 MESSAGE_UTILISATEUR : [votre message]
🤖 Réponse brut du LLM : [réponse]
```

Si vous voyez une erreur, copiez le message d'erreur complet.

# 🦙 Installation d'Ollama sur Windows

## ❌ Erreur actuelle

```
ollama : Le terme «ollama» n'est pas reconnu comme nom d'applet de commande
```

Cela signifie qu'Ollama n'est pas installé sur votre système Windows.

## ✅ Installation d'Ollama

### Option 1 : Installation via le site officiel (Recommandé)

1. **Téléchargez Ollama pour Windows**
   - Allez sur : https://ollama.com/download
   - Téléchargez le fichier d'installation pour Windows
   - Ou directement : https://ollama.com/download/windows

2. **Installez Ollama**
   - Exécutez le fichier téléchargé (`.exe`)
   - Suivez les instructions d'installation
   - Ollama sera installé et ajouté au PATH automatiquement

3. **Vérifiez l'installation**
   ```powershell
   ollama --version
   ```

4. **Téléchargez le modèle llama3.1**
   ```powershell
   ollama pull llama3.1
   ```
   ⚠️ **Attention** : Le téléchargement peut prendre plusieurs minutes (le modèle fait ~4.7 GB)

5. **Vérifiez que le modèle est installé**
   ```powershell
   ollama list
   ```

### Option 2 : Installation via winget (Windows Package Manager)

Si vous avez `winget` installé :

```powershell
winget install Ollama.Ollama
```

Puis redémarrez votre terminal et exécutez :
```powershell
ollama pull llama3.1
```

## 🚀 Démarrer Ollama

Après l'installation, Ollama devrait démarrer automatiquement. Sinon :

1. **Recherchez "Ollama"** dans le menu Démarrer
2. **Lancez l'application Ollama**
3. **Vérifiez que le service est actif** :
   ```powershell
   # Testez l'API
   curl http://localhost:11434/api/tags
   ```

## ⚙️ Configuration dans Quran_back

Une fois Ollama installé, vérifiez votre fichier `Quran_back/.env` :

```env
# Configuration Ollama
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.1
USE_OLLAMA=true

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quran-connect
PORT=3000
```

## 🧪 Test rapide

Testez que tout fonctionne :

```powershell
# 1. Vérifier qu'Ollama fonctionne
ollama run llama3.1 "Bonjour, comment ça va ?"

# 2. Vérifier l'API
curl http://localhost:11434/api/generate -d "{\"model\": \"llama3.1\", \"prompt\": \"Bonjour\"}"
```

## 📝 Alternative : Désactiver Ollama temporairement

Si vous ne voulez pas installer Ollama maintenant, vous pouvez désactiver le LLM dans `Quran_back/.env` :

```env
USE_OLLAMA=false
```

Le chatbot utilisera alors des réponses de fallback (moins intelligentes mais fonctionnelles).

## 🔍 Dépannage

### Ollama ne démarre pas
- Vérifiez que le service Ollama est en cours d'exécution dans le Gestionnaire des tâches
- Redémarrez Ollama depuis le menu Démarrer

### Le modèle ne se télécharge pas
- Vérifiez votre connexion Internet
- Le téléchargement peut prendre du temps (4.7 GB pour llama3.1)
- Utilisez un modèle plus petit pour tester : `ollama pull llama3.2:1b` (plus petit, ~1.3 GB)

### Port 11434 déjà utilisé
- Fermez les autres instances d'Ollama
- Ou changez le port dans `Quran_back/.env` : `OLLAMA_URL=http://localhost:11435/api/generate`


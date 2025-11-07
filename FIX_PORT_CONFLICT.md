# 🔧 Correction du conflit de ports

## ❌ Problème

Erreur 404 : `POST http://localhost:3000/bot/voice-bot 404 (Not Found)`

**Cause** : Les deux serveurs (backend SHORA et Quran_back) utilisent le port 3000. Le frontend appelle le mauvais serveur.

## ✅ Solution : Changer le port de Quran_back

### Étape 1 : Modifier Quran_back/.env

Ajoutez ou modifiez le port dans `Quran_back/.env` :

```env
# Port différent pour éviter le conflit
PORT=3001

# MongoDB (gardez la même URI)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shora-bot
```

### Étape 2 : Mettre à jour le frontend

Dans `shora_SH/.env` (ou `.env.local`), ajoutez :

```env
# URL de l'API Quran_back (chatbot)
VITE_QURAN_API_URL=http://localhost:3001
```

### Étape 3 : Redémarrer les serveurs

1. **Redémarrez Quran_back** (il utilisera maintenant le port 3001)
2. **Redémarrez le frontend** (pour charger la nouvelle variable d'environnement)

## 🧪 Vérification

1. **Vérifiez que Quran_back écoute sur 3001** :
   - Ouvrez `http://localhost:3001/` dans votre navigateur
   - Vous devriez voir : `{"message": "Bienvenu sur l'API QuranConnect"}`

2. **Testez la route du chatbot** :
   - Ouvrez `http://localhost:3001/bot/voice-bot` (devrait retourner une erreur de méthode, pas 404)

3. **Testez le chatbot dans le dashboard** :
   - Le frontend devrait maintenant appeler `http://localhost:3001/bot/voice-bot`

## 📝 Résumé des ports

- **Backend SHORA** : `http://localhost:3000` (pour les API SHORA)
- **Quran_back (chatbot)** : `http://localhost:3001` (pour le chatbot)
- **Frontend SHORA** : `http://localhost:5173` (ou autre port Vite)


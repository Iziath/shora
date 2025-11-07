# 🔧 Configuration des ports - Quran_back

## ❌ Problème actuel

Erreur 404 : `POST http://localhost:3000/bot/voice-bot 404 (Not Found)`

**Cause** : Conflit de ports entre le backend SHORA (port 3000) et Quran_back (port 3000).

## ✅ Solution : Utiliser un port différent

### Étape 1 : Changer le port de Quran_back

Dans `Quran_back/.env`, changez le port :

```env
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shora-bot
```

### Étape 2 : Configurer le frontend

Dans `shora_SH/.env` (ou créez-le), ajoutez :

```env
VITE_QURAN_API_URL=http://localhost:3001
```

### Étape 3 : Redémarrer

1. **Redémarrez Quran_back** (il utilisera le port 3001)
2. **Redémarrez le frontend** (pour charger la nouvelle variable)

## 🧪 Vérification

Testez dans votre navigateur :
- `http://localhost:3001/` → Devrait afficher `{"message": "Bienvenu sur l'API QuranConnect"}`
- `http://localhost:3000/` → Devrait être le backend SHORA


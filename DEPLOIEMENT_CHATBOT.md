# 🚀 Déploiement du Backend Chatbot (Quran_back)

## Option 1 : Railway (Recommandé - Gratuit)

### Étapes

1. **Créer un compte** : https://railway.app

2. **Dans votre projet Railway existant**, créez un **nouveau service** :
   - Cliquez sur "New Service" > "GitHub Repo"
   - Sélectionnez votre repository SHORA
   - **Root Directory** : `Quran_back`
   - **Build Command** : `npm install`
   - **Start Command** : `node index.js`

3. **Variables d'environnement** (Settings > Variables) :
```env
PORT=3001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shora-bot
NODE_ENV=production
# Ajoutez les autres variables nécessaires (JWT, etc.)
```

4. **Obtenir l'URL** :
   - Railway génère : `https://quran-backend.railway.app`
   - **Notez cette URL** pour `VITE_QURAN_API_URL` dans le frontend

---

## Option 2 : Render

### Étapes

1. **Créer un compte** : https://render.com

2. **Créer un nouveau Web Service** :
   - Connectez votre repository GitHub
   - **Root Directory** : `Quran_back`
   - **Build Command** : `npm install`
   - **Start Command** : `node index.js`

3. **Variables d'environnement** : Identiques à Railway

4. **Obtenir l'URL** :
   - Render génère : `https://quran-backend.onrender.com`

---

## ⚙️ Configuration MongoDB Atlas

1. **Utiliser le même cluster** que le backend SHORA (ou créer un nouveau)
2. **Obtenir l'URI** : `mongodb+srv://user:password@cluster.mongodb.net/shora-bot`
3. **Configurer l'accès réseau** : Ajoutez `0.0.0.0/0` pour Railway/Render
4. **Ajouter dans les variables d'environnement** : `MONGODB_URI`

---

## ✅ Vérification

1. **Test de santé** :
   ```bash
   curl https://quran-backend.railway.app/
   ```
   Devrait retourner : `{"message": "Bienvenu sur l'API QuranConnect"}`

2. **Vérifier les logs** :
   - Railway : Onglet "Deployments" > "View Logs"
   - Render : Onglet "Logs"
   - Vérifiez que MongoDB est connecté

3. **Tester le chatbot** :
   - Une fois le frontend déployé, testez le chatbot dans le dashboard
   - Vérifiez que les réponses fonctionnent

---

## 🔗 Configuration du Frontend

Une fois déployé, mettez à jour le frontend :

Dans Vercel/Netlify, ajoutez ou modifiez :
```
VITE_QURAN_API_URL=https://quran-backend.railway.app
```

Le frontend redéploie automatiquement.

---

## 📝 Variables d'Environnement Complètes

```env
# Port (différent du backend SHORA)
PORT=3001

# Base de données
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shora-bot

# Environnement
NODE_ENV=production

# Ajoutez les autres variables nécessaires selon votre configuration
# (JWT_SECRET, etc.)
```

---

## 🐛 Dépannage

### Erreur : "Cannot connect to MongoDB"
- Vérifiez l'URI MongoDB
- Vérifiez que l'accès réseau autorise Railway/Render
- Vérifiez les credentials MongoDB

### Erreur : "Port already in use"
- Vérifiez que le port est bien 3001 (différent du backend SHORA)
- Vérifiez les variables d'environnement

### Le chatbot ne répond pas
- Vérifiez les logs pour les erreurs
- Vérifiez que `VITE_QURAN_API_URL` est correct dans le frontend
- Testez l'API directement avec curl


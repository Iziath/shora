# 🔧 Configuration MongoDB pour Quran_back

## ❌ Erreur actuelle

```
Echec de connexion à la base de donnée mongodb: MongooseServerSelectionError: connect ECONNREFUSED
```

## ✅ Solution rapide

### Étape 1 : Créer le fichier `.env`

Créez un fichier `.env` dans le dossier `Quran_back/` avec ce contenu :

```env
# Utilisez la même URI MongoDB que votre backend SHORA
MONGODB_URI=mongodb://localhost:27017/shora-bot

# Port du serveur (changez si conflit avec SHORA)
PORT=3000
```

**OU** si vous voulez une base séparée :

```env
MONGODB_URI=mongodb://localhost:27017/quran-connect
PORT=3000
```

### Étape 2 : Vérifier que MongoDB est démarré

**Windows :**
```powershell
# Vérifier si MongoDB est en cours d'exécution
Get-Service MongoDB

# Si ce n'est pas le cas, démarrer MongoDB
net start MongoDB
```

**Linux/Mac :**
```bash
# Vérifier le statut
sudo systemctl status mongod

# Démarrer si nécessaire
sudo systemctl start mongod
```

### Étape 3 : Redémarrer le serveur

```bash
cd Quran_back
npm run dev
```

Vous devriez voir :
```
✅ Connexion à la base de donnée mongodb effectuée avec succès
✅ Serveur démarré sur http://localhost:3000
```

## 🔍 Vérification

1. **Vérifier MongoDB** : Ouvrez un terminal et tapez `mongosh` (ou `mongo` selon votre version)
2. **Tester l'API** : Ouvrez `http://localhost:3000/` dans votre navigateur, vous devriez voir `{"message": "Bienvenu sur l'API QuranConnect"}`

## ⚠️ Conflit de ports

Si le backend SHORA utilise aussi le port 3000, changez le port de `Quran_back` :

Dans `Quran_back/.env` :
```env
PORT=3001
```

Puis dans `shora_SH/.env` :
```env
VITE_QURAN_API_URL=http://localhost:3001
```


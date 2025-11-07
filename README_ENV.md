# Configuration de l'environnement - Quran_back

## Problème de connexion MongoDB

Si vous voyez l'erreur :
```
Echec de connexion à la base de donnée mongodb: MongooseServerSelectionError: connect ECONNREFUSED
```

## Solutions

### Option 1 : Utiliser la même base MongoDB que SHORA (Recommandé)

1. Créez un fichier `.env` dans `Quran_back/`
2. Copiez la même `MONGODB_URI` que celle de `backend/.env`

Exemple :
```env
MONGODB_URI=mongodb://localhost:27017/shora-bot
PORT=3000
```

### Option 2 : Utiliser une base MongoDB séparée

1. Créez un fichier `.env` dans `Quran_back/`
2. Utilisez une base de données différente :

```env
MONGODB_URI=mongodb://localhost:27017/quran-connect
PORT=3000
```

### Option 3 : Démarrer MongoDB

Si MongoDB n'est pas démarré :

**Windows :**
```bash
# Démarrer MongoDB (si installé comme service)
net start MongoDB

# Ou lancer manuellement
mongod
```

**Linux/Mac :**
```bash
sudo systemctl start mongod
# ou
sudo service mongod start
```

## Vérification

Après avoir créé le `.env`, redémarrez le serveur :
```bash
npm run dev
```

Vous devriez voir :
```
Connexion à la base de donnée mongodb effectuée avec succès
Serveur démarré sur http://localhost:3000
```


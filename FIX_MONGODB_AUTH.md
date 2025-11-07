# 🔐 Correction de l'erreur d'authentification MongoDB

## ❌ Erreur actuelle

```
MongoServerError: bad auth : Authentication failed.
codeName: 'AtlasError'
```

Cela signifie que les **identifiants MongoDB (username/password)** dans votre `.env` sont incorrects.

## ✅ Solutions

### Option 1 : Utiliser la même URI MongoDB que SHORA (Recommandé)

1. **Copiez l'URI MongoDB** de votre fichier `backend/.env`
2. **Collez-la** dans `Quran_back/.env`

Exemple :
```env
# Dans backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shora-bot

# Dans Quran_back/.env (copiez la même ligne)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shora-bot
PORT=3000
```

### Option 2 : Vérifier/corriger les identifiants MongoDB Atlas

Si vous utilisez MongoDB Atlas, vérifiez :

1. **Username** : Le nom d'utilisateur de votre base de données
2. **Password** : Le mot de passe (peut contenir des caractères spéciaux à encoder)
3. **Cluster** : L'URL de votre cluster (ex: `cluster0.xxxxx.mongodb.net`)

**Format correct :**
```env
MONGODB_URI=mongodb+srv://VOTRE_USERNAME:VOTRE_PASSWORD@cluster0.xxxxx.mongodb.net/quran-connect?retryWrites=true&w=majority
```

**⚠️ Important :** Si votre mot de passe contient des caractères spéciaux (`@`, `#`, `%`, etc.), vous devez les encoder en URL :
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- etc.

### Option 3 : Utiliser MongoDB local (si disponible)

Si vous avez MongoDB installé localement :

```env
MONGODB_URI=mongodb://localhost:27017/quran-connect
PORT=3000
```

**Puis démarrez MongoDB localement :**
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

## 🔍 Vérification

Après avoir corrigé le `.env`, redémarrez le serveur :

```bash
npm run dev
```

Vous devriez voir :
```
✅ Connexion à la base de donnée mongodb effectuée avec succès
✅ Serveur démarré sur http://localhost:3000
```

## 📝 Exemple de fichier `.env` complet

```env
# MongoDB Atlas (avec identifiants corrects)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/quran-connect?retryWrites=true&w=majority

# OU MongoDB local
# MONGODB_URI=mongodb://localhost:27017/quran-connect

PORT=3000
```


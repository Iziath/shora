# 🔐 Configuration MongoDB Atlas pour Quran_back

## ✅ Solution : Utiliser la même URI MongoDB que SHORA

Puisque vous utilisez MongoDB Atlas et que SHORA fonctionne déjà, **copiez simplement la même URI**.

### Étape 1 : Copier l'URI depuis backend/.env

1. Ouvrez le fichier `backend/.env`
2. Trouvez la ligne `MONGODB_URI=`
3. **Copiez toute la ligne** (elle ressemble à ça) :
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shora-bot?retryWrites=true&w=majority
   ```

### Étape 2 : Coller dans Quran_back/.env

1. Ouvrez le fichier `Quran_back/.env`
2. Remplacez la ligne `MONGODB_URI=` par celle que vous avez copiée
3. **Optionnel** : Changez le nom de la base si vous voulez une base séparée :
   - `shora-bot` → `quran-connect` (ou gardez `shora-bot` pour partager la même base)

### Exemple de fichier Quran_back/.env

```env
# Copiez la même URI que backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shora-bot?retryWrites=true&w=majority

# Port (changez si conflit avec SHORA)
PORT=3000
```

## 🔍 Vérification des identifiants

Si l'erreur persiste, vérifiez :

### 1. Username et Password corrects
- Le **username** doit correspondre à celui de votre utilisateur MongoDB Atlas
- Le **password** doit être le bon (attention aux majuscules/minuscules)

### 2. Encodage des caractères spéciaux

Si votre mot de passe contient des caractères spéciaux, encodez-les :

| Caractère | Encodage URL |
|-----------|--------------|
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |
| Espace | `%20` |

**Exemple :**
- Mot de passe : `Mon@Mot#DePasse`
- Encodé : `Mon%40Mot%23DePasse`
- URI : `mongodb+srv://username:Mon%40Mot%23DePasse@cluster0.xxxxx.mongodb.net/...`

### 3. Vérifier l'utilisateur dans MongoDB Atlas

1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Allez dans **Database Access**
3. Vérifiez que l'utilisateur existe et que le mot de passe est correct
4. Si nécessaire, créez un nouvel utilisateur ou réinitialisez le mot de passe

### 4. Vérifier l'IP autorisée

1. Dans MongoDB Atlas, allez dans **Network Access**
2. Vérifiez que votre IP est autorisée (ou utilisez `0.0.0.0/0` pour autoriser toutes les IPs en développement)

## 🚀 Après correction

1. Sauvegardez le fichier `.env`
2. Le serveur devrait redémarrer automatiquement (nodemon)
3. Vous devriez voir :
   ```
   ✅ Connexion à la base de donnée mongodb effectuée avec succès
   ✅ Serveur démarré sur http://localhost:3000
   ```

## 📝 Format complet de l'URI MongoDB Atlas

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

Où :
- `USERNAME` : Votre nom d'utilisateur MongoDB
- `PASSWORD` : Votre mot de passe (encodé si caractères spéciaux)
- `CLUSTER` : L'URL de votre cluster (ex: `cluster0.xxxxx`)
- `DATABASE_NAME` : Le nom de la base (ex: `shora-bot` ou `quran-connect`)


# 🛠️ ProductManager — Backend (Node.js)

API REST développée avec **Node.js**, **Express.js** et **MongoDB** via **Mongoose**. Elle gère l'authentification des utilisateurs et les opérations CRUD sur les produits.

---

## ⚙️ Stack technique

| Outil | Rôle |
|---|---|
| **Node.js** | Environnement d'exécution JavaScript |
| **Express.js** | Framework web pour créer l'API REST |
| **MongoDB** | Base de données NoSQL |
| **Mongoose** | ODM pour modéliser les données MongoDB |
| **JWT** | Authentification par token |
| **bcrypt** | Hashage des mots de passe |

---

## 📁 Structure du dossier

```
nodejs/
├── controllers/        # Logique métier (users, produits)
├── models/             # Schémas Mongoose (User, Produit)
├── routes/             # Définition des routes API
├── middleware/         # Vérification JWT, gestion erreurs
├── .env                # Variables d'environnement
├── package.json
└── server.js           # Point d'entrée de l'application
```

---

## ✨ Fonctionnalités API

### 🔐 Authentification (`/api/users`)

| Méthode | Route              | Description                                    |
| ------- | ------------------ | ---------------------------------------------- |
| `POST`  | `/api/users/`      | Inscription d'un nouvel utilisateur            |
| `POST`  | `/api/users/login` | Connexion et récupération du token JWT         |
| `GET`   | `/api/users/:id`   | Récupérer les infos d'un utilisateur (protégé) |

---

### 📦 Produits (`/api/produits`) – toutes routes protégées

| Méthode  | Route               | Description                  |
| -------- | ------------------- | ---------------------------- |
| `GET`    | `/api/produits`     | Lister tous les produits     |
| `GET`    | `/api/produits/:id` | Récupérer un produit par ID  |
| `POST`   | `/api/produits`     | Créer un nouveau produit     |
| `PUT`    | `/api/produits/:id` | Modifier un produit existant |
| `DELETE` | `/api/produits/:id` | Supprimer un produit         |

---

## 🚀 Installation et lancement

### 1. Accéder au dossier
```bash
cd nodejs
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du dossier `nodejs/` :
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/productmanager
JWT_SECRET=votre_secret_jwt
```

> 💡 Pour utiliser **MongoDB Atlas** (cloud), remplacez `MONGODB_URI` par votre chaîne de connexion Atlas.

### 4. Lancer le serveur

**Mode normal :**
```bash
npm start
```

**Mode développement (avec rechargement automatique) :**
```bash
npm run dev
```

Le serveur sera disponible sur : **http://localhost:5000**

---

## 🗄️ Modèles de données

### User
```json
{
  "name": "string",
  "email": "string",
  "password": "string (hashé)"
}
```

### Produit
```json
{
  "name": "string",
  "type": "string",
  "price": "number",
  "rating": "number",
  "warranty_years": "number",
  "available": "boolean"
}
```

---

## ⚠️ Prérequis

- Node.js v1.0.0+
- MongoDB installé localement **ou** un compte MongoDB Atlas
- npm
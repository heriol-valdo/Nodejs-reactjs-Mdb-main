# 📦 ProductManager

Application web fullstack de gestion de produits, permettant l'authentification des utilisateurs et la gestion complète d'un catalogue produits (CRUD).

---

## 🗂️ Structure du projet

```
ProductManager/
├── nodejs/         # Backend — API REST (Node.js + Express + MongoDB)
├── reactjs/        # Frontend — Interface utilisateur (React + Redux + MUI)
└── README.md       # Ce fichier
```

---

## ⚙️ Stack technique

| Couche | Technologies |
|---|---|
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Frontend** | React.js, Redux, Material UI (MUI), React Router |
| **Auth** | JWT (JSON Web Token) |
| **Base de données** | MongoDB |

---

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription d'un nouvel utilisateur
- Connexion avec email et mot de passe
- Protection des routes (JWT)
- Déconnexion

### 📦 Gestion des produits
- Lister tous les produits
- Ajouter un nouveau produit
- Modifier un produit existant
- Supprimer un produit

---

## 🚀 Lancer l'application

### Prérequis
- [Node.js](https://nodejs.org/) v1.0.0+
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)
- npm

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd ProductManager
```

### 2. Lancer le backend
```bash
cd nodejs
npm install
npm start
# API disponible sur http://localhost:5000
```

### 3. Lancer le frontend
```bash
cd reactjs
npm install
npm start
# Application disponible sur http://localhost:3000
```

> ⚠️ Assurez-vous que le backend est lancé **avant** le frontend.

---

## 📁 Documentation détaillée

- [📄 README Backend](./nodejs/README.md)
- [📄 README Frontend](./reactjs/README.md)

---

## 👤 Auteur

Projet développé avec Node.js, React.js et MongoDB.
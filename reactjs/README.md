# 🎨 ProductManager — Frontend (React.js)

Interface utilisateur développée avec **React.js**, **Redux** et **Material UI (MUI)**. Elle permet aux utilisateurs de s'authentifier et de gérer leur catalogue de produits via une interface moderne et responsive.

---

## ⚙️ Stack technique

| Outil | Rôle |
|---|---|
| **React.js** | Bibliothèque UI pour construire les composants |
| **Redux** | Gestion de l'état global de l'application |
| **React Router** | Navigation entre les pages |
| **Material UI (MUI)** | Composants UI et système de design |
| **Axios** | Requêtes HTTP vers l'API backend |
| **React Hot Toast** | Notifications utilisateur |

---

## 📁 Structure du dossier

```
reactjs/
├── public/
├── src/
│   ├── components/         # Composants React
│   │   ├── UserForm.jsx    # Formulaire d'inscription
│   │   ├── UserInfo.jsx    # Barre de navigation utilisateur
│   │   ├── LoginForm.jsx   # Formulaire de connexion
│   │   ├── ProduitForm.jsx # Formulaire ajout/modification produit
│   │   └── ProduitList.jsx # Liste des produits
│   ├── redux/
│   │   ├── actions/        # Actions Redux (user, produit)
│   │   ├── reducers/       # Reducers Redux
│   │   └── store.js        # Configuration du store Redux
│   ├── App.js              # Routes principales
│   └── index.js            # Point d'entrée
├── .env                    # Variables d'environnement
└── package.json
```

---

## ✨ Fonctionnalités

### 🔐 Authentification
| Page | Description |
|---|---|
| **Inscription** | Créer un compte avec nom, email et mot de passe |
| **Connexion** | Se connecter avec email et mot de passe |
| **Déconnexion** | Se déconnecter depuis la barre utilisateur |
| **Protection des routes** | Redirection automatique si non connecté |

### 📦 Gestion des produits
| Action | Description |
|---|---|
| **Lister** | Afficher tous les produits sous forme de cartes |
| **Ajouter** | Créer un nouveau produit via un formulaire |
| **Modifier** | Mettre à jour les informations d'un produit |
| **Supprimer** | Supprimer un produit avec confirmation |

---

## 🚀 Installation et lancement

### 1. Accéder au dossier
```bash
cd reactjs
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créer un fichier `.env` à la racine du dossier `reactjs/` :
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Lancer l'application
```bash
npm start
```

L'application sera disponible sur : **http://localhost:3000**

---

## 🗺️ Routes de l'application

| Route | Composant | Description |
|---|---|---|
| `/register` | `UserForm` | Page d'inscription |
| `/login` | `LoginForm` | Page de connexion |
| `/` | `ProduitList` | Liste des produits (protégée) |
| `/add/1` | `ProduitForm` | Ajouter un produit (protégée) |
| `/produit/:id/2` | `ProduitForm` | Modifier un produit (protégée) |

---

## 🎨 Design

L'interface utilise un thème **sombre personnalisé** :
- Fond principal : `linear-gradient(135deg, #0a0f2a, #141a3a)`
- Couleur principale : `#5f5fbd`
- Composants : Material UI avec styles overridés

---

## ⚠️ Prérequis

- Node.js v1.0.0+
- npm
- Le **backend doit être lancé** sur `http://localhost:5000` avant de démarrer le frontend
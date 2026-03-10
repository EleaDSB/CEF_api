# Port de Plaisance Russell — API

Application web de gestion des catways et réservations du port de plaisance Russell.

## Stack technique

- **Node.js / Express** — serveur web
- **MongoDB Atlas / Mongoose** — base de données
- **JWT + express-session** — authentification
- **EJS** — moteur de templates
- **Mocha + Chai** — tests unitaires

## Installation locale

```bash
git clone https://github.com/EleaDSB/CEF_api.git
cd CEF_api
npm install
cp .env.example .env
# Renseigner les variables dans .env
npm run dev
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `MONGODB_URI` | Chaîne de connexion MongoDB Atlas |
| `SESSION_SECRET` | Secret pour les sessions Express |
| `JWT_SECRET` | Secret pour la signature des JWT |
| `PORT` | Port du serveur (défaut : 3000) |

## Scripts

```bash
npm start    # Démarrage (lance les tests puis le serveur)
npm run dev  # Développement avec rechargement automatique
npm test     # Tests unitaires Mocha
```

## Fonctionnalités

- Authentification sécurisée (JWT en session)
- CRUD complet sur les catways
- CRUD complet sur les réservations
- Gestion des comptes utilisateurs
- 9 tests unitaires Mocha
- Documentation API intégrée

## Compte de démonstration

- **Email :** admin@portrussell.fr
- **Mot de passe :** Admin1234

## Application hébergée

🔗 [https://cefapi-production.up.railway.app](https://cefapi-production.up.railway.app)

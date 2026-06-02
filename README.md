# E-Learning Platform avec Intégration Zoom

Une plateforme complète d'enseignement à distance avec intégration Zoom et gestion de cours.

## 📋 Structure du Projet

```
e-learning-platform/
├── frontend/              # Application Next.js
├── backend/               # API Express.js
├── docker-compose.yml     # Configuration Docker
└── README.md
```

## 🚀 Quick Start

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Zoom avec API credentials

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/taiebkoutkout-ui/e-learning-platform.git
cd e-learning-platform
```

2. **Installer les dépendances**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configuration des variables d'environnement**

Créer `.env.local` dans le dossier `backend/`:
```env
# Zoom API
ZOOM_CLIENT_ID=votre_client_id
ZOOM_CLIENT_SECRET=votre_client_secret
ZOOM_REDIRECT_URI=http://localhost:3001/api/auth/zoom/callback

# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/elearning

# JWT
JWT_SECRET=votre_secret_jwt

# Server
PORT=3001
NODE_ENV=development
```

4. **Lancer le développement**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 📚 Structure des Dossiers

### Frontend (`/frontend`)
- `src/app/` - Pages Next.js
- `src/components/` - Composants React
- `src/lib/` - Utilitaires et API clients
- `src/hooks/` - Hooks personnalisés
- `src/types/` - Types TypeScript

### Backend (`/backend`)
- `src/routes/` - Routes API
- `src/controllers/` - Logique métier
- `src/services/` - Services externes (Zoom, BD, etc.)
- `src/middleware/` - Middlewares
- `src/types/` - Types TypeScript

## 🔧 API Endpoints Principaux

### Authentication
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/zoom` - Redirection OAuth Zoom
- `GET /api/auth/zoom/callback` - Callback OAuth

### Courses
- `GET /api/courses` - Lister les cours
- `POST /api/courses` - Créer un cours (prof)
- `GET /api/courses/:id` - Détails d'un cours
- `PUT /api/courses/:id` - Modifier un cours

### Meetings
- `POST /api/meetings` - Créer une réunion Zoom
- `GET /api/meetings/:id` - Détails d'une réunion
- `GET /api/meetings/:id/join-url` - Obtenir le lien de rejoindre

## 🔐 Intégration Zoom

Voir [ZOOM_SETUP.md](./ZOOM_SETUP.md) pour les instructions détaillées.

## 📦 Technologies

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching)

### Backend
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Axios (HTTP client)

## 📝 Licence

MIT

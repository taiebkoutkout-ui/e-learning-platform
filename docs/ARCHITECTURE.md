# Architecture E-Learning Platform

## Aperçu

La plateforme utilise une architecture client-serveur moderne avec séparation des préoccupations.

```
┌─────────────────────────┐
│   Frontend (Next.js)    │
│   - UI/UX               │
│   - État local          │
│   - API client          │
└────────────┬────────────┘
             │ HTTPS
             ▼
┌─────────────────────────┐
│  Backend (Express)      │
│  - Authentification      │
│  - Logique métier       │
│  - Intégration Zoom     │
└────────────┬────────────┘
             │ REST API
             ▼
┌─────────────────────────┐
│  Services externes      │
│  - Zoom API             │
│  - PostgreSQL           │
│  - Storage (S3, etc)    │
└─────────────────────────┘
```

## Composants Clés

### Frontend
- **Next.js 14**: Framework React moderne avec SSR
- **TypeScript**: Typage statique
- **Zustand**: Gestion d'état légère
- **React Query**: Synchronisation données serveur
- **Tailwind CSS**: Styling moderne

### Backend
- **Express.js**: Framework web léger
- **TypeScript**: Typage statique
- **Prisma**: ORM moderne
- **PostgreSQL**: Base de données relationnelle
- **JWT**: Authentification stateless

### Services Externes
- **Zoom API**: Vidéoconférence
- **AWS S3** (optionnel): Stockage fichiers
- **SendGrid** (optionnel): Emails

## Flux de Données

### Authentification

1. User remplit formulaire login
2. Frontend POST à `/api/auth/login`
3. Backend valide credentials + génère JWT
4. Frontend stocke JWT en localStorage
5. Tous les requêtes suivantes incluent le JWT

### Création d'un Cours

1. Professeur crée cours via formulaire
2. Frontend POST à `/api/courses`
3. Backend valide (user est prof) + stocke en BD
4. Retour du cours créé au frontend
5. UI mise à jour

### Création d'une Réunion Zoom

1. Professeur crée réunion pour un cours
2. Frontend POST à `/api/meetings`
3. Backend appelle Zoom API pour créer réunion
4. Zoom retourne meeting ID + join URL
5. Backend stocke en BD
6. Frontend affiche lien de rejoindre

## Sécurité

- JWT pour authentification
- HTTPS en production
- CORS configuré
- Input validation côté backend
- Mot de passe hashedPassword avec bcrypt
- Rate limiting (à implémenter)
- SQL injection prevention avec Prisma

## Scalabilité

- Base de données relationnelle
- API stateless (pas de session)
- Cache possible avec Redis
- Déploiement possible sur Docker/K8s

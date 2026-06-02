# API Reference

## Base URL
```
http://localhost:3001/api
```

## Authentication

Tous les endpoints sauf `/auth/*` nécessitent un JWT token.

```
Authorization: Bearer {token}
```

## Auth Endpoints

### Register
```
POST /auth/register

Body:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "student" | "professor"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

### Login
```
POST /auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token",
  "user": {...}
}
```

## Courses Endpoints

### List Courses
```
GET /courses

Response:
[
  {
    "id": "course_id",
    "title": "JavaScript Avancé",
    "description": "Cours sur JavaScript avancé",
    "instructorId": "prof_id",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get Course
```
GET /courses/:id

Response:
{
  "id": "course_id",
  "title": "JavaScript Avancé",
  "description": "Cours sur JavaScript avancé",
  "instructorId": "prof_id",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Create Course (Professor Only)
```
POST /courses

Body:
{
  "title": "Python Basics",
  "description": "Introduction à Python"
}

Response:
{
  "id": "course_id",
  "title": "Python Basics",
  "description": "Introduction à Python",
  "instructorId": "prof_id",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Update Course
```
PUT /courses/:id

Body:
{
  "title": "Python Basics - Updated",
  "description": "Updated description"
}

Response:
{
  "id": "course_id",
  "title": "Python Basics - Updated",
  "description": "Updated description",
  "instructorId": "prof_id",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

### Delete Course
```
DELETE /courses/:id

Response:
{
  "message": "Cours supprimé"
}
```

## Meetings Endpoints

### List Meetings
```
GET /meetings

Response:
[
  {
    "id": "meeting_id",
    "courseId": "course_id",
    "topic": "Cours en direct",
    "startTime": "2024-01-15T14:00:00Z",
    "duration": 60,
    "zoomMeetingId": "123456789",
    "joinUrl": "https://zoom.us/j/123456789",
    "status": "upcoming"
  }
]
```

### Get Meeting
```
GET /meetings/:id

Response:
{
  "id": "meeting_id",
  "courseId": "course_id",
  "topic": "Cours en direct",
  "startTime": "2024-01-15T14:00:00Z",
  "duration": 60,
  "zoomMeetingId": "123456789",
  "joinUrl": "https://zoom.us/j/123456789",
  "status": "upcoming"
}
```

### Create Meeting (Professor Only)
```
POST /meetings

Body:
{
  "courseId": "course_id",
  "topic": "Cours en direct - JavaScript",
  "startTime": "2024-01-15T14:00:00Z",
  "duration": 90
}

Response:
{
  "id": "meeting_id",
  "courseId": "course_id",
  "topic": "Cours en direct - JavaScript",
  "startTime": "2024-01-15T14:00:00Z",
  "duration": 90,
  "zoomMeetingId": "123456789",
  "joinUrl": "https://zoom.us/j/123456789",
  "status": "upcoming"
}
```

### Get Join URL
```
GET /meetings/:id/join-url

Response:
{
  "joinUrl": "https://zoom.us/j/123456789"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Données invalides"
}
```

### 401 Unauthorized
```json
{
  "message": "Token manquant ou invalide"
}
```

### 403 Forbidden
```json
{
  "message": "Accès refusé"
}
```

### 404 Not Found
```json
{
  "message": "Ressource non trouvée"
}
```

### 500 Server Error
```json
{
  "message": "Erreur interne du serveur"
}
```

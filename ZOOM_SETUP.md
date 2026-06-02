# Configuration Zoom API

## 1. Créer une Application Zoom

### Étapes:
1. Visitez [Zoom App Marketplace](https://marketplace.zoom.us/)
2. Cliquez sur "Develop" → "Build App"
3. Sélectionnez "OAuth App"
4. Remplissez les informations:
   - **App Name**: E-Learning Platform
   - **Company**: Votre entreprise
   - **Developer Contact Name**: Votre nom

### Récupérez vos Credentials:
- Client ID
- Client Secret
- Redirect URLs: `http://localhost:3001/api/auth/zoom/callback`

## 2. Ajouter les Scopes Requis

Dans les settings de l'app, ajoutez les scopes:
```
meetings:write
meetings:read
users:read
recording:write
recording:read
```

## 3. Configuration Locale

Créez `.env.local` dans `/backend`:

```env
ZOOM_CLIENT_ID=xxxxxxxxxxxxx
ZOOM_CLIENT_SECRET=xxxxxxxxxxxxx
ZOOM_REDIRECT_URI=http://localhost:3001/api/auth/zoom/callback
```

## 4. Flux OAuth

### Diagramme de flux:

```
User → Click "Connect Zoom" 
    ↓
Frontend redirects to: https://zoom.us/oauth/authorize?client_id=xxx&redirect_uri=xxx
    ↓
User autorise l'app dans Zoom
    ↓
Zoom redirects back to: http://localhost:3001/api/auth/zoom/callback?code=xxx
    ↓
Backend exchanges code for access_token
    ↓
Backend stores token in database
    ↓
User is logged in! ✓
```

## 5. Créer une Réunion Zoom

```javascript
const zoomService = require('./services/zoomService');

const meeting = await zoomService.createMeeting({
  userId: 'me',
  topic: 'Cours de JavaScript',
  type: 2,
  start_time: '2024-06-15T14:00:00Z',
  duration: 60,
  password: '123456',
  settings: {
    host_video: true,
    participant_video: true,
    join_before_host: false,
    meeting_authentication: true
  }
});

console.log('Join URL:', meeting.join_url);
```

## Ressources

- [Zoom API Docs](https://marketplace.zoom.us/docs/api-reference/zoom-api/)
- [OAuth Guide](https://marketplace.zoom.us/docs/guides/auth/oauth)
- [Web SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web/)

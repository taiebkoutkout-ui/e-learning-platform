import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: (email: string, password: string, name: string, role: string) =>
    apiClient.post('/api/auth/register', { email, password, name, role }),
  login: (email: string, password: string) =>
    apiClient.post('/api/auth/login', { email, password }),
  getProfile: () => apiClient.get('/api/auth/profile'),
};

// Courses API
export const coursesApi = {
  getAll: () => apiClient.get('/api/courses'),
  getById: (id: string) => apiClient.get(`/api/courses/${id}`),
  create: (data: any) => apiClient.post('/api/courses', data),
  update: (id: string, data: any) => apiClient.put(`/api/courses/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/courses/${id}`),
};

// Meetings API
export const meetingsApi = {
  getAll: () => apiClient.get('/api/meetings'),
  getById: (id: string) => apiClient.get(`/api/meetings/${id}`),
  create: (data: any) => apiClient.post('/api/meetings', data),
  getJoinUrl: (id: string) => apiClient.get(`/api/meetings/${id}/join-url`),
};

export default apiClient;

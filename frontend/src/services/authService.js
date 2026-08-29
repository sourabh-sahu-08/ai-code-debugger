import { api } from '../lib/api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, username, email, password) => api.post('/auth/register', { name, username, email, password }),
  getMe: () => api.get('/auth/me'),
};

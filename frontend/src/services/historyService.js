import { api } from '../lib/api';

export const historyService = {
  getHistory: () => api.get('/history'),
  saveSession: (data) => api.post('/history', data),
};

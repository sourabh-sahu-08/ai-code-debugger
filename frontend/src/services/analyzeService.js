import { api } from '../lib/api';

export const analyzeService = {
  analyzeCode: (code, language, mode = 'quick-fix') => api.post('/analyze', { code, language, mode }),
};

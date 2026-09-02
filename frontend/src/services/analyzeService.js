import { api } from '../lib/api';

export const analyzeService = {
  analyzeCode: (code, language, mode = 'quick-fix', prompt = '') => api.post('/analyze', { code, language, mode, prompt }),
};

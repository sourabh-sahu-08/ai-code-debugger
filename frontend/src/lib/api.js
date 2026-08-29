const API_BASE_URL = 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const api = {
  async fetch(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized globally if needed (e.g. clear token)
        if (response.status === 401) {
          localStorage.removeItem('token');
          // Dispatch a custom event to force redirect if not already on login page
          window.dispatchEvent(new Event('unauthorized'));
        }
        throw new ApiError(data.error || data.message || 'API Error', response.status);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      // Network errors
      throw new ApiError('Network error. Please try again later.', 0);
    }
  },

  get(endpoint, options) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, body, options) {
    return this.fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put(endpoint, body, options) {
    return this.fetch(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  delete(endpoint, options) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  },
};

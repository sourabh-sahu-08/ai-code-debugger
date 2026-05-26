import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Automatically inject JWT tokens into headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept session 401 expirations
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Forward viewport to login with session expired flag
      if (!window.location.pathname.startsWith("/auth/")) {
        window.location.href = "/auth/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
  updateDetails: (data) => API.put("/auth/update", data),
  updatePassword: (data) => API.put("/auth/updatepassword", data)
};

export const analysisService = {
  analyze: (data) => API.post("/analyze", data),
  getHistory: () => API.get("/history"),
  getAnalysisById: (id) => API.get(`/analyze/${id}`),
  deleteAnalysis: (id) => API.delete(`/analyze/${id}`),
  togglePublic: (id) => API.put(`/analyze/${id}/toggle-public`),
  addComment: (id, text) => API.post(`/analyze/${id}/comment`, { text }),
  deleteComment: (id, commentId) => API.delete(`/analyze/${id}/comment/${commentId}`),
  chat: (id, message) => API.post(`/analyze/${id}/chat`, { message }),
  getPublic: (id) => API.get(`/analyze/public/${id}`)
};

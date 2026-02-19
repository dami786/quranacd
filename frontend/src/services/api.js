import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (config.data instanceof FormData) delete config.headers['Content-Type'];
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRequest = err.config?.url?.includes('/auth/login') || err.config?.url?.includes('/auth/register');
    if (err.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('isSuperAdmin');
      localStorage.removeItem('hasInquiry');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Auth
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile');
export const requestPasswordReset = (email) => api.post('/auth/forgot-password', { email });
export const resetPasswordWithCode = (data) => api.post('/auth/reset-password', data);

// Items (courses) - createItem/updateItem accept FormData (with optional image file) or plain object
export const getItems = () => api.get('/items');
export const getItemById = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/items/${id}`);

// Trials / Free trial & query submissions (POST public, GET superadmin)
export const submitTrial = (data) => api.post('/trials', data);
export const getTrials = () => api.get('/trials');
export const getMyTrial = () => api.get('/trials/me');
export const updateTrialStatus = (id, status) => api.patch(`/trials/${id}`, { status });
export const deleteTrial = (id) => api.delete(`/trials/${id}`);

// Donations (POST public, GET superadmin)
export const submitDonation = (data) => api.post('/donations', data);
export const getDonations = () => api.get('/donations');

// Resolve course image URL (uploaded files are at /uploads/...)
export const getImageUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '') || '';
  return base ? `${base}${image.startsWith('/') ? '' : '/'}${image}` : image;
};

export default api;

import axios from 'axios';

// Saari APIs .env ki VITE_API_URL pe
const API_BASE = import.meta.env.VITE_API_URL || 'https://quranacd-production-ddd5.up.railway.app/api';

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
    const isAuthRequest = err.config?.url?.includes('/auth/login') || err.config?.url?.includes('/auth/register') || err.config?.url?.includes('/auth/update-password');
    if (err.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('isSuperAdmin');
      localStorage.removeItem('userRole');
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
export const requestPasswordReset = (email) => api.post('/auth/forgot-password', { email }, { timeout: 15000 });
export const resetPasswordWithCode = (data) => api.post('/auth/reset-password', data);
export const changePassword = (data) => api.post('/auth/update-password', data);
export const getUsers = () => api.get('/auth/users');
export const updateUserRole = (id, role) => api.patch(`/auth/users/${id}/role`, { role });

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
  const base = API_BASE.replace(/\/api\/?$/, '');
  return base ? `${base}${image.startsWith('/') ? '' : '/'}${image}` : image;
};

/** Course image: local /images/ as-is; API upload getImageUrl; fail pe frontend default use karo */
const DEFAULT_COURSE_IMAGE = '/images/image.png';
export const getCourseImageUrl = (item) => {
  const title = item?.title || item?.titleEn || '';
  if (item?.image) {
    if (item.image.startsWith('http') || item.image.startsWith('/images/')) return item.image;
    return getImageUrl(item.image);
  }
  if (!title) return DEFAULT_COURSE_IMAGE;
  return `/images/${encodeURIComponent(title)}.png`;
};
export const getDefaultCourseImage = () => DEFAULT_COURSE_IMAGE;

export default api;

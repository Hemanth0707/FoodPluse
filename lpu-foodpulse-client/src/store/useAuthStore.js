import { create } from 'zustand';
import axios from 'axios';

axios.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'true';

const API_URL = 'https://lpufoodpulse-api.loca.lt/api/auth';

// Safely parse LocalStorage to prevent crashes if data is corrupted
const getSafeUser = () => {
  try {
    const userStr = localStorage.getItem('foodpulse_user');
    if (!userStr || userStr === 'undefined') return null;
    return JSON.parse(userStr);
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    localStorage.removeItem('foodpulse_user');
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: getSafeUser(),
  token: localStorage.getItem('foodpulse_token') || null,
  isAuthenticated: !!localStorage.getItem('foodpulse_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/login`, 
        { identifier: email, password },
        { headers: { 'Bypass-Tunnel-Reminder': 'true' } }
      );
      if (res.data && res.data.success && res.data.user) {
        localStorage.setItem('foodpulse_token', res.data.token);
        localStorage.setItem('foodpulse_user', JSON.stringify(res.data.user));
        set({ 
          user: res.data.user, 
          token: res.data.token, 
          isAuthenticated: true, 
          loading: false 
        });
        return true;
      } else {
        throw new Error('Invalid response payload');
      }
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message || 'Login failed', 
        loading: false 
      });
      return false;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      if (res.data && res.data.success && res.data.user) {
        localStorage.setItem('foodpulse_token', res.data.token);
        localStorage.setItem('foodpulse_user', JSON.stringify(res.data.user));
        set({ 
          user: res.data.user, 
          token: res.data.token, 
          isAuthenticated: true, 
          loading: false 
        });
        return true;
      } else {
        throw new Error('Invalid response payload');
      }
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message || 'Registration failed', 
        loading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('foodpulse_token');
    localStorage.removeItem('foodpulse_user');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;

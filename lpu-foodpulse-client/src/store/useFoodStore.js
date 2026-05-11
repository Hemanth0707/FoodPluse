import { create } from 'zustand';
import axios from 'axios';

axios.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'true';

const API_URL = import.meta.env.VITE_API_URL || 'https://lpu-foodpulse-api.onrender.com/api';

const useFoodStore = create((set) => ({
  complaints: [],
  stalls: [],
  orders: [],
  walletPoints: 500, // Demo starting points
  loading: false,

  fetchStalls: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/stalls`);
      set({ stalls: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchOrders: async (studentId, token) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/orders/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ orders: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchVendorComplaints: async (stallId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/complaints?stallId=${stallId}`);
      set({ complaints: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  updateComplaintStatus: async (complaintId, status) => {
    try {
      const res = await axios.put(`${API_URL}/complaints/${complaintId}/status`, { status });
      set((state) => ({
        complaints: state.complaints.map(c => c._id === complaintId ? res.data : c)
      }));
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  uploadProof: async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.url;
    } catch (err) {
      console.error('Upload Error:', err);
      return null;
    }
  },

  submitComplaint: async (complaintData, token) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_URL}/complaints/submit`, complaintData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        set((state) => ({ complaints: [res.data.complaint, ...state.complaints], loading: false }));
        return res.data;
      } else {
        set({ loading: false });
        return res.data;
      }
    } catch (err) {
      console.error('[DEBUG ERROR] submitComplaint failed:', err);
      set({ loading: false });
      return { 
        success: false, 
        status: "Rejected",
        reason: err.response?.data?.reason || err.message || 'Submission failed' 
      };
    }
  },

  placeOrder: async (orderData, token) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({ 
        orders: [res.data, ...state.orders], 
        walletPoints: state.walletPoints - orderData.totalPoints,
        loading: false 
      }));
      return res.data;
    } catch (err) {
      console.error(err);
      set({ loading: false });
      return null;
    }
  }
}));

export default useFoodStore;

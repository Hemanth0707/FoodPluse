import { create } from 'zustand';
import axios from 'axios';

axios.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'true';

const API_URL = import.meta.env.VITE_API_URL || 'https://lpu-foodpulse-api.onrender.com/api';

const DEFAULT_MOCK_STALLS = [
  {
    _id: "stall1",
    name: "Central Mess",
    location: "Block 25 Food Court",
    rating: 4.8,
    isOpen: true,
    menuItems: [
      { _id: "item1", name: 'Veg Burger', pointsCost: 90, rating: 4.5, category: 'Fast Food', description: 'Fresh veggie patty burger with cheese slice.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', emoji: '🍔' },
      { _id: "item2", name: 'Cheese Pasta', pointsCost: 150, rating: 4.8, category: 'Meals', description: 'Delicious hot penne cheese pasta.', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80', emoji: '🍝' },
      { _id: "item3", name: 'Garlic Bread', pointsCost: 80, rating: 4.6, category: 'Snacks', description: 'Crispy toasted garlic bread slices.', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=500&q=80', emoji: '🍞' },
      { _id: "item4", name: 'Veg Pizza', pointsCost: 200, rating: 4.8, category: 'Fast Food', description: 'Freshly baked veg pizza with mozzarella cheese.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', emoji: '🍕' }
    ]
  },
  {
    _id: "stall2",
    name: "Boys Hostel Mess 1",
    location: "Block 28 Food Court",
    rating: 4.9,
    isOpen: true,
    menuItems: [
      { _id: "item5", name: 'Masala Dosa', pointsCost: 80, rating: 4.9, category: 'Meals', description: 'South Indian style crispy rice crepe with potato filling.', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=500&q=80', emoji: '🍛' },
      { _id: "item6", name: 'Idli', pointsCost: 40, rating: 4.8, category: 'Breakfast', description: 'Steamed fluffy rice cakes served with sambar.', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80', emoji: '⚪' }
    ]
  },
  {
    _id: "stall3",
    name: "Girls Hostel Mess",
    location: "Uni Mall",
    rating: 4.9,
    isOpen: true,
    menuItems: [
      { _id: "item7", name: 'Oats Bowl', pointsCost: 90, rating: 4.7, category: 'Healthy', description: 'Nutritious oats bowl with fresh fruits.', image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500&q=80', emoji: '🥣' },
      { _id: "item8", name: 'Paneer Salad', pointsCost: 130, rating: 4.9, category: 'Healthy', description: 'Fresh paneer chunks toss with green vegetables.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80', emoji: '🥗' }
    ]
  },
  {
    _id: "stall4",
    name: "Uni Mall Mess",
    location: "Block 34",
    rating: 4.6,
    isOpen: true,
    menuItems: [
      { _id: "item9", name: 'Fresh Juice', pointsCost: 60, rating: 4.7, category: 'Beverages', description: 'Real fresh squeezed juice.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80', emoji: '🥤' },
      { _id: "item10", name: 'Cold Coffee', pointsCost: 80, rating: 4.9, category: 'Beverages', description: 'Chilled rich coffee shake.', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80', emoji: '☕' }
    ]
  }
];

const useFoodStore = create((set) => ({
  complaints: [],
  stalls: DEFAULT_MOCK_STALLS,
  orders: [],
  walletPoints: 500, // Demo starting points
  loading: false,

  fetchStalls: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/stalls`);
      if (res.data && res.data.length > 0) {
        set({ stalls: res.data, loading: false });
      } else {
        set({ stalls: DEFAULT_MOCK_STALLS, loading: false });
      }
    } catch (err) {
      console.error("fetchStalls failed, falling back to mock stalls:", err);
      set({ stalls: DEFAULT_MOCK_STALLS, loading: false });
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

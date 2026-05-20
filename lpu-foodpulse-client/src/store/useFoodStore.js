import { create } from 'zustand';
import axios from 'axios';

axios.defaults.headers.common['Bypass-Tunnel-Reminder'] = 'true';

const API_URL = import.meta.env.VITE_API_URL || 'https://lpu-foodpulse-api.onrender.com/api';

const DEFAULT_MOCK_STALLS = [
  {
    _id: "stall1",
    name: "Nescafe Stall",
    location: "Block 34",
    rating: 4.8,
    isOpen: true,
    menuItems: [
      { _id: "item1", name: "Hazelnut Frappe", pointsCost: 95, rating: 4.8, category: "Beverages", description: "Premium chilled hazelnut frappe topped with dark chocolate drizzle.", emoji: "🥤" },
      { _id: "item2", name: "Choco Chip Cookie", pointsCost: 40, rating: 4.5, category: "Snacks", description: "Warm fresh-baked cookie loaded with premium milk chocolate chips.", emoji: "🍪" }
    ]
  },
  {
    _id: "stall2",
    name: "Burgers & Co",
    location: "Block 14",
    rating: 4.7,
    isOpen: true,
    menuItems: [
      { _id: "item3", name: "Cheese Burst Burger", pointsCost: 120, rating: 4.7, category: "Fast Food", description: "Juicy vegetable patty with overflowing liquid cheese block.", emoji: "🍔" },
      { _id: "item4", name: "Crispy French Fries", pointsCost: 60, rating: 4.4, category: "Snacks", description: "Crisp golden salted potato fries with chipotle dipping sauce.", emoji: "🍟" }
    ]
  },
  {
    _id: "stall3",
    name: "Chinatown Express",
    location: "Mess 2 Basement",
    rating: 4.6,
    isOpen: true,
    menuItems: [
      { _id: "item5", name: "Veg Hakka Noodles", pointsCost: 110, rating: 4.6, category: "Meals", description: "Wok-tossed noodles with colorful crisp garden veggies.", emoji: "🍜" },
      { _id: "item6", name: "Steamed Veg Momo", pointsCost: 80, rating: 4.5, category: "Snacks", description: "Fluffy hand-wrapped steamed momos filled with seasoned mixed cabbage.", emoji: "🥟" }
    ]
  },
  {
    _id: "stall4",
    name: "Punjabi Rasoi",
    location: "Block 36 Food Court",
    rating: 4.9,
    isOpen: true,
    menuItems: [
      { _id: "item7", name: "Paneer Butter Masala", pointsCost: 150, rating: 4.9, category: "Meals", description: "Creamy paneer cubes in buttery spiced tomato gravy served with roomali roti.", emoji: "🍛" },
      { _id: "item8", name: "Special Veg Thali", pointsCost: 180, rating: 4.7, category: "Meals", description: "Traditional campus thali with daal makhani, paneer, raita, rice & hot butter naan.", emoji: "🍱" }
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

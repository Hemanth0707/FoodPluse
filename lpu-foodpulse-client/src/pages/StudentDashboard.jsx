import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Upload, CheckCircle, Wallet, Store, ChevronRight, ShoppingBag, Clock, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import OrderModal from '../components/OrderModal';
import OrderSuccessModal from '../components/OrderSuccessModal';

const API_URL = 'http://localhost:5000/api';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('complaint');
  const [foodPoints, setFoodPoints] = useState(1200);
  const [studentId, setStudentId] = useState('');
  
  // Stalls state
  const [stalls, setStalls] = useState([]);
  const [selectedStall, setSelectedStall] = useState(null);
  const [menu, setMenu] = useState([]);
  
  // Complaint state
  const [complaintForm, setComplaintForm] = useState({
    hostel: 'BH1', mess: 'Breakfast', issueType: 'Bad taste', description: ''
  });

  // Order Flow State
  const [orderingItem, setOrderingItem] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [activeTracker, setActiveTracker] = useState(null);

  const fetchStalls = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/stalls`);
      setStalls(res.data);
    } catch (err) {
      console.error('Failed to fetch stalls', err);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTimeout(() => {
        setFoodPoints(user.foodPoints || 1200);
        setStudentId(user._id);
      }, 0);
    }
    fetchStalls();
  }, [fetchStalls]);

  // Stall Side Simulation (auto update tracker)
  useEffect(() => {
    if (activeTracker && activeTracker.status !== 'Completed') {
      const timer = setTimeout(() => {
        setActiveTracker(prev => {
          if (!prev) return null;
          if (prev.status === 'Pending') return { ...prev, status: 'Preparing' };
          if (prev.status === 'Preparing') return { ...prev, status: 'Almost Ready' };
          if (prev.status === 'Almost Ready') return { ...prev, status: 'Ready for Pickup' };
          if (prev.status === 'Ready for Pickup') return { ...prev, status: 'Completed' };
          return prev;
        });
      }, 6000); // Progress every 6 seconds
      return () => clearTimeout(timer);
    }
  }, [activeTracker]);

  const fetchMenu = async (stall) => {
    try {
      setSelectedStall(stall);
      const res = await axios.get(`${API_URL}/stalls/${stall._id}/menu`);
      setMenu(res.data);
    } catch (err) {
      console.error('Failed to fetch menu', err);
    }
  };

  const submitComplaint = async (e) => {
    e.preventDefault();
    if (!studentId) return alert('Please login first');
    try {
      await axios.post(`${API_URL}/complaints/submit`, {
        ...complaintForm,
        studentId,
        imageProof: 'dummy_image_url'
      });
      alert('Complaint submitted for AI validation!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting complaint');
    }
  };

  const initiateOrder = (item) => {
    setOrderingItem(item);
  };

  const confirmOrder = async (item) => {
    try {
      const res = await axios.post(`${API_URL}/orders`, {
        studentId,
        stallId: selectedStall._id,
        items: [{ menuItemId: item._id, name: item.name, quantity: 1, pointsCost: item.pointsCost, prepTime: item.prepTime || 15 }],
        totalPoints: item.pointsCost
      });
      
      const newPoints = foodPoints - item.pointsCost;
      setFoodPoints(newPoints);
      
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser) {
          storedUser.foodPoints = newPoints;
          localStorage.setItem('user', JSON.stringify(storedUser));
      }

      setOrderingItem(null);
      const orderData = res.data;
      // Inject items for UI
      orderData.items = [{ name: item.name, prepTime: item.prepTime || 15 }];
      setCompletedOrder(orderData);
      
      // Start tracker
      setActiveTracker({
        ...orderData,
        status: 'Pending',
        stallName: selectedStall.name,
        itemName: item.name
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="flex-1 p-6 max-w-6xl mx-auto w-full animate-[fadeUp_0.4s_both]">
      
      {/* Top Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-dark bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-500/20 text-white p-6 rounded-2xl flex items-center justify-between shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-transform">
          <div>
            <p className="text-purple-300 text-sm font-semibold tracking-wider uppercase mb-1">Smart Wallet</p>
            <h2 className="text-4xl font-display font-bold">{foodPoints} <span className="text-lg text-purple-400 font-normal">pts</span></h2>
          </div>
          <Wallet size={48} className="text-purple-400 opacity-80" />
        </div>
        <div className="glass bg-[#12122a] border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setActiveTab('complaint')}>
          <div>
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Active Issues</p>
            <h2 className="text-4xl font-display font-bold text-white">0</h2>
          </div>
          <AlertTriangle size={48} className="text-yellow-500 opacity-80" />
        </div>
        <div className="glass bg-[#12122a] border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => setActiveTab('marketplace')}>
          <div>
            <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase mb-1">Campus Stalls</p>
            <h2 className="text-4xl font-display font-bold text-white">Explore</h2>
          </div>
          <Store size={48} className="text-blue-500 opacity-80" />
        </div>
      </div>

      {/* LIVE TRACKER WIDGET */}
      {activeTracker && activeTracker.status !== 'Completed' && (
        <div className="mb-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: 
                activeTracker.status === 'Pending' ? '25%' : 
                activeTracker.status === 'Preparing' ? '50%' : 
                activeTracker.status === 'Almost Ready' ? '75%' : '100%' 
              }}
            ></div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl animate-pulse">
                ⏳
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Order {activeTracker.qrCodeToken?.substring(0, 5).toUpperCase()}</h3>
                <p className="text-purple-300">{activeTracker.itemName} from {activeTracker.stallName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Current Status</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                  <p className="font-bold text-white text-lg">{activeTracker.status}</p>
                </div>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col items-center min-w-[100px]">
                <Clock size={20} className="text-purple-400 mb-1" />
                <span className="text-xs text-gray-400">Wait Time</span>
                <span className="font-bold text-white">~12 min</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass bg-[#12122a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/10">
          <button 
            className={`flex-1 py-5 font-semibold text-center transition-colors text-lg ${activeTab === 'complaint' ? 'border-b-2 border-purple-500 text-purple-400 bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            onClick={() => {setActiveTab('complaint'); setSelectedStall(null);}}
          >
            Report Mess Food
          </button>
          <button 
            className={`flex-1 py-5 font-semibold text-center transition-colors text-lg ${activeTab === 'marketplace' ? 'border-b-2 border-pink-500 text-pink-400 bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            onClick={() => setActiveTab('marketplace')}
          >
            Stall Marketplace
          </button>
        </div>

        <div className="p-8">
          {/* COMPLAINT TAB */}
          {activeTab === 'complaint' && (
            <form onSubmit={submitComplaint} className="max-w-2xl mx-auto space-y-6 animate-[fadeIn_0.3s_both]">
              <h3 className="text-2xl font-display font-bold text-white mb-2">Submit AI Verification</h3>
              <p className="text-gray-400 mb-6">Upload an image of the issue. Our computer vision model will automatically verify it.</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="form-group mb-0">
                  <label className="text-gray-300">Hostel</label>
                  <select className="form-input bg-black/20" onChange={e => setComplaintForm({...complaintForm, hostel: e.target.value})}>
                    <option>BH1</option><option>BH2</option><option>BH3</option><option>GH1</option>
                  </select>
                </div>
                <div className="form-group mb-0">
                  <label className="text-gray-300">Meal Type</label>
                  <select className="form-input bg-black/20" onChange={e => setComplaintForm({...complaintForm, mess: e.target.value})}>
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-0">
                <label className="text-gray-300">Issue Category</label>
                <select className="form-input bg-black/20" onChange={e => setComplaintForm({...complaintForm, issueType: e.target.value})}>
                  <option>Bad taste</option><option>Undercooked</option><option>Overcooked</option><option>Unhygienic</option><option>Stale food</option>
                </select>
              </div>

              <div className="form-group mb-0 mt-6">
                <label className="text-gray-300">Upload Proof (Required)</label>
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-gray-400 hover:bg-white/5 hover:border-purple-500/50 hover:text-purple-300 cursor-pointer transition-all">
                  <Upload size={40} className="mb-4" />
                  <p className="font-semibold text-lg">Click to upload image or video</p>
                  <p className="text-sm mt-1 opacity-70">JPG, PNG, MP4 up to 10MB</p>
                </div>
              </div>

              <button type="submit" className="btn-primary btn-lg btn-full mt-8 flex items-center justify-center gap-2">
                <CheckCircle2 size={22} /> Submit for AI Validation
              </button>
            </form>
          )}

          {/* MARKETPLACE TAB */}
          {activeTab === 'marketplace' && !selectedStall && (
            <div className="animate-[fadeIn_0.3s_both]">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Verified Campus Stalls</h3>
                  <p className="text-gray-400">Use your wallet points to skip the queue and order fresh.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stalls.map(stall => (
                  <div key={stall._id} onClick={() => fetchMenu(stall)} className="group bg-black/20 border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/5 hover:border-pink-500/50 hover:-translate-y-1 transition-all">
                    <div className="w-16 h-16 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-pink-500/25 transition">
                      <Store className="text-white" size={32} />
                    </div>
                    <h4 className="font-bold text-xl text-white mb-2">{stall.name}</h4>
                    <p className="text-sm text-gray-400 mb-6 h-10">{stall.description}</p>
                    <div className="flex items-center text-pink-400 text-sm font-bold group-hover:text-pink-300">
                      View Menu <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STALL MENU VIEW */}
          {activeTab === 'marketplace' && selectedStall && (
            <div className="animate-[fadeIn_0.3s_both]">
              <button onClick={() => setSelectedStall(null)} className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition">
                &larr; Back to Stalls
              </button>
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">{selectedStall.name}</h3>
                  <p className="text-gray-400">Select items to order using your food points.</p>
                </div>
                <div className="bg-purple-900/30 border border-purple-500/20 px-4 py-2 rounded-xl text-purple-300 font-bold">
                  Wallet: {foodPoints} pts
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {menu.map(item => (
                  <div key={item._id} className="flex items-center justify-between border border-white/5 rounded-2xl p-5 bg-black/20 hover:bg-white/5 transition">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-2xl border border-white/5">
                        🍔
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock size={14}/> Prep: {item.prepTime || 15} mins
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className="font-bold text-pink-400 text-lg">
                        {item.pointsCost} pts
                      </span>
                      <button 
                        onClick={() => initiateOrder(item)}
                        className="bg-white/10 hover:bg-purple-600 text-white px-5 py-2 rounded-xl font-semibold transition flex items-center gap-2 text-sm"
                      >
                        <ShoppingBag size={16} /> Order Now
                      </button>
                    </div>
                  </div>
                ))}
                
                {menu.length === 0 && <p className="text-gray-500 text-center py-8 col-span-2">No menu items found for this stall.</p>}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
      {orderingItem && (
        <OrderModal 
          item={orderingItem} 
          stall={selectedStall} 
          walletPoints={foodPoints}
          onClose={() => setOrderingItem(null)}
          onConfirm={confirmOrder}
        />
      )}

      {completedOrder && (
        <OrderSuccessModal 
          order={completedOrder}
          walletPoints={foodPoints}
          onClose={() => setCompletedOrder(null)}
        />
      )}

    </div>
  );
}

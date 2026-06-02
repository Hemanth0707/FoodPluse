import { useEffect, useState } from 'react';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { Package, Clock, CheckCircle, Timer, MapPin, ChefHat, ShoppingBag, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const { orders, fetchOrders, loading } = useFoodStore();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    const activeToken = token || localStorage.getItem('foodpulse_token');
    let activeUser = user;
    if (!activeUser) {
      try {
        const raw = localStorage.getItem('foodpulse_user');
        if (raw) activeUser = JSON.parse(raw);
      } catch (_) {}
    }
    if (activeUser && activeToken) {
      fetchOrders(activeUser._id, activeToken);
    }
  }, [user, token, fetchOrders]);

  // Dynamic countdown timer for active orders
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const newTimers = { ...prev };
        orders.forEach(o => {
          if (o.status !== 'Collected' && o.status !== 'Cancelled') {
            const passed = Math.floor((new Date() - new Date(o.createdAt)) / 60000);
            const remaining = Math.max(0, 15 - passed); // mock 15 min prep
            newTimers[o._id] = remaining;
          }
        });
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  const activeOrders = orders.filter(o => o.status !== 'Collected' && o.status !== 'Cancelled');
  const pastOrders = orders.filter(o => o.status === 'Collected' || o.status === 'Cancelled');

  const getStatusStep = (status) => {
    switch(status) {
      case 'Pending': return 1;
      case 'Preparing': return 2;
      case 'Ready': return 3;
      case 'Collected': return 4;
      default: return 0;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-4xl mx-auto pb-24 lg:pb-8 space-y-12"
    >
      
      {/* Active Orders Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
          <Clock className="text-cyan-400 animate-pulse" size={20} /> Active Orders ({activeOrders.length})
        </h2>
        
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="h-60 bg-[#0c0d21]/60 border border-white/5 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : activeOrders.length === 0 ? (
          <div className="text-center py-16 bg-[#0c0d21]/50 border border-white/5 rounded-3xl">
            <ShoppingBag size={42} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-base font-bold text-white">No active orders</h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">Get your next meal by visiting the Marketplace food stalls.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {activeOrders.map(order => {
                const step = getStatusStep(order.status);
                const progressWidth = `${((step - 1) / 3) * 100}%`;
                
                return (
                  <motion.div 
                    key={order._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-3xl"
                  >
                    {/* Live Tracking Header */}
                    <div className="bg-gradient-to-r from-cyan-900/10 to-blue-900/10 p-6 border-b border-white/5 flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-display font-extrabold text-white tracking-tight">{order.stallId?.name || 'Food Stall'}</h3>
                        <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider mt-0.5">Order #{order.qrCodeToken.substring(0, 8)}</p>
                      </div>
                      
                      {step < 3 ? (
                        <div className="text-right">
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Arriving in</p>
                          <div className="text-2xl font-display font-extrabold text-white flex items-center justify-end gap-1.5">
                            <Timer size={18} className="text-yellow-500 animate-pulse" />
                            {timers[order._id] !== undefined ? timers[order._id] : '--'} <span className="text-xs text-gray-400 font-normal">mins</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold animate-pulse">
                            <CheckCircle size={14} /> Ready for Pickup
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Tracker */}
                    <div className="p-8 pb-4">
                      <div className="relative pt-2 pb-8">
                        {/* Track Background */}
                        <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-white/5 rounded-full"></div>
                        
                        {/* Active Track */}
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: progressWidth }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute top-5 left-[10%] h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        />

                        <div className="relative flex justify-between">
                          {[
                            { stepVal: 1, label: "Confirmed", icon: <Package size={13} />, color: "text-cyan-400" },
                            { stepVal: 2, label: "Preparing", icon: <ChefHat size={13} />, color: "text-blue-500" },
                            { stepVal: 3, label: "Ready", icon: <CheckCircle size={13} />, color: "text-green-400" },
                            { stepVal: 4, label: "Collected", icon: <MapPin size={13} />, color: "text-blue-400" }
                          ].map((item, idx) => (
                            <div key={idx} className={`flex flex-col items-center gap-2 z-10 w-[20%] ${step >= item.stepVal ? item.color : 'text-gray-500'}`}>
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border bg-[#020208] transition-all duration-500 ${
                                step >= item.stepVal 
                                  ? 'border-cyan-500/40 shadow-[0_0_15px_rgba(6, 182, 212,0.2)] text-white' 
                                  : 'border-white/5'
                              }`}>
                                {item.icon}
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-center">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order Details & QR */}
                    <div className="px-6 py-6 border-t border-white/5 bg-black/20 flex flex-col md:flex-row gap-6 justify-between items-center">
                      <div className="flex-1 w-full space-y-3">
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Order Summary</p>
                          <div className="space-y-1 mt-1">
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-xs text-gray-300">
                                <span className="text-white font-extrabold bg-white/5 px-1.5 py-0.5 rounded text-[10px] mr-2">{item.quantity}x</span> {item.name}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-bold text-cyan-400">{order.totalPoints} pts paid</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                      
                      {step === 3 && (
                        <div className="shrink-0 flex flex-col items-center bg-white p-3 rounded-2xl shadow-xl">
                          <div className="w-20 h-20 bg-gray-100 flex flex-wrap gap-0.5 p-1">
                            {Array.from({length: 36}).map((_, i) => (
                              <div key={i} className={`w-[14%] h-[14%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                            ))}
                          </div>
                          <span className="text-black font-mono text-[9px] font-bold mt-2 tracking-widest">{order.qrCodeToken}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Past Orders Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-display font-extrabold text-gray-400 tracking-tight flex items-center gap-2">
          <History className="text-gray-500" size={18} /> Past Orders ({pastOrders.length})
        </h2>
        
        <div className="space-y-4">
          {pastOrders.map(order => (
            <div key={order._id} className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-lg shrink-0 opacity-55">
                  🍽️
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{order.stallId?.name || 'Food Stall'}</h4>
                  <p className="text-[9px] text-gray-500">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <span className="font-bold text-white text-sm mb-1">{order.totalPoints} pts</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold uppercase ${
                  order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-gray-400'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default Orders;

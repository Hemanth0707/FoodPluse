import { useEffect, useState } from 'react';
import useFoodStore from '../store/useFoodStore';
import useAuthStore from '../store/useAuthStore';
import { Package, Clock, CheckCircle, Timer, MapPin, ChefHat, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Orders = () => {
  const { orders, fetchOrders, loading } = useFoodStore();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    if (user && token) {
      fetchOrders(user._id, token);
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
    }, 1000); // Update every second to feel "live" even though logic is minute based
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto pb-24 lg:pb-8">
      {/* Active Orders Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
          <Clock className="text-purple-400" /> Active Orders ({activeOrders.length})
        </h2>
        
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-white/5 border border-white/10 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : activeOrders.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-3xl">
            <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-300">No active orders</h3>
            <p className="text-gray-500 text-sm mt-1">Your food journey begins at the Marketplace.</p>
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#12122a] border border-[rgba(168,85,247,0.18)] rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  >
                    {/* Live Tracking Header */}
                    <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-6 border-b border-white/10 flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold font-display text-white mb-1">{order.stallId?.name || 'Food Stall'}</h3>
                        <p className="text-purple-300 font-medium text-sm">Order #{order.qrCodeToken}</p>
                      </div>
                      
                      {step < 3 ? (
                        <div className="text-right">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Arriving in</p>
                          <div className="text-3xl font-display font-bold text-white flex items-center justify-end gap-2">
                            <Timer size={24} className="text-orange-400 animate-pulse" />
                            {timers[order._id] !== undefined ? timers[order._id] : '--'} <span className="text-base text-gray-400 font-normal">mins</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-xl flex items-center gap-2 font-bold animate-pulse">
                            <CheckCircle size={18} /> READY FOR PICKUP
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Tracker */}
                    <div className="p-8 pb-4">
                      <div className="relative pt-2 pb-8">
                        {/* Track Background */}
                        <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-gray-800 rounded-full"></div>
                        
                        {/* Active Track */}
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: progressWidth }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="absolute top-5 left-[10%] h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        ></motion.div>

                        <div className="relative flex justify-between">
                          <div className={`flex flex-col items-center gap-2 z-10 w-[20%] ${step >= 1 ? 'text-purple-400' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#12122a] transition-colors duration-500 ${step >= 1 ? 'border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-gray-700'}`}>
                              <Package size={14} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-center">Confirmed</span>
                          </div>

                          <div className={`flex flex-col items-center gap-2 z-10 w-[20%] ${step >= 2 ? 'text-pink-400' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#12122a] transition-colors duration-500 ${step >= 2 ? 'border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'border-gray-700'}`}>
                              <ChefHat size={14} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-center">Preparing</span>
                          </div>

                          <div className={`flex flex-col items-center gap-2 z-10 w-[20%] ${step >= 3 ? 'text-green-400' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#12122a] transition-colors duration-500 ${step >= 3 ? 'border-green-500 text-green-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'border-gray-700'}`}>
                              <CheckCircle size={14} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-center">Ready</span>
                          </div>

                          <div className={`flex flex-col items-center gap-2 z-10 w-[20%] ${step >= 4 ? 'text-blue-400' : 'text-gray-600'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-[#12122a] transition-colors duration-500 ${step >= 4 ? 'border-blue-500 text-blue-400' : 'border-gray-700'}`}>
                              <MapPin size={14} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-center">Collected</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details & QR */}
                    <div className="px-6 py-6 border-t border-white/5 bg-black/20 flex flex-col md:flex-row gap-6 justify-between items-center">
                      <div className="flex-1 w-full">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Order Summary</p>
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-gray-300"><span className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded text-xs mr-2">{item.quantity}x</span> {item.name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-purple-400">{order.totalPoints} pts paid</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                      
                      {step === 3 && (
                        <div className="shrink-0 flex flex-col items-center bg-white p-3 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                          <div className="w-24 h-24 bg-gray-200 border-4 border-white flex flex-col justify-center items-center text-[8px] text-gray-500 p-1 text-center font-mono">
                            <div className="w-full h-full flex flex-wrap gap-0.5 p-1 bg-white">
                                {/* Fake QR Blocks */}
                                {Array.from({length: 36}).map((_, i) => (
                                    <div key={i} className={`w-[14%] h-[14%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                                ))}
                            </div>
                          </div>
                          <span className="text-black font-bold mt-2 font-mono tracking-widest">{order.qrCodeToken}</span>
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
      <div>
        <h2 className="text-lg font-bold font-display text-gray-400 mb-6 flex items-center gap-2">
          <History className="text-gray-500" /> Past Orders ({pastOrders.length})
        </h2>
        
        <div className="space-y-4">
          {pastOrders.map(order => (
            <div key={order._id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl shrink-0 opacity-60">
                  🍽️
                </div>
                <div>
                  <h4 className="font-bold text-gray-300">{order.stallId?.name || 'Stall'}</h4>
                  <p className="text-xs text-gray-500 mb-1">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <p className="text-sm text-gray-400">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <span className="font-bold text-gray-300 mb-1">{order.totalPoints} pts</span>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
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

// Simple mock icon since it was missing
const History = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
);

export default Orders;

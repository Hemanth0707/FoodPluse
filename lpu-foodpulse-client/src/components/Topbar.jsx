import { useState } from 'react';
import { Bell, Search, Menu, X, Check, Wallet } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';
import { motion, AnimatePresence } from 'framer-motion';

const Topbar = ({ title, subtitle, toggleMobile }) => {
  const user = useAuthStore((state) => state.user);
  const walletPoints = useFoodStore((state) => state.walletPoints);
  const { complaints, orders } = useFoodStore();
  const [showNotifs, setShowNotifs] = useState(false);

  // Generate some fake notifications based on current state
  const notifications = [
    { id: 1, type: 'wallet', text: `Welcome back! You have ${walletPoints} points available.`, time: 'Just now', read: false },
    ...complaints.slice(0, 2).map(c => ({
      id: `c-${c._id}`,
      type: c.status === 'Verified' ? 'success' : 'info',
      text: `Complaint for ${c.mealType} is ${c.status}`,
      time: 'Recently',
      read: c.status !== 'Verified'
    })),
    ...orders.slice(0, 2).map(o => ({
      id: `o-${o._id}`,
      type: 'order',
      text: `Order #${o.qrCodeToken.substring(0, 5)} is ${o.status}`,
      time: 'Recently',
      read: false
    }))
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="w-full flex items-center justify-between py-5 px-6 md:px-8 border-b border-white/5 bg-[#020208]/80 backdrop-blur-2xl sticky top-0 z-30 animate-page-enter">
      
      {/* Title Details */}
      <div>
        <h2 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      {/* Topbar Operations */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Toggle Drawer button */}
        <button className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/5 rounded-xl lg:hidden" onClick={toggleMobile}>
          <Menu size={18} />
        </button>

        {/* Smart Points Chip */}
        {user?.role === 'student' && (
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Wallet size={14} className="text-cyan-400" />
            {walletPoints} pts
          </div>
        )}

        {/* Global Notifications Icon */}
        <div className="relative">
          <button 
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all relative" 
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" />}
          </button>
          
          {/* Notification Dropdown Panel */}
          <AnimatePresence>
            {showNotifs && (
              <div className="absolute right-0 mt-3.5 w-80 bg-[#060713] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                  <h3 className="font-bold text-white text-sm">Notifications</h3>
                  <button className="text-gray-400 hover:text-white" onClick={() => setShowNotifs(false)}>
                    <X size={14} />
                  </button>
                </div>
                
                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <p className="p-5 text-center text-gray-500 text-xs">No active notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer ${notif.read ? 'opacity-50' : ''}`}>
                        <div className={`w-7.5 h-7.5 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                          notif.type === 'success' ? 'bg-green-500/10 text-green-400' :
                          notif.type === 'order' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-cyan-500/10 text-cyan-400'
                        }`}>
                          {notif.type === 'success' ? <Check size={12}/> : '🔔'}
                        </div>
                        <div>
                          <p className={`text-xs ${notif.read ? 'text-gray-400' : 'text-gray-200 font-semibold'}`}>{notif.text}</p>
                          <p className="text-[9px] text-gray-500 mt-1 font-mono">{notif.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="p-3 text-center border-t border-white/5 bg-white/[0.01]">
                  <button className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider" onClick={() => setShowNotifs(false)}>Mark all read</button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* User Chip Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md flex items-center justify-center text-xs font-extrabold text-white">
          <div className="w-full h-full rounded-[10px] bg-[#060713] flex items-center justify-center uppercase">
            {user?.name?.charAt(0) || 'S'}
          </div>
        </div>

      </div>

    </header>
  );
};

export default Topbar;

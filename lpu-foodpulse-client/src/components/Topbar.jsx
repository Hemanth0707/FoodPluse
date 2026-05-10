import { useState } from 'react';
import { Bell, Search, Menu, X, Check } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';

const Topbar = ({ title, subtitle, toggleMobile }) => {
  const user = useAuthStore((state) => state.user);
  const walletPoints = useFoodStore((state) => state.walletPoints);
  const { complaints, orders } = useFoodStore();
  const [showNotifs, setShowNotifs] = useState(false);

  // Generate some fake notifications based on current state
  const notifications = [
    { id: 1, type: 'wallet', text: `Welcome back! You have ${walletPoints} pts.`, time: 'Just now', read: false },
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
      text: `Order #${o.qrCodeToken.substring(0, 5)} at ${o.stallId?.name || 'Stall'} is ${o.status}`,
      time: 'Recently',
      read: false
    }))
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dash-topbar relative">
      <div>
        <h2 className="dash-title">{title}</h2>
        <p className="dash-sub">{subtitle}</p>
      </div>
      <div className="dash-topbar-right">
        <button className="menu-toggle lg:hidden" onClick={toggleMobile}>
          <Menu size={20} />
        </button>
        {user?.role === 'student' && (
          <div className="points-chip hidden sm:block">
            {walletPoints} pts
          </div>
        )}
        <div className="search-bar hidden sm:flex">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="relative">
          <button className="notif-btn" onClick={() => setShowNotifs(!showNotifs)}>
            <Bell size={18} />
            {unreadCount > 0 && <div className="notif-dot"></div>}
          </button>
          
          {/* Notification Drawer */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-[#12122a] border border-[rgba(168,85,247,0.18)] rounded-xl shadow-2xl z-50 overflow-hidden animate-[fadeUp_0.2s_both]">
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#0d0d1c]">
                <h3 className="font-bold text-white">Notifications</h3>
                <button className="text-gray-400 hover:text-white" onClick={() => setShowNotifs(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-gray-400 text-sm">No new notifications</p>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 border-b border-white/5 flex gap-3 hover:bg-white/5 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        notif.type === 'success' ? 'bg-green-500/20 text-green-400' :
                        notif.type === 'order' ? 'bg-blue-500/20 text-blue-400' :
                        notif.type === 'wallet' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {notif.type === 'success' ? <Check size={14}/> : '🔔'}
                      </div>
                      <div>
                        <p className={`text-sm ${notif.read ? 'text-gray-400' : 'text-gray-200 font-medium'}`}>{notif.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 text-center border-t border-white/5 bg-[#0d0d1c]">
                <button className="text-xs text-purple-400 hover:text-purple-300 font-medium" onClick={() => setShowNotifs(false)}>Mark all as read</button>
              </div>
            </div>
          )}
        </div>
        <div className="user-chip">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

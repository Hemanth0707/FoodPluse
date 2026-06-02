import { NavLink } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { 
  LayoutDashboard, 
  FileWarning, 
  Store, 
  ShoppingBag, 
  Wallet, 
  UserCircle, 
  LogOut, 
  Settings, 
  Zap 
} from 'lucide-react';

const Sidebar = ({ isMobileOpen, closeMobile }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const getNavLinks = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', name: 'Admin Dashboard', icon: <LayoutDashboard size={18} /> },
      ];
    }
    if (user?.role === 'vendor' || user?.role === 'stall') {
      return [
        { path: '/vendor', name: 'Vendor Dashboard', icon: <Store size={18} /> },
      ];
    }
    return [
      { path: '/report-food', name: 'Report Food', icon: <FileWarning size={18} /> },
      { path: '/marketplace', name: 'Marketplace', icon: <Store size={18} /> },
      { path: '/orders', name: 'Orders Tracker', icon: <ShoppingBag size={18} /> },
      { path: '/wallet', name: 'Smart Wallet', icon: <Wallet size={18} /> },
      { path: '/profile', name: 'My Profile', icon: <UserCircle size={18} /> },
    ];
  };

  const links = getNavLinks();

  return (
    <aside className={`fixed top-0 bottom-0 left-0 z-40 w-[260px] bg-[#020208]/95 border-r border-white/5 p-6 flex flex-col justify-between transition-transform duration-300 ${
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      
      <div>
        {/* Sidebar Brand Logo */}
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Zap size={16} fill="currentColor" />
          </div>
          <span className="text-lg font-display font-extrabold text-white tracking-tight">
            Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pulse</span>
          </span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                  : 'text-gray-400 border border-transparent hover:text-white hover:bg-white/5'
              }`}
              onClick={closeMobile}
            >
              <span className="shrink-0">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer Area */}
      <div className="border-t border-white/5 pt-6">
        <button 
          className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-cyan-400 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all text-left" 
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;

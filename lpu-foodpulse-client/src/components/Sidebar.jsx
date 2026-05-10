import { NavLink } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { LayoutDashboard, FileWarning, Store, ShoppingBag, Wallet, UserCircle, LogOut, Settings } from 'lucide-react';

const Sidebar = ({ isMobileOpen, closeMobile }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const getNavLinks = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', name: 'Admin Dashboard', icon: <LayoutDashboard size={20} /> },
      ];
    }
    if (user?.role === 'vendor' || user?.role === 'stall') {
      return [
        { path: '/vendor', name: 'Vendor Dashboard', icon: <Store size={20} /> },
      ];
    }
    return [
      { path: '/report-food', name: 'Report Food', icon: <FileWarning size={20} /> },
      { path: '/marketplace', name: 'Marketplace', icon: <Store size={20} /> },
      { path: '/orders', name: 'Orders', icon: <ShoppingBag size={20} /> },
      { path: '/wallet', name: 'Wallet', icon: <Wallet size={20} /> },
      { path: '/profile', name: 'Profile', icon: <UserCircle size={20} /> },
      { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
    ];
  };

  const links = getNavLinks();

  return (
    <aside className={`sidebar ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="sidebar-brand">
        <span className="logo-icon">⚡</span><span>FoodPulse</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path} 
            className={({ isActive }) => `snav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="snav-item w-full text-left" onClick={logout}>
          <span className="nav-icon"><LogOut size={20} /></span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

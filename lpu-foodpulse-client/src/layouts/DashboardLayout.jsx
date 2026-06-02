import { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuthStore from '../store/useAuthStore';
import { Home, ShoppingBag, PlusCircle, User, Settings as SettingsIcon } from 'lucide-react';

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Also check localStorage as a fallback to handle Zustand re-hydration timing issues
  const hasLocalToken = !!localStorage.getItem('foodpulse_token');
  if (!isAuthenticated && !hasLocalToken) {
    return <Navigate to="/login" replace />;
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/report-food': return { title: 'Report Food', sub: 'Submit a new complaint or feedback' };
      case '/marketplace': return { title: 'Marketplace', sub: 'Premium Campus Food Delivery' };
      case '/orders': return { title: 'My Orders', sub: 'Track your active and past orders' };
      case '/wallet': return { title: 'Points Wallet', sub: 'Manage your Food Points' };
      case '/profile': return { title: 'My Profile', sub: 'Your student details' };
      case '/settings': return { title: 'Settings', sub: 'App preferences and privacy' };
      case '/admin': return { title: 'Admin Dashboard', sub: 'Campus overview and AI analytics' };
      case '/vendor': return { title: 'Vendor Dashboard', sub: 'Manage your stall and orders' };
      default: return { title: 'Dashboard', sub: 'Welcome back' };
    }
  };

  const { title, sub } = getPageTitle();

  return (
    <div className="dashboard-layout pb-20 lg:pb-0">
      <Sidebar isMobileOpen={isMobileOpen} closeMobile={() => setIsMobileOpen(false)} />
      
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <main className="dash-main min-h-screen">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col h-full">
          <Topbar title={title} subtitle={sub} toggleMobile={() => setIsMobileOpen(true)} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Bottom Navigation for Mobile */}
      {user?.role === 'student' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#020208]/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-3 flex justify-between items-center pb-safe">
          <Link to="/marketplace" className={`flex flex-col items-center gap-1 ${location.pathname === '/marketplace' ? 'text-cyan-400' : 'text-gray-500'}`}>
            <Home size={22} />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link to="/orders" className={`flex flex-col items-center gap-1 ${location.pathname === '/orders' ? 'text-cyan-400' : 'text-gray-500'}`}>
            <ShoppingBag size={22} />
            <span className="text-[10px] font-medium">Orders</span>
          </Link>
          <div className="relative -top-6">
            <Link to="/report-food" className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_8px_32px_rgba(6,182,212,0.4)] transform hover:scale-105 transition-transform">
              <PlusCircle size={28} />
            </Link>
          </div>
          <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-cyan-400' : 'text-gray-500'}`}>
            <User size={22} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
          <Link to="/settings" className={`flex flex-col items-center gap-1 ${location.pathname === '/settings' ? 'text-cyan-400' : 'text-gray-500'}`}>
            <SettingsIcon size={22} />
            <span className="text-[10px] font-medium">Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

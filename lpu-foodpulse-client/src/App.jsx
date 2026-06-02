import React, { Suspense, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const DashboardLayout = React.lazy(() => import('./layouts/DashboardLayout'));
const ReportFood = React.lazy(() => import('./pages/ReportFood'));
const Marketplace = React.lazy(() => import('./pages/Marketplace'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Wallet = React.lazy(() => import('./pages/Wallet'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const VendorDashboard = React.lazy(() => import('./pages/VendorDashboard'));

const StartupSplash = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-[#0B0B0B] overflow-hidden"
  >
    {/* Subtle warm ambient glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ 
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px]"
      />
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-2xl relative overflow-hidden">
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent"
        />
        <span className="text-amber-500 drop-shadow-[0_0_10px_rgba(198,138,43,0.3)]">⚜️</span>
      </div>
      <h1 className="text-3xl font-display font-light text-white mb-1.5 tracking-widest uppercase">
        Food<span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-200">Pulse</span>
      </h1>
      <p className="text-neutral-500 text-[10px] tracking-[0.25em] uppercase mb-8">Culinary Campus Platform</p>
      
      {/* Minimal Gold Progress Line */}
      <div className="w-32 h-[1px] bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        />
      </div>
    </motion.div>
  </motion.div>
);

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Artificial initial splash screen for that premium startup feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {isAppLoading && <StartupSplash key="splash" />}
      </AnimatePresence>
      
      {!isAppLoading && (
        <Router>
          <Suspense fallback={<StartupSplash />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route element={<DashboardLayout />}>
                <Route path="/report-food" element={<ReportFood />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/vendor" element={<VendorDashboard />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      )}
    </ErrorBoundary>
  );
};

export default App;

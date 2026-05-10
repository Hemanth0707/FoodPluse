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
    className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-[#080810] overflow-hidden"
  >
    {/* Animated background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"
      />
    </div>
    
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.5)] mb-6 overflow-hidden relative">
        <motion.div
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
        🍕
      </div>
      <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Food<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Pulse</span></h1>
      <p className="text-gray-400 text-sm tracking-widest uppercase mb-8">Smart Campus Ecosystem</p>
      
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
        ))}
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

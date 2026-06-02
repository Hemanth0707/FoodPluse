import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';
import { 
  ShoppingBag, 
  AlertTriangle, 
  Bell, 
  QrCode, 
  Wallet, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Edit3, 
  Copy, 
  Check, 
  Zap, 
  History, 
  Heart,
  MapPin,
  CheckCircle2,
  Lock,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const { complaints, orders } = useFoodStore();
  const walletPoints = useFoodStore(state => state.walletPoints);
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const referralCode = 'FP-HEMANTH23';

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    triggerToast('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Transaction Ledger (6 rows matching screenshot blueprint)
  const PointHistoryData = [
    { activity: 'Complaint Verified: Bad Taste', dateTime: 'Today, 10:30 AM', points: '+150 pts', type: 'earn' },
    { activity: 'Meal Order: Central Mess', dateTime: 'Yesterday, 8:15 PM', points: '-120 pts', type: 'spend' },
    { activity: 'Complaint Verified: Stale Food', dateTime: '10 May, 1:45 PM', points: '+150 pts', type: 'earn' },
    { activity: 'Meal Order: Boys Hostel Mess 1', dateTime: '08 May, 9:00 AM', points: '-80 pts', type: 'spend' },
    { activity: 'Complaint Verified: Hygiene Issue', dateTime: '05 May, 11:20 AM', points: '+150 pts', type: 'earn' },
    { activity: 'Meal Order: Food Court Central', dateTime: '04 May, 7:45 PM', points: '-60 pts', type: 'spend' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 lg:pb-12 space-y-8 animate-[fadeUp_0.4s_both] selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-[#060713]/90 border border-cyan-500/30 text-white px-5 py-3 rounded-2xl flex items-center gap-2.5 shadow-2xl backdrop-blur-md text-xs font-bold"
          >
            <Zap size={14} className="text-cyan-400 animate-pulse" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER SECTION (High-Fidelity Profile card) */}
      <div className="relative rounded-[2.5rem] p-8 md:p-10 bg-white/[0.02] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left Side: Avatar + Details */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Circular Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-[0_0_20px_rgba(6, 182, 212,0.3)] shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#020208] flex items-center justify-center">
                <span className="text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  {user?.name?.charAt(0).toUpperCase() || 'H'}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  {user?.name || 'Hemanth'}
                </h1>
                
                {/* Badges */}
                <div className="flex items-center justify-center gap-2 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                    Level 4
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg">
                    <CheckCircle2 size={10} className="fill-green-500/20" /> Verified Student
                  </span>
                </div>
              </div>
              
              <p className="text-gray-400 text-xs sm:text-sm font-medium">
                {user?.email || 'hemanthakhiland23@lpu.in'}
              </p>

              {/* Student Metadata Grid */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start text-xs text-gray-500 font-semibold pt-1">
                <span>Reg. No. <strong className="text-gray-300">{user?.lpuId || '12315707'}</strong></span>
                <span>Course <strong className="text-gray-300">{user?.department || 'B.Tech CSE'}</strong></span>
                <span>Hostel <strong className="text-gray-300">{user?.hostel || 'BH1 - 102-A'}</strong></span>
                <span>Year <strong className="text-gray-300">Year {user?.year || '4'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Side: Edit Button */}
          <button 
            onClick={() => triggerToast('Profile details form coming soon!')}
            className="px-5 py-3 rounded-xl border border-white/10 hover:border-cyan-500/30 bg-white/5 text-white text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-white/10 shrink-0 cursor-pointer"
          >
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {/* 2. QUICK ACTIONS SECTION */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-extrabold text-white tracking-tight flex items-center gap-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/marketplace')}
            className="group relative overflow-hidden border border-white/5 hover:border-cyan-500/30 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 text-left cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">Order Food</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Explore & Order</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/report-food')}
            className="group relative overflow-hidden border border-white/5 hover:border-blue-600/30 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 text-left cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-500 group-hover:scale-105 transition-transform">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">Report Issue</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Report Problems</p>
            </div>
          </button>

          <button 
            onClick={() => triggerToast('No new notifications!')}
            className="group relative overflow-hidden border border-white/5 hover:border-blue-500/30 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 text-left cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">Notifications</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">View All Alerts</p>
            </div>
          </button>

          <button 
            onClick={() => triggerToast('QR Scanner trigger placeholder')}
            className="group relative overflow-hidden border border-white/5 hover:border-yellow-500/30 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 text-left cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 group-hover:scale-105 transition-transform">
              <QrCode size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">Scan QR</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Scan & Order</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3. STATISTICS OVERVIEW SECTION */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-display font-extrabold text-white tracking-tight">
            Statistics Overview
          </h2>
          <button 
            onClick={() => navigate('/wallet')} 
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            View Analytics <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shadow-inner">
              <Wallet size={18} />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Semester Points</p>
              <h3 className="text-lg font-extrabold text-white mt-0.5 font-display">{walletPoints || '500'}</h3>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-blue-600/10 text-blue-500 flex items-center justify-center shadow-inner">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Meals Redeemed</p>
              <h3 className="text-lg font-extrabold text-white mt-0.5 font-display">{orders.length + 42}</h3>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shadow-inner">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Money Saved</p>
              <h3 className="text-lg font-extrabold text-white mt-0.5 font-display">₹1,240</h3>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shadow-inner">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Queue Time Saved</p>
              <h3 className="text-lg font-extrabold text-white mt-0.5 font-display">8.5 hrs</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THREE-COLUMN SECTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Food Activity */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between min-h-[460px]">
          <div>
            <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
              <ShoppingBag size={16} className="text-cyan-400" /> Food Activity
            </h3>

            {/* Most Ordered Item Sub-widget */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-2">Most Ordered</span>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center text-2xl shrink-0">
                    🍔
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Spicy Veg Burger</h4>
                    <p className="text-[10px] text-cyan-300 font-semibold mt-0.5">Ordered 14 times</p>
                    <p className="text-[9px] text-gray-500 mt-1">Stall: Central Mess (Block 25 Food Court)</p>
                  </div>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="space-y-2.5">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block">Recent Orders</span>
                
                {[
                  { name: 'Paneer Wrap', price: '₹90', emoji: '🌯' },
                  { name: 'Veg Thali', price: '₹120', emoji: '🍱' },
                  { name: 'Chicken Roll', price: '₹80', emoji: '🌯' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.02] transition-all">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base shrink-0">{item.emoji}</span>
                      <h5 className="text-[11px] font-bold text-white">{item.name}</h5>
                    </div>
                    <span className="text-[10px] font-extrabold text-cyan-300">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/orders')}
            className="w-full py-2.5 mt-5 border border-white/5 hover:border-cyan-500/20 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            View All Orders <ChevronRight size={12} />
          </button>
        </div>

        {/* Column 2: Issue Reports */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between min-h-[460px]">
          <div>
            <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-5 flex items-center gap-2 border-b border-white/5 pb-3">
              <AlertTriangle size={16} className="text-blue-500" /> Issue Reports
            </h3>

            <div className="space-y-4">
              {/* Radial Accuracy Progress Bar Mock */}
              <div className="flex items-center gap-5 bg-white/5 border border-white/5 p-4 rounded-2xl">
                {/* SVG Progress Circle */}
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full text-blue-600 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-white/5" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-blue-500" strokeDasharray="85, 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-[10px] font-black text-white">85%</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">All Verified</h4>
                  <p className="text-[9px] text-gray-500 leading-normal mt-0.5">Complaints checked and verified via AI computer vision scan.</p>
                </div>
              </div>

              {/* Mini Counts Table */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-white/5 border border-white/5 p-2.5 rounded-xl">
                  <span className="text-[18px] font-extrabold text-white block">12</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Total</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-2.5 rounded-xl">
                  <span className="text-[18px] font-extrabold text-green-400 block">10</span>
                  <span className="text-[8px] text-green-500 font-bold uppercase tracking-wider">Resolved</span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-2.5 rounded-xl">
                  <span className="text-[18px] font-extrabold text-yellow-400 block">2</span>
                  <span className="text-[8px] text-yellow-500 font-bold uppercase tracking-wider">Pending</span>
                </div>
              </div>

              {/* Recent Reports Log list */}
              <div className="space-y-2">
                {[
                  { name: 'Bad Taste', status: 'Resolved', time: 'Today, 10:30 AM', color: 'bg-green-500/20 text-green-400 border-green-500/20' },
                  { name: 'Stale Food', status: 'Resolved', time: '10 May, 3:45 PM', color: 'bg-green-500/20 text-green-400 border-green-500/20' },
                  { name: 'Too Salty', status: 'Pending', time: '08 May, 6:30 PM', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' }
                ].map((rep, idx) => (
                  <div key={idx} className="p-2.5 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-[10px] font-bold text-white">{rep.name}</h5>
                      <span className="text-[8px] text-gray-500 block mt-0.5">{rep.time}</span>
                    </div>
                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded border ${rep.color}`}>
                      {rep.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/report-food')}
            className="w-full py-2.5 mt-5 border border-white/5 hover:border-blue-600/20 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            View All Reports <ChevronRight size={12} />
          </button>
        </div>

        {/* Column 3: Achievements */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
              <h3 className="text-base font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                <Award size={16} className="text-yellow-500 fill-yellow-500/20" /> Achievements
              </h3>
              <button 
                onClick={() => triggerToast('All rewards unlocked summary!')} 
                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View All
              </button>
            </div>

            {/* Achievements List */}
            <div className="space-y-3">
              {[
                { title: 'Food Critic', desc: 'Reported 5 valid issues', icon: '📝', unlocked: true },
                { title: 'Early Bird', desc: 'Ordered breakfast 10 times', icon: '🌅', unlocked: true },
                { title: 'Campus Food Explorer', desc: 'Tried 5 different dining stalls', icon: '🧭', unlocked: true },
                { title: 'Healthy Eater', desc: 'Ordered 10 salads', icon: '🥗', unlocked: false }
              ].map((ach, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 border rounded-2xl flex items-center justify-between transition-all ${
                    ach.unlocked 
                      ? 'bg-white/5 border-yellow-500/20 hover:border-yellow-500/35' 
                      : 'bg-black/30 border-white/5 opacity-50 grayscale'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl filter drop-shadow-md shrink-0">{ach.icon}</span>
                    <div>
                      <h4 className="text-[11px] font-bold text-white">{ach.title}</h4>
                      <p className="text-[9px] text-gray-500 leading-normal mt-0.5">{ach.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${ach.unlocked ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-white/5 text-gray-500'}`}>
                    {ach.unlocked ? '✓ Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-center text-gray-500 mt-5 leading-normal">
            New reward points are credited instantly on verified milestones.
          </div>
        </div>

      </div>

      {/* 5. POINTS TRANSACTION HISTORY SECTION */}
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-display font-extrabold text-white tracking-tight flex items-center gap-2">
            <History className="text-cyan-400" /> Points Transaction History
          </h3>
          <button 
            onClick={() => navigate('/wallet')} 
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            View All Transactions <ChevronRight size={14} />
          </button>
        </div>

        {/* Structured Table */}
        <div className="overflow-x-auto w-full border border-white/5 rounded-2xl bg-black/20 hide-scrollbar">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#020208] text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Activity</th>
                <th className="py-4 px-6">Date & Time</th>
                <th className="py-4 px-6 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {PointHistoryData.map((txn, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{txn.activity}</td>
                  <td className="py-4 px-6 text-gray-400">{txn.dateTime}</td>
                  <td className={`py-4 px-6 text-right font-display font-extrabold text-sm ${txn.type === 'earn' ? 'text-green-400' : 'text-blue-500'}`}>
                    {txn.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. REFER & EARN SECTION */}
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Input Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-300 font-bold px-2.5 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest inline-block">
                Referral Program
              </span>
              <h3 className="text-3xl font-display font-extrabold text-white tracking-tight">Refer & Earn</h3>
              <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                Invite your friends and earn points when they join FoodPulse! Get +150 reward credits for each registration.
              </p>
            </div>

            {/* Input & Action */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Your Referral Code</label>
                <div className="flex gap-3 max-w-sm">
                  <div className="flex-1 bg-[#0c0d21]/60 border border-white/10 rounded-2xl py-3.5 px-4 text-white text-sm font-mono font-extrabold shadow-inner flex items-center justify-between">
                    <span>{referralCode}</span>
                    <button 
                      onClick={handleCopy} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors p-1"
                      title="Copy Code"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => triggerToast('Referral invite link generated!')}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:scale-[1.02] text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    Invite Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Vector Illustration (High-fidelity SVGs) */}
          <div className="md:col-span-5 flex justify-center">
            <svg viewBox="0 0 280 200" className="w-full max-w-[280px] drop-shadow-[0_0_30px_rgba(6, 182, 212,0.2)]">
              {/* Outer background elements */}
              <defs>
                <linearGradient id="cyanPink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="glowG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              
              {/* Background Shapes */}
              <rect x="20" y="20" width="240" height="160" rx="20" fill="url(#cyanPink)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Connecting Nodes */}
              <circle cx="90" cy="100" r="25" fill="#020208" stroke="rgba(6, 182, 212,0.3)" strokeWidth="1.5" />
              <circle cx="190" cy="100" r="25" fill="#020208" stroke="rgba(6, 182, 212,0.3)" strokeWidth="1.5" />
              <line x1="115" y1="100" x2="165" y2="100" stroke="url(#glowG)" strokeWidth="2.5" strokeDasharray="5,3" />

              {/* Handshake/Hi-Five representation or connection avatars */}
              <text x="80" y="108" fontSize="24">👤</text>
              <text x="180" y="108" fontSize="24">👤</text>
              
              {/* Floating points icons */}
              <circle cx="140" cy="70" r="12" fill="url(#glowG)" />
              <text x="134" y="75" fontSize="10" fontWeight="bold" fill="white">★</text>
              
              <circle cx="70" cy="60" r="6" fill="#3b82f6" opacity="0.7" />
              <circle cx="210" cy="140" r="8" fill="#10b981" opacity="0.6" />
              <circle cx="220" cy="50" r="6" fill="#06B6D4" opacity="0.5" />

              <text x="110" y="145" fontSize="9" fontWeight="bold" fill="#00D4FF" opacity="0.9" fontFamily="Outfit">+150 PTS</text>
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;

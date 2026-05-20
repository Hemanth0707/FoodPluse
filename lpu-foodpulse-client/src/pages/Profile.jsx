import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useFoodStore from '../store/useFoodStore';
import { 
  Camera, 
  Edit3, 
  ShoppingBag, 
  AlertTriangle, 
  Wallet, 
  Bell, 
  QrCode, 
  Medal, 
  Star, 
  TrendingUp, 
  Clock, 
  Target, 
  Sparkles,
  ChevronRight,
  TrendingDown,
  Trophy,
  History,
  Flame,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Premium numerical ticker count-up animator
const AnimatedCounter = ({ value, duration = 1200 }) => {
  const [count, setCount] = useState(value);

  useEffect(() => {
    const matches = value.toString().match(/[\d.]+/);
    if (!matches) {
      setCount(value);
      return;
    }
    const end = parseFloat(matches[0]);
    if (isNaN(end) || end === 0) {
      setCount(value);
      return;
    }

    const isPoints = value.toString().includes('pts');
    const isHrs = value.toString().includes('hrs');
    const isRupees = value.toString().startsWith('₹');
    
    const steps = 50;
    const increment = end / steps;
    let stepCount = 0;
    let current = 0;

    const timer = setInterval(() => {
      stepCount++;
      current += increment;
      if (stepCount >= steps) {
        clearInterval(timer);
        setCount(value);
      } else {
        if (isPoints) {
          setCount(`${Math.round(current)} pts`);
        } else if (isHrs) {
          setCount(`${current.toFixed(1)} hrs`);
        } else if (isRupees) {
          setCount(`₹${Math.round(current).toLocaleString()}`);
        } else {
          setCount(Math.round(current));
        }
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const Profile = () => {
  const user = useAuthStore(state => state.user);
  const { complaints, orders } = useFoodStore();
  const walletPoints = useFoodStore(state => state.walletPoints);
  const navigate = useNavigate();

  // Simulated avatar preview
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Time-aware welcome greetings
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", emoji: "🌅" };
    if (hour < 18) return { text: "Good afternoon", emoji: "☀️" };
    return { text: "Good evening", emoji: "🌙" };
  };
  const greeting = getGreeting();

  // Weather-Aware Food Suggestion States
  const [weather, setWeather] = useState('Rainy');
  const weatherSuggestions = {
    Rainy: { temp: "22°C", text: "Rainy Monsoon", icon: "🌧️", food: "Chai & Samosa Combo", stall: "BH2 Snack Corner", eta: "8 mins" },
    Hot: { temp: "38°C", text: "Sunny & Scorching", icon: "☀️", food: "Cold Mango Lassi & Frappe", stall: "Block 32 Chillers", eta: "5 mins" },
    Cold: { temp: "16°C", text: "Chilly Evening", icon: "❄️", food: "Hot Tomato Soup & Momos", stall: "Uni Mall Food Court", eta: "10 mins" }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Recharts interactive mock data
  const pointsHistory = [
    { name: 'Mon', points: 500 },
    { name: 'Tue', points: 380 },
    { name: 'Wed', points: 530 },
    { name: 'Thu', points: 450 },
    { name: 'Fri', points: 600 },
    { name: 'Sat', points: 520 },
    { name: 'Sun', points: walletPoints }
  ];

  const queueTimeSavedData = [
    { day: 'Mon', mins: 15 },
    { day: 'Tue', mins: 25 },
    { day: 'Wed', mins: 20 },
    { day: 'Thu', mins: 45 },
    { day: 'Fri', mins: 35 },
    { day: 'Sat', mins: 10 },
    { day: 'Sun', mins: 15 }
  ];

  // Student stats
  const studentStats = [
    { label: 'Semester Points', value: `${walletPoints} pts`, icon: <Wallet size={20}/>, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Meals Redeemed', value: orders.length + 42, icon: <ShoppingBag size={20}/>, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Money Saved', value: '₹1,240', icon: <TrendingUp size={20}/>, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Queue Time Saved', value: '8.5 hrs', icon: <Clock size={20}/>, color: 'text-blue-400', bg: 'bg-blue-500/10' }
  ];

  // Quick Action Buttons
  const quickActions = [
    { label: 'Order Food', icon: <ShoppingBag size={22}/>, action: () => navigate('/marketplace'), color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { label: 'Report Issue', icon: <AlertTriangle size={22}/>, action: () => navigate('/report-food'), color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
    { label: 'Notifications', icon: <Bell size={22}/>, action: () => alert('All notifications up to date.'), color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Scan QR Token', icon: <QrCode size={22}/>, action: () => alert('Scanning QR token...'), color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' }
  ];

  // Gamified achievements structure
  const rewards = [
    { id: 1, title: 'Food Critic', desc: 'Log 5 visual complaints', progress: '5/5', icon: '📝', unlocked: true, color: 'from-purple-500 to-indigo-500' },
    { id: 2, title: 'Speed Orderer', desc: 'Place 10 mobile pre-orders', progress: '10/10', icon: '⚡', unlocked: true, color: 'from-pink-500 to-purple-500' },
    { id: 3, title: 'Hygiene Guard', desc: 'Audit 5 campus messes', progress: '2/5', icon: '🛡️', unlocked: false, color: 'from-blue-500 to-indigo-500' },
    { id: 4, title: 'Point Millionaire', desc: 'Accumulate 1,000 wallet points', progress: '650/1000', icon: '💰', unlocked: false, color: 'from-yellow-500 to-pink-500' }
  ];

  // Transaction History logs
  const pointTransactions = [
    { id: 'txn1', timestamp: 'May 20, 2026 • 10:30 AM', desc: 'AI Verify Compensation: BH2 Mess', amount: '+150', type: 'earn' },
    { id: 'txn2', timestamp: 'May 19, 2026 • 08:15 PM', desc: 'Meal Order: Boys Hostel Mess 1', amount: '-120', type: 'spend' },
    { id: 'txn3', timestamp: 'May 10, 2026 • 01:45 PM', desc: 'AI Verify Compensation: Central Mess', amount: '+150', type: 'earn' },
    { id: 'txn4', timestamp: 'May 08, 2026 • 09:00 AM', desc: 'Meal Order: Uni Mall Mess', amount: '-80', type: 'spend' }
  ];

  // Mock Leaderboard
  const leaderboard = [
    { rank: 1, name: "Pranav Sharma", level: 6, points: 1850, avatar: "👑" },
    { rank: 2, name: "Namburi Hemanth", level: 4, points: walletPoints + 800, avatar: "⚡", isCurrentUser: true },
    { rank: 3, name: "Ananya Iyer", level: 3, points: 1100, avatar: "🌟" },
    { rank: 4, name: "Rahul Verma", level: 3, points: 950, avatar: "🍿" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 lg:pb-12 space-y-10 animate-[fadeUp_0.4s_both]">
      
      {/* 1. PROFILE HEADER CARD */}
      <div className="relative rounded-[2.5rem] p-8 md:p-10 bg-white/[0.02] border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 to-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
          
          {/* Left Avatar + User Details */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-center md:text-left">
            
            {/* Avatar Circle with Hover Edit Trigger */}
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-1 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-102 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0b0b1f] flex items-center justify-center relative">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Student avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                      {user?.name?.charAt(0).toUpperCase() || 'H'}
                    </span>
                  )}
                  
                  {/* Camera Icon Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <Camera className="text-white mb-1" size={20} />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Update</span>
                  </div>
                </div>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer rounded-full" accept="image/*" onChange={handleAvatarChange} />
            </div>

            {/* Profile Text Metadata */}
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-purple-300 font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center md:justify-start mb-1">
                  <span>{greeting.emoji}</span> {greeting.text}, welcome back!
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2.5">
                  <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">{user?.name || 'Namburi Hemanth'}</h1>
                  <div className="flex justify-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-purple-500/20 bg-purple-500/10 text-purple-300">Level 4</span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-pink-500/20 bg-pink-500/10 text-pink-300">Pro Auditor</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-medium">{user?.email || 'student@lpu.in'} • Reg: {user?.lpuId || '12315707'}</p>
              </div>

              {/* Tag Details */}
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                <span className="px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-gray-300">
                  Course: {user?.department || 'B.Tech CSE'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-gray-300">
                  Hostel: {user?.hostel || 'BH1 Mess'}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-semibold text-gray-300">
                  Course Year: {user?.year || 3}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Profile Action */}
          <button className="px-5 py-3 rounded-xl border border-white/10 hover:border-purple-500/30 bg-white/5 text-white text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-white/10 shrink-0">
            <Edit3 size={14} /> Edit Profile details
          </button>
        </div>
      </div>

      {/* 2. STATS GRID BLOCK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentStats.map((stat, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5 transform scale-150 pointer-events-none">
              {stat.icon}
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-xl font-bold text-white font-display">
                <AnimatedCounter value={stat.value} />
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. QUICK ACTIONS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <button 
            key={idx} 
            onClick={action.action}
            className={`group relative overflow-hidden border rounded-2xl p-5 flex flex-col items-start gap-4 transition-all hover:-translate-y-0.5 duration-300 text-left ${action.color}`}
          >
            <div className="p-2.5 rounded-xl bg-[#070714] border border-white/5 group-hover:scale-105 transition-transform">
              {action.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-sm tracking-tight">{action.label}</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Quick campus trigger</p>
            </div>
          </button>
        ))}
      </div>

      {/* 4. ANALYTICS CHARTS BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Points Log Chart */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-purple-400" /> Wallet Balance Trends (7 Days)
          </h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pointsHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b0b1f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#c084fc', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="points" name="Points" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Queue Wait Time Saved Chart */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
            <Clock size={16} className="text-pink-400" /> Daily Queue Minutes Saved
          </h3>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queueTimeSavedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="day" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b0b1f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#ec4899', fontSize: '11px' }}
                />
                <Bar dataKey="mins" name="Minutes" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* WEATHER-AWARE AI ECOSYSTEM & INSIGHTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weather-Aware Suggestion Widget */}
        <div className="lg:col-span-2 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-400" /> Weather-Aware AI Recommendation
                </h3>
                <p className="text-xs text-gray-400 mt-1">Smart food recommendation adjusted to current meteorological sensors</p>
              </div>
              
              {/* Weather Sensor Selector Toggles */}
              <div className="flex bg-[#070714] border border-white/5 rounded-2xl p-1 gap-1">
                {['Rainy', 'Hot', 'Cold'].map(w => (
                  <button
                    key={w}
                    onClick={() => setWeather(w)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      weather === w
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {w === 'Rainy' ? '🌧️ Rain' : w === 'Hot' ? '☀️ Hot' : '❄️ Cold'}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Weather recommendation display */}
            <div className="p-6 bg-[#070714]/40 border border-purple-500/10 rounded-3xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
              <div className="absolute -left-12 -bottom-12 text-purple-500/[0.02] pointer-events-none scale-150">
                <Sparkles size={180} />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center shrink-0">
                <span className="text-4xl">{weatherSuggestions[weather].icon}</span>
                <span className="text-xs font-black text-white mt-1.5">{weatherSuggestions[weather].temp}</span>
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  AI Suggestion: {weatherSuggestions[weather].text}
                </span>
                <h4 className="text-2xl font-black text-white tracking-tight">{weatherSuggestions[weather].food}</h4>
                <p className="text-xs text-gray-300 font-light">
                  Highly demanded now at <strong className="text-purple-300 font-semibold">{weatherSuggestions[weather].stall}</strong>. Bypasses standard digital queues.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
            <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={12} className="text-purple-400" /> Fast ETA: {weatherSuggestions[weather].eta}
            </span>
            <button 
              onClick={() => navigate('/marketplace')}
              className="px-5 py-2.5 bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg hover:scale-102 transition-all flex items-center gap-1 cursor-pointer"
            >
              Order Instant <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* AI Safety & Efficiency Insights Panel */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2 mb-2">
              <Zap size={16} className="text-pink-400" /> AI Auditor Insights
            </h3>
            <p className="text-xs text-gray-400 mb-6">Real-time optimization suggestions for your campus routine</p>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex gap-3">
                <span className="text-xl mt-0.5">⏱️</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Queue Time Flag</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                    Order from Boys Hostel Mess 1 at 1:15 PM instead of 12:45 PM to cut wait times by 18 minutes.
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex gap-3">
                <span className="text-xl mt-0.5">🥗</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Dietary Balance</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                    Mess audits show your protein consumption has fallen 15%. Consider adding Greek salad from block 32.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-[10px] text-gray-500 mt-6 text-center">
            Insights recalibrate hourly using your digital order histories.
          </div>
        </div>
      </div>

      {/* 5. LEADERBOARD & TRENDS SIDEBAR SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Leaderboard */}
        <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-6 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500 fill-yellow-500" /> Student Leaderboard (Weekly)
          </h3>
          
          <div className="space-y-3.5">
            {leaderboard.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  item.isCurrentUser 
                    ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                    : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-5 text-center font-display font-extrabold text-gray-500 text-sm">{item.rank}</span>
                  <div className="w-10 h-10 rounded-xl bg-[#0b0b1f] border border-white/10 flex items-center justify-center text-xl shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {item.name} {item.isCurrentUser && <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded font-bold uppercase">You</span>}
                    </h4>
                    <p className="text-[10px] text-gray-500">Level {item.level} Contributor</p>
                  </div>
                </div>
                
                <span className="font-display font-extrabold text-purple-400 text-sm">{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Food Trends */}
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl space-y-6">
          <div>
            <h3 className="text-base font-display font-extrabold text-white tracking-tight mb-1 flex items-center gap-2">
              <Flame size={16} className="text-pink-500" /> Campus Food Trends
            </h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Real-time stats from messes</p>
          </div>
          
          <div className="space-y-4">
            {[
              { rank: 1, dish: "Paneer Roll", mess: "Food Court Central", orders: 342, trend: "up" },
              { rank: 2, dish: "Masala Dosa", mess: "Boys Hostel Mess 1", orders: 280, trend: "up" },
              { rank: 3, dish: "Veg Burger", mess: "Central Mess", orders: 195, trend: "down" }
            ].map((trend, idx) => (
              <div key={idx} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">#{trend.rank} {trend.dish}</h4>
                  <p className="text-[9px] text-gray-400 mt-0.5">{trend.mess}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-purple-400">{trend.orders} orders</span>
                  <p className={`text-[8px] font-bold ${trend.trend === "up" ? "text-green-400" : "text-pink-400"}`}>
                    {trend.trend === "up" ? "▲ +12% this week" : "▼ -4% this week"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. REWARDS & ACHIEVEMENTS */}
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
              <Medal size={22} className="text-yellow-500 fill-yellow-500" /> Rewards & Badges
            </h3>
            <p className="text-xs text-gray-400 mt-1">Audit messes, place smart orders, and earn custom collector achievements.</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-xl text-yellow-400 font-bold flex items-center gap-1.5 text-xs">
            <Star size={14} fill="currentColor" /> Level 4 Auditor
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map(reward => (
            <div 
              key={reward.id} 
              className={`border rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[220px] ${
                reward.unlocked 
                  ? 'bg-gradient-to-br from-white/[0.03] to-transparent border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:-translate-y-0.5' 
                  : 'bg-black/40 border-white/5 opacity-60 grayscale'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="text-4xl filter drop-shadow-md">{reward.icon}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${reward.unlocked ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-white/5 text-gray-500 border-transparent'}`}>
                    {reward.progress}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{reward.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{reward.desc}</p>
                </div>
              </div>
              
              {!reward.unlocked ? (
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>🔒 Locked</span>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-yellow-400 uppercase tracking-wider">
                  <span>★ Unlocked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. TRANSACTION HISTORY TABLE */}
      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
            <History className="text-purple-400" /> Wallet History Logs
          </h3>
          <span className="text-xs text-gray-500">Showing last 4 transactions</span>
        </div>
        
        {/* Scrollable container for tables */}
        <div className="overflow-x-auto w-full border border-white/5 rounded-2xl bg-black/20">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-[#0b0b1f] text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {pointTransactions.map((txn, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-bold text-white">{txn.desc}</td>
                  <td className="py-4 px-6 text-gray-400">{txn.timestamp}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-lg font-semibold uppercase text-[10px] ${txn.type === 'earn' ? 'bg-green-500/10 text-green-400' : 'bg-pink-500/10 text-pink-400'}`}>
                      {txn.type === 'earn' ? 'Earned' : 'Debited'}
                    </span>
                  </td>
                  <td className={`py-4 px-6 text-right font-display font-extrabold text-sm ${txn.type === 'earn' ? 'text-green-400' : 'text-pink-400'}`}>
                    {txn.amount} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Profile;
